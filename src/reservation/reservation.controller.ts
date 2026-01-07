import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { GetUserDec } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth-decorator';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post()
  @Auth()
  create(@Body() createReservationDto: CreateReservationDto, @GetUserDec() user: User) {
    return this.reservationService.create(createReservationDto, user);
  }

  @Get()
  findAll(@Query('startDate') start?: string, @Query('endDate') end?: string) {
    return this.reservationService.findAll(start, end);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string, @GetUserDec() user: User) {
    return this.reservationService.remove(id, user);
  }
}
