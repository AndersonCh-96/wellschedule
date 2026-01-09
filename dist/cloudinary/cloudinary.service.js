"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
let CloudinaryService = class CloudinaryService {
    async uploadImage(file, folder) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream({ folder }, (error, result) => {
                if (error)
                    return reject("Error al subir la imagen");
                resolve(result.secure_url);
            })
                .end(file.buffer);
        });
    }
    async deleteImage(imageUrl) {
        return new Promise((resolve, reject) => {
            try {
                const urlParts = imageUrl.split("/");
                const fileNameWithExt = urlParts[urlParts.length - 1];
                const folderPath = urlParts.slice(urlParts.indexOf("upload") + 1, -1).join("/");
                const fileName = fileNameWithExt.split(".")[0];
                const publicId = `${folderPath}/${fileName}`;
                cloudinary_1.v2.uploader.destroy(publicId, (error, result) => {
                    if (error || result.result !== "ok") {
                        return reject("Error al borrar la imagen");
                    }
                    resolve();
                });
            }
            catch (err) {
                reject("Error al procesar la URL de la imagen");
            }
        });
    }
    async updateImage(oldImageUrl, newFile, folder) {
        try {
            if (oldImageUrl) {
                await this.deleteImage(oldImageUrl);
            }
            return await this.uploadImage(newFile, folder);
        }
        catch (error) {
            throw new Error("Error al actualizar la imagen en Cloudinary");
        }
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)()
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map