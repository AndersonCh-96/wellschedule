import { BadRequestException, Injectable } from "@nestjs/common";
import { existsSync } from "fs";
import { join } from "path";

@Injectable()
export class FilesService {
  getImageProduct(img: any) {
    // construir path fisico conde se encuntra la imagen

    const path = join(__dirname, "../../static/products", img);

    if (!existsSync(path)) {
      throw new BadRequestException("No found image product");
    }

    return path;
  }
  uploadFile() {}
}
