import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repository/role.repository';
import { PaginationDto } from './dto/paginate.dto';
export declare class RolesService {
    private readonly roleRepository;
    constructor(roleRepository: RoleRepository);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findAll(dto: PaginationDto): Promise<{
        data: Role[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    } | {
        data: Role[];
        meta?: undefined;
    }>;
    findOne(id: string): Promise<Role>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role>;
    remove(id: string): Promise<{
        status: string;
        message: string;
        data: Role;
    }>;
}
