
import { Reservation } from "src/reservation/entities/reservation.entity";
import { Role } from "src/roles/entities/role.entity";

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column("text", { nullable: false, unique: true })
  email: string;

  @Index()
  @Column("text", { nullable: true, })
  name: string;

  @Column("text", { nullable: false })
  password: string;


  @Column("boolean", { nullable: false, default: true })
  isActive: boolean;


  @Column("string", { nullable: true })
  photoUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @ManyToMany(() => Role, (role: Role) => role.users, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  roles: Role[];


  @BeforeInsert()
  checkEmail() {
    this.email = this.email.toLocaleLowerCase().trim();
  }

  @BeforeUpdate()
  checkEmailUpdate() {
    this.checkEmail();
  }
}
