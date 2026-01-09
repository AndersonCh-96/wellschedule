"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("../entities/role.entity");
const typeorm_2 = require("typeorm");
let RoleRepository = class RoleRepository {
    roleRepository;
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async createRole(createRoleDto) {
        const role = this.roleRepository.create(createRoleDto);
        return await this.roleRepository.save(role);
    }
    async findAll({ page, limit }) {
        const qb = this.roleRepository.createQueryBuilder("role").
            orderBy("role.name", "ASC");
        if (page && limit) {
            qb.skip((page - 1) * limit).take(limit);
            const [data, total] = await qb.getManyAndCount();
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
    async findOneById(id) {
        return await this.roleRepository.findOne({ where: { id } });
    }
    async updateRole(id, body) {
        const role = await this.roleRepository.preload({
            id,
            ...body
        });
        if (!role)
            return null;
        return await this.roleRepository.save(role);
    }
    async deleteRole(id) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role)
            return null;
        await this.roleRepository.delete(id);
        return {
            status: 'success',
            message: 'El rol fue eliminado correctamente',
            data: role
        };
    }
};
exports.RoleRepository = RoleRepository;
exports.RoleRepository = RoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoleRepository);
//# sourceMappingURL=role.repository.js.map