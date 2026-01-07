import { CreateAuthDto } from "./create-auth.dto";
import { Role } from "src/roles/entities/role.entity";
declare const UpdateAuthDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateAuthDto>>;
export declare class UpdateAuthDto extends UpdateAuthDto_base {
    roles?: Role[];
    isActive: boolean;
}
export {};
