import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUserDec = createParamDecorator(
  //ctx tiene acceso a la request, es otra forma de acceder quien hace la peticion
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new InternalServerErrorException('Usuario no encontrado');
    }

    return data ? user[data] : user;
  },
);
