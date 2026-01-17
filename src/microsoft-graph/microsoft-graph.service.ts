import { Injectable } from '@nestjs/common';
import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch';
import { MicrosoftAuthService } from '../microsoft-auth/microsoft-auth.service';

@Injectable()
export class MicrosoftGraphService {
    constructor(private readonly auth: MicrosoftAuthService) { }

    private async getClient() {
        const token = await this.auth.getToken();
        console.log("TOken de entrada", token)

        return Client.init({
            authProvider: (done) => done(null, token),
        });
    }

    async createEvent(userEmail: string, event: any) {
        const client = await this.getClient();
        return client.api(`/users/${userEmail}/calendar/events`).query({ sendUpdates: 'all' }).post(event);
    }

    async deleteEvent(userEmail: string, eventId: string) {
        const client = await this.getClient();
        return client.api(`/users/${userEmail}/events/${eventId}`).query({ sendUpdates: 'all' }).delete();
    }
}
