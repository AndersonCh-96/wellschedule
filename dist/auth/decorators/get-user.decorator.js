"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserDec = void 0;
const common_1 = require("@nestjs/common");
exports.GetUserDec = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
        throw new common_1.InternalServerErrorException('Usuario no encontrado');
    }
    return data ? user[data] : user;
});
//# sourceMappingURL=get-user.decorator.js.map