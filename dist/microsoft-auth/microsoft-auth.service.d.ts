import { ConfigService } from '@nestjs/config';
export declare class MicrosoftAuthService {
    private readonly configService;
    private token;
    private expiresAt;
    constructor(configService: ConfigService);
    getToken(): Promise<string>;
}
