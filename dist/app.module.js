"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const common_module_1 = require("./common/common.module");
const files_module_1 = require("./files/files.module");
const auth_module_1 = require("./auth/auth.module");
const roles_module_1 = require("./roles/roles.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const room_module_1 = require("./room/room.module");
const reservation_module_1 = require("./reservation/reservation.module");
const websocket_module_1 = require("./websocket/websocket.module");
const microsoft_graph_service_1 = require("./microsoft-graph/microsoft-graph.service");
const microsoft_auth_service_1 = require("./microsoft-auth/microsoft-auth.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                url: "postgresql://postgres:OIhSgjscRwmzvdaBtfOBvuvMQmLyzWgb@hopper.proxy.rlwy.net:44482/railway",
                autoLoadEntities: true,
                synchronize: true,
                logging: false,
            }),
            common_module_1.CommonModule,
            files_module_1.FilesModule,
            auth_module_1.AuthModule,
            roles_module_1.RolesModule,
            cloudinary_module_1.CloudinaryModule,
            room_module_1.RoomModule,
            reservation_module_1.ReservationModule,
            websocket_module_1.WebsocketModule,
        ],
        providers: [microsoft_graph_service_1.MicrosoftGraphService, microsoft_auth_service_1.MicrosoftAuthService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map