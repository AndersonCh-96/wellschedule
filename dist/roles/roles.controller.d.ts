import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { PaginationDto } from "./dto/paginate.dto";
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<import("./entities/role.entity").Role>;
    findAll(query: PaginationDto): Promise<{
        data: import("./entities/role.entity").Role[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    } | {
        data: import("./entities/role.entity").Role[];
        meta?: undefined;
    }>;
    findOne(id: string): Promise<import("./entities/role.entity").Role>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<import("./entities/role.entity").Role>;
    remove(id: string): Promise<{
        status: string;
        message: string;
        data: import("./entities/role.entity").Role;
    }>;
}
