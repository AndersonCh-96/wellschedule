import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { User } from 'src/auth/entities/user.entity';
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    create(createReservationDto: CreateReservationDto, user: User): Promise<import("./entities/reservation.entity").Reservation>;
    findAll(start?: string, end?: string): Promise<{
        data: import("./entities/reservation.entity").Reservation[];
    }>;
    findOne(id: string): Promise<import("./entities/reservation.entity").Reservation>;
    update(id: string, updateReservationDto: UpdateReservationDto, user: User): Promise<{
        meetingId: any;
        id: string;
        title: string;
        startDate: Date;
        endDate: Date;
        description: string;
        status: boolean;
        participants: any[];
        room: import("../room/entities/room.entity").Room;
        user: User;
    } & import("./entities/reservation.entity").Reservation>;
    remove(id: string, user: User): Promise<{
        message: string;
    }>;
}
