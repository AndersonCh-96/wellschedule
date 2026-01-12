import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { LoginUserDTO } from "./dto/login-user.dto";
import { PaginationUserDto } from "./dto/paginatio.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginUser: LoginUserDTO): Promise<{
        token: string;
        id: string;
        email: string;
        name: string;
        password: string;
        isActive: boolean;
        createdAt: Date;
        reservations: import("../reservation/entities/reservation.entity").Reservation[];
        roles: import("../roles/entities/role.entity").Role[];
    }>;
    create(createAuthDto: CreateAuthDto): Promise<void | import("./entities/user.entity").User>;
    findAll(query: PaginationUserDto): Promise<import("./entities/user.entity").User[] | {
        data: import("./entities/user.entity").User[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateAuthDto: UpdateAuthDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
