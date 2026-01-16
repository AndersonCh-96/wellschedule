import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/auth/entities/user.entity';
import { ReservationGateway } from './reservation.gateway';
import { MicrosoftGraphService } from 'src/microsoft-graph/microsoft-graph.service';

@Injectable()
export class ReservationService {

  constructor(@InjectRepository(Reservation)
  private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly reservationGateway: ReservationGateway,
    private readonly microsoftGraphService: MicrosoftGraphService,
  ) {

  }


  private MapParticipants(participants: { email: string }[]) {
    return participants.map(participant => ({
      emailAddress: {
        address: participant.email
      }
    }));
  }
  async create(createReservationDto: CreateReservationDto, userLogin: User) {


    const room = await this.roomRepository.findOne({ where: { id: createReservationDto.roomId } });
    if (!room) {
      throw new NotFoundException('Sala no encontrada');
    }
    const user = await this.userRepository.findOne({ where: { id: userLogin.id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }


    const conflictRoom = this.reservationRepository.createQueryBuilder('reservation')
      .where('reservation.roomId =:roomId', { roomId: createReservationDto.roomId })
      .andWhere('reservation.startDate < :endDate AND reservation.endDate > :startDate', {
        endDate: createReservationDto.endDate,
        startDate: createReservationDto.startDate
      })
    const conflict = await conflictRoom.getOne();
    if (conflict) {
      throw new ForbiddenException('Sala no disponible en el horario seleccionado');
    }

    const event = {
      subject: createReservationDto.title,
      start: {
        dateTime: createReservationDto.startDate,
        timeZone: 'America/Guayaquil',
      },
      end: {
        dateTime: createReservationDto.endDate,
        timeZone: 'America/Guayaquil',
      },
      body: {
        contentType: 'HTML',
        content: createReservationDto.description,
      },
      attendees: this.MapParticipants(createReservationDto?.participants || []),
    };

    const result = await this.microsoftGraphService.createEvent(
      userLogin.email,
      event
    )

    const reservation = this.reservationRepository.create({
      title: createReservationDto.title,
      startDate: createReservationDto.startDate,
      endDate: createReservationDto.endDate,
      description: createReservationDto.description,
      room,
      user,
      participants: createReservationDto?.participants || [],
      meetingId: result.id,
    });

    const saveReservation = await this.reservationRepository.save(reservation);
    this.reservationGateway.emitCreated(saveReservation);
    return saveReservation;
  }


  async findAll(start?: string, end?: string) {
    const queryB = this.reservationRepository
      .createQueryBuilder("reservation")
      .leftJoinAndSelect("reservation.room", "room")
      .leftJoinAndSelect("reservation.user", "user")
      .where("reservation.status = :status", { status: true })
      .take(10).orderBy("reservation.startDate", "DESC");

    if (start && end) {
      queryB.andWhere(
        "reservation.startDate BETWEEN :start AND :end",
        {
          start: new Date(start),
          end: new Date(end),
        }
      );
    }

    return {
      data: await queryB.getMany()
    }
  }
  async findOne(id: string) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['room', 'user'],
    });

    if (!reservation) {
      throw new NotFoundException('Reservación no encontrada');
    }

    return reservation;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {

    const entryData = await this.reservationRepository.preload({
      id,
      ...updateReservationDto,
    })
    if (!entryData) {
      throw new NotFoundException('Reservación no encontrada');
    }

    return await this.reservationRepository.save(entryData);
  }

  async remove(id: string, userLogin: User) {
    const reservation = await this.reservationRepository.findOne({ where: { id }, relations: ['user'] });
    if (!reservation) {
      throw new NotFoundException('Reservación no encontrada');
    }

    if (reservation.user.id !== userLogin.id) {
      throw new ForbiddenException('No tienes permiso para eliminar esta reservación');
    }

    if (reservation.meetingId) {
      await this.microsoftGraphService.deleteEvent(userLogin.email, reservation?.meetingId || '');
    }


    await this.reservationRepository.delete(reservation.id);
    this.reservationGateway.emitDeleted(id)

    return {
      message: 'Reservación eliminada correctamente'
    }
  }
}
