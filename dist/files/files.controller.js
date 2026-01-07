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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const fileName_helper_1 = require("./helpers/fileName.helper");
const config_1 = require("@nestjs/config");
let FilesController = class FilesController {
    filesService;
    config;
    constructor(filesService, config) {
        this.filesService = filesService;
        this.config = config;
    }
    getFile(res, imageName) {
        const data = this.filesService.getImageProduct(imageName);
        res.sendFile(data);
    }
    uploadFile(file) {
        const secureUrl = `${this.config.get('HOST_API_IMAGE')}/files/product/${file.filename}`;
        return secureUrl;
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Get)('product/:imageName'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('imageName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "getFile", null);
__decorate([
    (0, common_1.Post)('product'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './static/products',
            filename: fileName_helper_1.fileName,
        }),
    })),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: 'image/jpeg' }),
            new common_1.MaxFileSizeValidator({ maxSize: 1048576 }),
        ],
        fileIsRequired: true,
        exceptionFactory: (error) => {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'File validation failed',
                error: error,
            });
        },
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadFile", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService,
        config_1.ConfigService])
], FilesController);
//# sourceMappingURL=files.controller.js.map