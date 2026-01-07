import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: { origin: '*' },
})
export class ReservationGateway {
    @WebSocketServer()
    server: Server;

    emitCreated(event: any) {

        this.server.emit('EVENT_CREATED', event);
    }

    emitUpdated(event: any) {

        this.server.emit('EVENT_UPDATED', event);
    }

    emitDeleted(id: string) {
        this.server.emit('EVENT_DELETED', id);
    }
}
