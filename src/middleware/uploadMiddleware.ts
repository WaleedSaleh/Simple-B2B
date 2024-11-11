import fs from 'fs';
import path from 'path';
import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
    destination: function(req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        const dir = path.join(__dirname, '../../product_images/original');
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err && err.code !== 'EXIST') {
                return cb(err, dir);
            }
            cb(null, dir);
        });
    },
    filename: function(req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = function(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        throw new Error("Unsupported file format")
    }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
