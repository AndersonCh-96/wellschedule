"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketService = void 0;
const common_1 = require("@nestjs/common");
let WebsocketService = class WebsocketService {
    create(createWebsocketDto) {
        return 'This action adds a new websocket';
    }
    findAll() {
        return `This action returns all websocket`;
    }
    findOne(id) {
        return `This action returns a #${id} websocket`;
    }
    update(id, updateWebsocketDto) {
        return `This action updates a #${id} websocket`;
    }
    remove(id) {
        return `This action removes a #${id} websocket`;
    }
};
exports.WebsocketService = WebsocketService;
exports.WebsocketService = WebsocketService = __decorate([
    (0, common_1.Injectable)()
], WebsocketService);
//# sourceMappingURL=websocket.service.js.map