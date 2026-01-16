import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/auth/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { ReservationGateway } from './reservation.gateway';
import { MicrosoftGraphService } from 'src/microsoft-graph/microsoft-graph.service';
import { MicrosoftAuthService } from 'src/microsoft-auth/microsoft-auth.service';


@Module({
  controllers: [ReservationController],
  providers: [ReservationService,ReservationGateway,MicrosoftGraphService, MicrosoftAuthService],
  imports: [TypeOrmModule.forFeature([Reservation, Room, User]), AuthModule],
})
export class ReservationModule { }
