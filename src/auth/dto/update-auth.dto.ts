import { PartialType } from "@nestjs/mapped-types";
import { CreateAuthDto } from "./create-auth.dto";
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from "class-validator";
import { Role } from "src/roles/entities/role.entity";

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  // @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, { message: "Debe tener al menos un rol" })
  roles?: Role[];


  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password!: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
