import 'isomorphic-fetch';
import { MicrosoftAuthService } from '../microsoft-auth/microsoft-auth.service';
export declare class MicrosoftGraphService {
    private readonly auth;
    constructor(auth: MicrosoftAuthService);
    private getClient;
    createEvent(userEmail: string, event: any): Promise<any>;
    updateEvent(userEmail: string, eventId: string, event: any): Promise<any>;
    deleteEvent(userEmail: string, eventId: string): Promise<any>;
}
