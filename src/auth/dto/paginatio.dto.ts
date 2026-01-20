import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";
import { PaginationDto } from "src/roles/dto/paginate.dto";


export class PaginationUserDto extends PaginationDto {

    @IsOptional()
    search?: string;
}