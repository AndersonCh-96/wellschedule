"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrosoftAuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let MicrosoftAuthService = class MicrosoftAuthService {
    configService;
    token;
    expiresAt;
    constructor(configService) {
        this.configService = configService;
    }
    async getToken() {
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
        const response = await axios_1.default.post(url, params);
        this.token = response.data.access_token;
        this.expiresAt = Date.now() + response.data.expires_in * 1000;
        return this.token;
    }
};
exports.MicrosoftAuthService = MicrosoftAuthService;
exports.MicrosoftAuthService = MicrosoftAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MicrosoftAuthService);
//# sourceMappingURL=microsoft-auth.service.js.map