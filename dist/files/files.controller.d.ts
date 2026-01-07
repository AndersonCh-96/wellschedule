import { FilesService } from './files.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class FilesController {
    private readonly filesService;
    private readonly config;
    constructor(filesService: FilesService, config: ConfigService);
    getFile(res: Response, imageName: any): void;
    uploadFile(file: Express.Multer.File): string;
}
