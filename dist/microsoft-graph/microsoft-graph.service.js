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
var MicrosoftGraphService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrosoftGraphService = void 0;
const common_1 = require("@nestjs/common");
const microsoft_graph_client_1 = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");
const microsoft_auth_service_1 = require("../microsoft-auth/microsoft-auth.service");
let MicrosoftGraphService = MicrosoftGraphService_1 = class MicrosoftGraphService {
    auth;
    logger = new common_1.Logger(MicrosoftGraphService_1.name);
    client;
    clientPromise;
    constructor(auth) {
        this.auth = auth;
    }
    async getClient() {
        if (this.client) {
            return this.client;
        }
        if (!this.clientPromise) {
            this.clientPromise = this.createClient();
        }
        return this.clientPromise;
    }
    async createClient() {
        try {
            const token = await this.auth.getToken();
            this.client = microsoft_graph_client_1.Client.init({
                authProvider: (done) => done(null, token),
            });
            return this.client;
        }
        catch (error) {
            this.logger.error('Error creando cliente de Graph', error);
            this.clientPromise = null;
            throw error;
        }
    }
    async createEvent(userEmail, event) {
        try {
            const client = await this.getClient();
            return await client.api(`/users/${userEmail}/calendar/events`).post(event);
        }
        catch (error) {
            this.logger.error(`Error creando evento para ${userEmail}`, error);
            throw error;
        }
    }
    async deleteEvent(userEmail, eventId) {
        try {
            const client = await this.getClient();
            return await client.api(`/users/${userEmail}/events/${eventId}`).delete();
        }
        catch (error) {
            this.logger.error(`Error eliminando evento ${eventId} para ${userEmail}`, error);
            throw error;
        }
    }
};
exports.MicrosoftGraphService = MicrosoftGraphService;
exports.MicrosoftGraphService = MicrosoftGraphService = MicrosoftGraphService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [microsoft_auth_service_1.MicrosoftAuthService])
], MicrosoftGraphService);
//# sourceMappingURL=microsoft-graph.service.js.map