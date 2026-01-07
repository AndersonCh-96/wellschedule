import { Reservation } from "src/reservation/entities/reservation.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text", { nullable: false })
    name: string;

    @Column("boolean", { nullable: false, default: true })
    status: boolean;

    @Column("text", { nullable: true })
    description: string;

    @OneToMany(() => Reservation, (reservation) => reservation.room)
    reservations: Reservation[];

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
    
    
}
