import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Role } from "src/roles/entities/role.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],

  //Debemos importar JWT para generar los token
  //Modulo de autenticacion
  imports: [
    ConfigModule,

    TypeOrmModule.forFeature([User, Role]),
    PassportModule.register({ defaultStrategy: "jwt" }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get("SECRET_KEY"),
          // signOptions: {
          //   expiresIn: '1d',
          // },
        };
      },
    }),

    //Se deberia tener modo asincrono no sincrono, por que esto puede cambiar
    //por el secret_Key
    // JwtModule.register({
    //   secret: process.env.SECRET_KEY,
    //   signOptions: {
    //     expiresIn: '2h',
    //   },
    // }),
  ],

  //para usar la autorizacion debemos exportar jwtStategy y PassportMOdule
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule { }
