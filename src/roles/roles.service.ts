import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { RoleRepository } from './repository/role.repository';
import { PaginationDto } from './dto/paginate.dto';

@Injectable()
export class RolesService {
  constructor(
    // @InjectRepository(Role)
    // private roleRepository: Repository<Role>,
    private readonly roleRepository: RoleRepository,
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    try {
      return await this.roleRepository.createRole(createRoleDto);
    } catch (error) {
      console.log("error", error);
      if (error.code === '23505' || error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('El rol ya éxiste');
      }
      throw error;
    }
  }

  async findAll(dto: PaginationDto) {
    return await this.roleRepository.findAll(dto);
  }

  async findOne(id: string) {
    const foundRole = await this.roleRepository.findOneById(id);
    if (!foundRole) {
      throw new BadRequestException('Rol no encontrado');
    }
    return foundRole;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const updateRole = await this.roleRepository.updateRole(id, updateRoleDto);
    if (!updateRole) {
      throw new NotFoundException(`Rol no encontrado`);
    }
    return updateRole;
  }

  async remove(id: string) {
    const deletedRole = await this.roleRepository.deleteRole(id);
    if (!deletedRole) {
      throw new NotFoundException(`Rol no encontrado`);
    }
    return deletedRole;
  }
}
