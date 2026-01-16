import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';


@Injectable()
export class MicrosoftAuthService {
    private token: string;
    private expiresAt: number;

    constructor(private readonly configService: ConfigService) { }

    async getToken(): Promise<string> {
        if (this.token && Date.now() < this.expiresAt) {
            return this.token;
        }


        const clientId = this.configService.get('GRAPH_CLIENT_ID');
        const clientSecret = this.configService.get('GRAPH_CLIENT_SECRET');
        const scope = this.configService.get('GRAPH_SCOPE');

        if (!clientId || !clientSecret || !scope) {
            throw new Error('Variables de entorno faltantes');
        }
        const url = `https://login.microsoftonline.com/${this.configService.get('GRAPH_TENANT_ID')}/oauth2/v2.0/token`;
        const params = new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            scope: scope,
            grant_type: 'client_credentials'
        });


        const response = await axios.post(url, params);
        this.token = response.data.access_token;
        this.expiresAt = Date.now() + response.data.expires_in * 1000;

        return this.token;
    }
}
