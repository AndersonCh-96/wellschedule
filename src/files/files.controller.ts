import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Optional,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileName } from './helpers/fileName.helper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly config: ConfigService,
  ) {}

  @Get('product/:imageName')
  getFile(@Res() res: Response, @Param('imageName') imageName: any) {
    const data = this.filesService.getImageProduct(imageName);
    res.sendFile(data);
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/products',
        filename: fileName,
      }),
    }),
  )
  uploadFile(
    @Optional()
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new MaxFileSizeValidator({ maxSize: 1048576 }),
        ],
        fileIsRequired: true,
        exceptionFactory: (error: any) => {
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'File validation failed',
            error: error,
          });
        },
      }),
    )
    file: Express.Multer.File,
  ) {
    const secureUrl = `${this.config.get('HOST_API_IMAGE')}/files/product/${file.filename}`;
    return secureUrl;
  }
}
