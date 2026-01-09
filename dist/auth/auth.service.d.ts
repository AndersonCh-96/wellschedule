import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { Role } from "src/roles/entities/role.entity";
import { LoginUserDTO } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { PaginationUserDto } from "./dto/paginatio.dto";
export declare class AuthService {
    private userRepository;
    private roleRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>, jwtService: JwtService);
    login(user: LoginUserDTO): Promise<{
        token: string;
        id: string;
        email: string;
        name: string;
        password: string;
        isActive: boolean;
        createdAt: Date;
        reservations: import("../reservation/entities/reservation.entity").Reservation[];
        roles: Role[];
    }>;
    create(createAuthDto: CreateAuthDto): Promise<void | User>;
    findAll({ page, limit, search }: PaginationUserDto): Promise<User[] | {
        data: User[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    findOne(id: number): string;
    update(id: string, updateAuthDto: UpdateAuthDto): Promise<User>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    private handleError;
    private getJwtToke;
}
