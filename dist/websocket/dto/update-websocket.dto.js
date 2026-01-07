"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWebsocketDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_websocket_dto_1 = require("./create-websocket.dto");
class UpdateWebsocketDto extends (0, mapped_types_1.PartialType)(create_websocket_dto_1.CreateWebsocketDto) {
    id;
}
exports.UpdateWebsocketDto = UpdateWebsocketDto;
//# sourceMappingURL=update-websocket.dto.js.map