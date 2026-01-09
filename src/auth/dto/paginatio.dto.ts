import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/roles/dto/paginate.dto";

export class PaginationUserDto extends PaginationDto {
    @IsString()
    @IsOptional()
    search?: string;
}