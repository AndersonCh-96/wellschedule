import { ConfigService } from '@nestjs/config';
export declare class MicrosoftAuthService {
    private readonly configService;
    private token;
    private expiresAt;
    private readonly logger;
    constructor(configService: ConfigService);
    getToken(): Promise<string>;
}
