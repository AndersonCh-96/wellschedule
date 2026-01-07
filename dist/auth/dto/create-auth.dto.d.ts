import { Role } from "src/roles/entities/role.entity";
export declare class CreateAuthDto {
    email: string;
    password: string;
    roles: Role[];
}
