import 'isomorphic-fetch';
import { MicrosoftAuthService } from '../microsoft-auth/microsoft-auth.service';
export declare class MicrosoftGraphService {
    private readonly auth;
    private readonly logger;
    private client;
    private clientPromise;
    constructor(auth: MicrosoftAuthService);
    private getClient;
    private createClient;
    createEvent(userEmail: string, event: any): Promise<any>;
    deleteEvent(userEmail: string, eventId: string): Promise<any>;
}
