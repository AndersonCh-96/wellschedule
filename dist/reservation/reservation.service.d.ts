import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/auth/entities/user.entity';
export declare class ReservationService {
    private readonly reservationRepository;
    private readonly roomRepository;
    private readonly userRepository;
    constructor(reservationRepository: Repository<Reservation>, roomRepository: Repository<Room>, userRepository: Repository<User>);
    create(createReservationDto: CreateReservationDto, userLogin: User): Promise<Reservation>;
    findAll(start?: string, end?: string): Promise<{
        data: Reservation[];
    }>;
    findOne(id: string): Promise<Reservation>;
    update(id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation>;
    remove(id: string, userLogin: User): Promise<import("typeorm").DeleteResult>;
}
