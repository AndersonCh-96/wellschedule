import { JwtSignOptions } from "./../../node_modules/@nestjs/jwt/dist/interfaces/jwt-module-options.interface.d";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { CreateUserDTO } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { In, Repository } from "typeorm";
import { Role } from "src/roles/entities/role.entity";
import * as bcrypt from "bcrypt";
import { LoginUserDTO } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { JwPayload } from "./interfaces/jwt.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    //Este jwt viene de el auth module donde ya configuramos
    private readonly jwtService: JwtService
  ) { }

  // async registerUser(createUser: CreateUserDTO) {
  //   try {
  //     const { password, ...rest } = createUser;
  //     const roleDefault = await this.roleRepository.findOne({
  //       where: { name: "User" },
  //     });

  //     if (!roleDefault) {
  //       throw new NotFoundException("Rol no found");
  //     }
  //     const user = this.userRepository.create({
  //       ...rest,
  //       password: bcrypt.hashSync(password, 10),
  //       roles: [roleDefault],
  //       isActive: true,
  //     });

  //     await this.userRepository.save(user);
  //     //Regresar el token

  //     return { ...user, token: this.getJwtToke({ id: user.id }) };
  //   } catch (error) {
  //     return this.handleError(error);
  //   }
  // }

  async login(user: LoginUserDTO) {

    const findUser = await this.userRepository.findOne({
      where: { email: user.email },
      select: {
        email: true,
        password: true,
        id: true,
        roles: true,
        isActive: true,
      },
    });

    if (!findUser) {
      throw new UnauthorizedException("Usuario o contraseña incorrectos");
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      findUser.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Usuario o contraseña incorrectos");
    }

    //falta retornar token
    return { ...findUser, token: this.getJwtToke({ id: findUser.id }) };
  }

  async create(createAuthDto: CreateAuthDto) {
    try {
      const { password, roles, ...rest } = createAuthDto;

      console.log(roles);
      const existRole = await this.roleRepository.find({
        where: { name: In(roles) },
      });

      console.log("hay", existRole);
      if (existRole.length === 0) {
        throw new NotFoundException("Rol no encontrado");
      }

      const createUser = this.userRepository.create({
        ...rest,
        password: bcrypt.hashSync(password, 10),
        roles: existRole,
      });

      return await this.userRepository.save(createUser);
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async findAll() {
    return await this.userRepository.find({ relations: ["roles"] });
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    const { roles, ...rest } = updateAuthDto;

    let findRole: any;
    // Verificamos si se enviaron roles antes de buscarlos
    if (roles && roles.length > 0) {
      findRole = await this.roleRepository.find({
        where: { id: In(roles) },
      });

      if (findRole.length === 0) {
        throw new NotFoundException("Roles no encontrados");
      }
    }

    const updatedUser = await this.userRepository.preload({
      id,
      ...rest,
      ...(findRole ? { roles: findRole } : {}), // Solo actualiza roles si se enviaron
    });

    if (!updatedUser) {
      throw new NotFoundException("Error al actualizar el usuario");
    }

    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }

  private handleError(error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new BadRequestException(error.sqlMessage);
    }
  }

  //Interfaz para validar payload pendiente
  private getJwtToke(payload: JwPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
