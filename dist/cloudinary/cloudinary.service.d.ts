export declare class CloudinaryService {
    uploadImage(file: Express.Multer.File, folder: string): Promise<string>;
    deleteImage(imageUrl: string): Promise<void>;
    updateImage(oldImageUrl: string, newFile: Express.Multer.File, folder: string): Promise<string>;
}
