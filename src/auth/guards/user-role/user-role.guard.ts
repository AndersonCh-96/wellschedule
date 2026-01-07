import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { META_ROLES } from "src/auth/decorators/rol-protected/rol-protected.decorator";

@Injectable()
export class UserRoleGuard implements CanActivate {
  //Inyectamos reflec es para acceder a datos almacenados en los decoradores
  //los guard siempre van a pasar por algun decorador de autorizacion
  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler()
    );

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new InternalServerErrorException("Usuario no encontrado");
    }

    for (const role of user.roles) {
      if (validRoles.includes(role.name)) {
        return true;
      }
    }

    throw new ForbiddenException(
      `User ${user.fullName} need valid role ${validRoles}`
    );
  }
}
