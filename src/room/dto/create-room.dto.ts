import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateRoomDto {

    @IsString()
    name: string;
    @IsBoolean()
    @IsOptional()
    status: boolean;

    @IsString()
    @IsOptional()
    description: string;


}
