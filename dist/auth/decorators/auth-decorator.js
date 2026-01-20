"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const rol_protected_decorator_1 = require("./rol-protected/rol-protected.decorator");
const passport_1 = require("@nestjs/passport");
const user_role_guard_1 = require("../guards/user-role/user-role.guard");
function Auth(...roles) {
    return (0, common_1.applyDecorators)((0, rol_protected_decorator_1.RolProtected)(...roles), (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), user_role_guard_1.UserRoleGuard));
}
//# sourceMappingURL=auth-decorator.js.map