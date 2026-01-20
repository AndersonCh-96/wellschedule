import { Server } from 'socket.io';
export declare class ReservationGateway {
    server: Server;
    emitCreated(event: any): void;
    emitUpdated(event: any): void;
    emitDeleted(id: string): void;
}
