import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "./common/common.module";
import { FilesModule } from "./files/files.module";
import { AuthModule } from "./auth/auth.module";
import { RolesModule } from "./roles/roles.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { RoomModule } from './room/room.module';
import { ReservationModule } from './reservation/reservation.module';
import { WebsocketModule } from './websocket/websocket.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      // url: process.env.DATABASE_URL,

      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "the_wellness.group2024",
      database: "pruebas",
      autoLoadEntities: true,
      synchronize: true,
      // ssl: { rejectUnauthorized: false },
      // ssl:true,
      logging: false,
    }),
    CommonModule,
    FilesModule,
    AuthModule,
    RolesModule,
    CloudinaryModule,
    RoomModule,
    ReservationModule,
    WebsocketModule,

  ],
})
export class AppModule { }
