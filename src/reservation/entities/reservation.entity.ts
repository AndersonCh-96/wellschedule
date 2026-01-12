import { User } from "src/auth/entities/user.entity";
import { Room } from "src/room/entities/room.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ type: "text", nullable: true })
  title: string;
  @Column("timestamp", { nullable: false })
  startDate: string;
  @Column("timestamp", { nullable: false })
  endDate: string;
  @Column("text", { nullable: true })
  description: string;
  @Column("boolean", { nullable: false, default: true })
  status: boolean;

  @Column({ type: 'jsonb', nullable: true })
  participants: any[];

  @ManyToOne(() => Room, (room) => room.reservations, { nullable: false })
  room: Room;
  @ManyToOne(() => User, (user) => user.reservations, { nullable: false })
  user: User;
}
