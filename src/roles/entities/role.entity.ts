import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false, unique: true })
  name: string;

  @ManyToMany(() => User, (user: User) => user.roles)
  users: User[];
}
