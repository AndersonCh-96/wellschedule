import { Injectable, Logger } from '@nestjs/common';
import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch';
import { MicrosoftAuthService } from '../microsoft-auth/microsoft-auth.service';

@Injectable()
export class MicrosoftGraphService {
    private readonly logger = new Logger(MicrosoftGraphService.name);
    private client: Client | null;
    private clientPromise: Promise<Client> | null;

    constructor(private readonly auth: MicrosoftAuthService) { }

    private async getClient(): Promise<Client> {
        // Reutilizar el cliente si ya existe
        if (this.client) {
            return this.client;
        }

        // Evitar múltiples llamadas simultáneas
        if (!this.clientPromise) {
            this.clientPromise = this.createClient();
        }

        return this.clientPromise;
    }

    private async createClient(): Promise<Client> {
        try {
            const token = await this.auth.getToken();
            this.client = Client.init({
                authProvider: (done) => done(null, token),
            });
            return this.client;
        } catch (error) {
            this.logger.error('Error creando cliente de Graph', error);
            this.clientPromise = null; // Reset para reintentar
            throw error;
        }
    }

    async createEvent(userEmail: string, event: any) {
        try {
            const client = await this.getClient();
            return await client.api(`/users/${userEmail}/calendar/events`).post(event);
        } catch (error) {
            this.logger.error(`Error creando evento para ${userEmail}`, error);
            throw error;
        }
    }

    async deleteEvent(userEmail: string, eventId: string) {
        try {
            const client = await this.getClient();
            return await client.api(`/users/${userEmail}/events/${eventId}`).delete();
        } catch (error) {
            this.logger.error(`Error eliminando evento ${eventId} para ${userEmail}`, error);
            throw error;
        }
    }
}
