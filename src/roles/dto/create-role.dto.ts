import { IsNotEmpty, MinLength } from "class-validator";

export class CreateRoleDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
