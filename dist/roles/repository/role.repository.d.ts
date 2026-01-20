import { Role } from "../entities/role.entity";
import { Repository } from "typeorm";
import { PaginationDto } from "../dto/paginate.dto";
import { CreateRoleDto } from "../dto/create-role.dto";
import { UpdateRoleDto } from "../dto/update-role.dto";
export declare class RoleRepository {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    createRole(createRoleDto: CreateRoleDto): Promise<Role>;
    findAll({ page, limit }: PaginationDto): Promise<{
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
    findOneById(id: string): Promise<Role | null>;
    updateRole(id: string, body: UpdateRoleDto): Promise<Role | null>;
    deleteRole(id: string): Promise<{
        status: string;
        message: string;
        data: Role;
    } | null>;
}
