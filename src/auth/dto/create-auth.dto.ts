import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";
import { Role } from "src/roles/entities/role.entity";

export class CreateAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password!: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, { message: "Debe tener al menos un rol" })
  roles!: Role[];
}
