import { User } from "src/auth/entities/user.entity";
import { Room } from "src/room/entities/room.entity";
export declare class Reservation {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    status: boolean;
    participants: any[];
    room: Room;
    user: User;
}
