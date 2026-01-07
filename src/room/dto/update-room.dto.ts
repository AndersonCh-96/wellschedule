import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';


export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    @IsOptional()
    @IsString()

    name?: string;
    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @IsOptional()
    @IsString()
    description?: string;
}
