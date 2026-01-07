import { Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class CloudinaryService {
  
  // async uploadImage(file: Express.Multer.File): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     cloudinary.uploader
  //       .upload_stream({ folder: "pets" }, (error, result: any) => {
  //         if (error) reject("Error al subir la imagen");
  //         resolve(result.secure_url);
  //       })
  //       .end(file.buffer);
  //   });
  // }

  async uploadImage(file: Express.Multer.File, folder: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result: any) => {
        if (error) return reject("Error al subir la imagen");
        resolve(result.secure_url);
      })
      .end(file.buffer);
  });
}

//  async deleteImage(imageUrl: string): Promise<void> {
//     return new Promise((resolve, reject) => {
//       const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];
//       cloudinary.uploader.destroy(publicId, (error, result) => {
//         if (error || result.result !== "ok")
//           reject("Error al borrar la imagen");
//         else resolve();
//       });
//     });
//   }
async deleteImage(imageUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const urlParts = imageUrl.split("/");
      const fileNameWithExt = urlParts[urlParts.length - 1];
      const folderPath = urlParts.slice(urlParts.indexOf("upload") + 1, -1).join("/");
      const fileName = fileNameWithExt.split(".")[0];
      const publicId = `${folderPath}/${fileName}`;

      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error || result.result !== "ok") {
          return reject("Error al borrar la imagen");
        }
        resolve();
      });
    } catch (err) {
      reject("Error al procesar la URL de la imagen");
    }
  });
}

  // Actualizar imagen (opcional)
  // async updateImage(
  //   oldImageUrl: string,
  //   newFile: Express.Multer.File
  // ): Promise<string> {
  //   try {
  //     if (oldImageUrl) {
  //       await this.deleteImage(oldImageUrl);
  //     }

  //     return await this.uploadImage(newFile);
  //   } catch (error) {
  //     throw new Error("Error al actualizar la imagen en Cloudinary");
  //   }
  // }

  async updateImage(
  oldImageUrl: string,
  newFile: Express.Multer.File,
  folder: string
): Promise<string> {
  try {
    if (oldImageUrl) {
      await this.deleteImage(oldImageUrl);
    }

    return await this.uploadImage(newFile, folder);
  } catch (error) {
    throw new Error("Error al actualizar la imagen en Cloudinary");
  }
}
}
