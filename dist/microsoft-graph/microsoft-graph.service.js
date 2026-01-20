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
exports.MicrosoftGraphService = void 0;
const common_1 = require("@nestjs/common");
const microsoft_graph_client_1 = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");
const microsoft_auth_service_1 = require("../microsoft-auth/microsoft-auth.service");
let MicrosoftGraphService = class MicrosoftGraphService {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    async getClient() {
        const token = await this.auth.getToken();
        console.log("TOken de entrada", token);
        return microsoft_graph_client_1.Client.init({
            authProvider: (done) => done(null, token),
        });
    }
    async createEvent(userEmail, event) {
        const client = await this.getClient();
        return client.api(`/users/${userEmail}/calendar/events`).query({ sendUpdates: 'all' }).post(event);
    }
    async updateEvent(userEmail, eventId, event) {
        const client = await this.getClient();
        return client.api(`/users/${userEmail}/events/${eventId}`).query({ sendUpdates: 'all' }).update(event);
    }
    async deleteEvent(userEmail, eventId) {
        const client = await this.getClient();
        return client.api(`/users/${userEmail}/events/${eventId}`).query({ sendUpdates: 'all' }).delete();
    }
};
exports.MicrosoftGraphService = MicrosoftGraphService;
exports.MicrosoftGraphService = MicrosoftGraphService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [microsoft_auth_service_1.MicrosoftAuthService])
], MicrosoftGraphService);
//# sourceMappingURL=microsoft-graph.service.js.map