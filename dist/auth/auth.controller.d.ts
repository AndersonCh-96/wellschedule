import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { LoginUserDTO } from "./dto/login-user.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginUser: LoginUserDTO): Promise<{
        token: string;
        id: string;
        email: string;
        password: string;
        isActive: boolean;
        createdAt: Date;
        reservations: import("../reservation/entities/reservation.entity").Reservation[];
        roles: import("../roles/entities/role.entity").Role[];
    }>;
    create(createAuthDto: CreateAuthDto): Promise<void | import("./entities/user.entity").User>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): string;
    update(id: string, updateAuthDto: UpdateAuthDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
