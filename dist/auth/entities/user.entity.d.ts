import { Reservation } from "src/reservation/entities/reservation.entity";
import { Role } from "src/roles/entities/role.entity";
export declare class User {
    id: string;
    email: string;
    name: string;
    password: string;
    isActive: boolean;
    photoUrl: string;
    createdAt: Date;
    reservations: Reservation[];
    roles: Role[];
    checkEmail(): void;
    checkEmailUpdate(): void;
}
