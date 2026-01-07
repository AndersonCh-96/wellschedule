import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwPayload } from '../interfaces/jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<any>('SECRET_KEY'),
    });
  }
  //El metodon es suficiente para validar si el token esta bien
  //Lo siguiente sirve para extender para validar mas cosas en el token,
  //si todo esta bien hace match el jwt pasa a la siguiente validacion

  async validate(payload: JwPayload): Promise<User> {


    const { id } = payload;

    const user = await this.userRepository.findOne({ where: { id }, relations: ['roles'] });



    if (!user) {
      throw new UnauthorizedException('token no valid');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive, talk whith admin');
    }

    // console.log('User found in JWT strategy:', user);
    return user;
  }
}
