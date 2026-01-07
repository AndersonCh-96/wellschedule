import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from "class-validator";

export class CreateReservationDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDateString()
    @IsNotEmpty()
    startDate?: string;

    // @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    @IsNotEmpty()
    @IsString()
    endDate: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUUID()
    @IsNotEmpty()
    roomId: string;

    // @IsUUID()
    // @IsNotEmpty()
    // userId: string;
}
