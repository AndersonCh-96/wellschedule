import { Reservation } from "src/reservation/entities/reservation.entity";
export declare class Room {
    id: string;
    name: string;
    status: boolean;
    description: string;
    reservations: Reservation[];
    createdAt: Date;
    updatedAt: Date;
}
