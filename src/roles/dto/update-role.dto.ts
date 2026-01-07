import { PartialType } from "@nestjs/mapped-types";
import { CreateRoleDto } from "./create-role.dto";
import { IsOptional, IsUUID } from "class-validator";

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  // @IsOptional()
  // @IsUUID()
  // id?: string;
}
