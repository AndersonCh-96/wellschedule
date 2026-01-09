import { Role } from "src/roles/entities/role.entity";
export declare class CreateAuthDto {
    email: string;
    name?: string;
    password: string;
    roles: Role[];
}
