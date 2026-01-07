import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Room } from "./entities/room.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>
  ) { }
  async create(createRoomDto: CreateRoomDto) {
    try {
      const room = this.roomRepository.create(createRoomDto);
      return await this.roomRepository.save(room);
    } catch (error) {
      throw new BadRequestException(`"Error ${error}"`);
    }
  }

  async findAll() {
    return await this.roomRepository.find();
  }

  async findOne(id: string) {
    return await this.roomRepository.findOne({
      where: { id },
      relations: ["reservations"],
    });
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.preload({
      id,
      ...updateRoomDto,
    });

    if (!room) throw new BadRequestException("Sala no encontrada");

    return this.roomRepository.save(room);
  }

  remove(id: string) {
    return this.roomRepository.delete(id);
  }
}
