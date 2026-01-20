import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/auth/entities/user.entity';
import { ReservationGateway } from './reservation.gateway';
import { MicrosoftGraphService } from 'src/microsoft-graph/microsoft-graph.service';
export declare class ReservationService {
    private readonly reservationRepository;
    private readonly roomRepository;
    private readonly userRepository;
    private readonly reservationGateway;
    private readonly microsoftGraphService;
    constructor(reservationRepository: Repository<Reservation>, roomRepository: Repository<Room>, userRepository: Repository<User>, reservationGateway: ReservationGateway, microsoftGraphService: MicrosoftGraphService);
    private MapParticipants;
    create(createReservationDto: CreateReservationDto, userLogin: User): Promise<Reservation>;
    findAll(start?: string, end?: string): Promise<{
        data: Reservation[];
    }>;
    findOne(id: string): Promise<Reservation>;
    update(id: string, updateReservationDto: UpdateReservationDto, userLogin: User): Promise<{
        meetingId: any;
        id: string;
        title: string;
        startDate: Date;
        endDate: Date;
        description: string;
        status: boolean;
        participants: any[];
        room: Room;
        user: User;
    } & Reservation>;
    remove(id: string, userLogin: User): Promise<{
        message: string;
    }>;
}
