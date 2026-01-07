import { PartialType } from "@nestjs/mapped-types";
import { CreateAuthDto } from "./create-auth.dto";
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from "class-validator";
import { Role } from "src/roles/entities/role.entity";

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  // @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, { message: "Debe tener al menos un rol" })
  roles?: Role[];

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
