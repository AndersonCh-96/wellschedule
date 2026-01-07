import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/auth/entities/user.entity';
import { Between } from 'typeorm';

@Injectable()
export class ReservationService {

  constructor(@InjectRepository(Reservation)
  private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {

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

    const reservation = this.reservationRepository.create({
      title: createReservationDto.title,
      startDate: createReservationDto.startDate,
      endDate: createReservationDto.endDate,
      description: createReservationDto.description,
      room,
      user,
    });


    return this.reservationRepository.save(reservation);


  }

  //revisar para el front fullCalendar 
  //   <FullCalendar
  //   events={(info, successCallback) => {
  //     fetch(
  //       `/agendamientos?start=${info.startStr}&end=${info.endStr}`
  //     )
  //       .then(res => res.json())
  //       .then(data => successCallback(data));
  //   }}
  // />

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
    return this.reservationRepository.delete(reservation.id);
  }
}
