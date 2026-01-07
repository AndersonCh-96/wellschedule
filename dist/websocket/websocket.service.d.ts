import { CreateWebsocketDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';
export declare class WebsocketService {
    create(createWebsocketDto: CreateWebsocketDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateWebsocketDto: UpdateWebsocketDto): string;
    remove(id: number): string;
}
