import { Role } from "src/roles/entities/role.entity";
export declare class CreateUserDTO {
    email: string;
    name?: string;
    phone: string;
    isActive: boolean;
    password: string;
    fullName: string;
    roles: Role[];
}
