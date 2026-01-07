import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { Role } from "src/roles/entities/role.entity";

export class CreateUserDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
  //password use regular expresion
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "La contraseña debe tener almenos una mayuscula y un número",
  })
  password: string;

  @IsString()
  @MinLength(1)
  fullName: string;

  @IsArray()
  @IsOptional()
  roles: Role[];
}
