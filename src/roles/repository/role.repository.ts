import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../entities/role.entity";
import { Repository } from "typeorm";
import { PaginationDto } from "../dto/paginate.dto";
import { CreateRoleDto } from "../dto/create-role.dto";
import { UpdateRoleDto } from "../dto/update-role.dto";

@Injectable()
export class RoleRepository {

    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
    ) { }


    async createRole(createRoleDto: CreateRoleDto) {
        const role = this.roleRepository.create(createRoleDto);
        return await this.roleRepository.save(role);
    }

    // async findAll({ page = 1, limit = 10 }: PaginationDto) {
    //     const qb = this.roleRepository.createQueryBuilder('role').orderBy('role.name', 'ASC')
    //         .skip((page - 1) * limit)
    //         .take(limit);
    //     const [data, total] = await qb.getManyAndCount();
    //     return {
    //         data,
    //         meta: {
    //             total,
    //             page,
    //             pageSize:limit,
    //             pageCount: Math.ceil(total / limit)
    //         }
    //     }
    // }

    async findAll({ page, limit }: PaginationDto) {
        const qb = this.roleRepository.createQueryBuilder("role").
            orderBy("role.name", "ASC");

        if (page && limit) {
            qb.skip((page - 1) * limit).take(limit);


            const [data, total] = await qb.getManyAndCount()

            return {
                data,
                meta: {
                    total,
                    page,
                    pageSize: limit,
                    pageCount: Math.ceil(total / limit)
                }
            };
        }
        const data = await qb.getMany();
        return { data };
    }


    async findOneById(id: string) {
        return await this.roleRepository.findOne({ where: { id } });
    }


    async updateRole(id: string, body: UpdateRoleDto) {
        const role = await this.roleRepository.preload({
            id,
            ...body
        })
        if (!role) return null;
        return await this.roleRepository.save(role);
    }

    async deleteRole(id: string) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) return null;
        await this.roleRepository.delete(id);
        return {
            status: 'success',
            message: 'El rol fue eliminado correctamente',
            data: role
        };
    }

}