import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Auth } from "src/auth/decorators/auth-decorator";
import { ValidRoles } from "src/auth/interfaces/valid-roles";
import { PaginationDto } from "./dto/paginate.dto";

@Controller("roles")
//Cuando selecciono el auth en la cabezera indica que todos necesitan estar logeados
// @Auth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  // @Auth(ValidRoles.admin)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
   @Auth(ValidRoles.admin)
  findAll(@Query() query: PaginationDto) {
    return this.rolesService.findAll(query);
  }

  @Get(":id")
  // @Auth(ValidRoles.admin)
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(":id")
  // @Auth(ValidRoles.admin)
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(":id")
  // @Auth(ValidRoles.admin)
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.rolesService.remove(id);
  }
}
