import { ValidRoles } from 'src/auth/interfaces/valid-roles';
export declare const META_ROLES = "roles";
export declare const RolProtected: (...args: ValidRoles[]) => import("@nestjs/common").CustomDecorator<string>;
