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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../roles/entities/role.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userRepository;
    roleRepository;
    jwtService;
    constructor(userRepository, roleRepository, jwtService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
    }
    async login(user) {
        const findUser = await this.userRepository.findOne({
            where: { email: user.email },
            select: {
                name: true,
                email: true,
                photoUrl: true,
                password: true,
                id: true,
                roles: true,
                isActive: true,
            },
        });
        if (!findUser) {
            throw new common_1.UnauthorizedException("Usuario o contraseña incorrectos");
        }
        const isPasswordValid = await bcrypt.compare(user.password, findUser.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Usuario o contraseña incorrectos");
        }
        return { ...findUser, token: this.getJwtToke({ id: findUser.id }) };
    }
    async create(createAuthDto) {
        try {
            const { password, roles, ...rest } = createAuthDto;
            const existRole = await this.roleRepository.find({
                where: { name: (0, typeorm_2.In)(roles) },
            });
            if (existRole.length === 0) {
                throw new common_1.NotFoundException("Rol no encontrado");
            }
            const createUser = this.userRepository.create({
                ...rest,
                password: bcrypt.hashSync(password, 10),
                roles: existRole,
            });
            return await this.userRepository.save(createUser);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async findAll({ page, limit }) {
        const qb = this.userRepository.createQueryBuilder("user").
            leftJoinAndSelect("user.roles", "role").orderBy("user.name", "ASC");
        if (page && limit) {
            qb.skip((page - 1) * limit).take(limit);
        }
        const [data, total] = await qb.getManyAndCount();
        return {
            data,
            meta: {
                total,
                page,
                pageSize: limit,
                pageCount: Math.ceil(total / (limit || 1))
            }
        };
    }
    async findOne(id) {
        const findUser = await this.userRepository.findOneBy({ id });
        if (!findUser) {
            throw new common_1.NotFoundException("Usuario no encontrado");
        }
        return findUser;
    }
    async update(id, updateAuthDto) {
        const { roles, ...rest } = updateAuthDto;
        let findRole;
        if (roles && roles.length > 0) {
            findRole = await this.roleRepository.find({
                where: { id: (0, typeorm_2.In)(roles) },
            });
            if (findRole.length === 0) {
                throw new common_1.NotFoundException("Roles no encontrados");
            }
        }
        if (rest.password) {
            rest.password = bcrypt.hashSync(rest.password, 10);
        }
        const updatedUser = await this.userRepository.preload({
            id,
            ...rest,
            ...(findRole ? { roles: findRole } : {}),
        });
        if (!updatedUser) {
            throw new common_1.NotFoundException("Error al actualizar el usuario");
        }
        return await this.userRepository.save(updatedUser);
    }
    async remove(id) {
        return await this.userRepository.delete(id);
    }
    handleError(error) {
        if (error.code === "ER_DUP_ENTRY") {
            throw new common_1.BadRequestException(error.sqlMessage);
        }
    }
    getJwtToke(payload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map