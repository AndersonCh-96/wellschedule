import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { CreateUserDTO } from "./dto/create-user.dto";
import { LoginUserDTO } from "./dto/login-user.dto";

import { ValidRoles } from "./interfaces/valid-roles";
import { Auth } from "./decorators/auth-decorator";
import { PaginationUserDto } from "./dto/paginatio.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @Post("register")
  // regiterUser(@Body() createUser: CreateUserDTO) {
  //   return this.authService.registerUser(createUser);
  // }

  @Post("login")
  login(@Body() loginUser: LoginUserDTO) {
    return this.authService.login(loginUser);
  }

  @Post("user")
  // @Auth(ValidRoles.admin)
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  // @Get("private")
  // @UseGuards(AuthGuard())
  //Diferentes formas de traer el usaurios desde mi requestx
  // getPrivate(
  //   @Req() request: Express.Request,
  //   @GetUserDec() user: User,
  //   @GetUserDec("email") userEmail: User,
  //   @RawHeaders() rawHeader: string[],
  //   @Headers() header: any
  // ) {
  //   console.log("User", user);
  //   // console.log('Request', request);

  //   console.log("Raw", rawHeader);
  //   return {
  //     ok: true,
  //     user: user,
  //     userEmail: userEmail,
  //     rawHeaders: rawHeader,
  //     headers: header,
  //   };
  // }

  //Validar que el usuario necesita ciertos roles
  //los puedo hacer directo con el user
  //per existe una forma usando decorador
  //El auth guard viene por defecto para determinar si viene el token o esta autenticado
  //version extendida
  // @Get("private2")
  // @RolProtected(ValidRoles.admin)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // getPrivate2(@GetUserDec() user: User) {
  //   return {
  //     ok: true,
  //     user: user,
  //   };
  // }

  //version reducida
  // @Get("private3")
  //getUserdec decorador para obtener el usaurio logeado si usar el request de quien hace la peticion
  // @UseGuards(AuthGuard(), UserRoleGuard)
  //si quiero que solo valide el token y permita cualquier rol dejo auth vacio
  //que no haya expirado el token y que el usuario sea de la base de datos valide que exista
  // @Auth(ValidRoles.guest)
  // getPrivate3(@GetUserDec() user: User) {
  //   return {
  //     ok: true,
  //     user: user,
  //   };
  // }

  @Get("user")
  findAll(@Query() query: PaginationUserDto) {
    return this.authService.findAll(query);
  }

  @Get("user/:id")
  @Auth(ValidRoles.admin, ValidRoles.user)
  findOne(@Param("id") id: string) {
    return this.authService.findOne(id);
  }

  @Patch("user/:id")
  // @Auth(ValidRoles.admin, ValidRoles.user)
  update(@Param("id") id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete("user/:id")
  // @Auth(ValidRoles.admin, ValidRoles.user)
  remove(@Param("id") id: string) {
    return this.authService.remove(id);
  }
}
