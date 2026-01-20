import { User } from 'src/auth/entities/user.entity';
export declare class Role {
    id: string;
    name: string;
    users: User[];
}
