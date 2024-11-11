// src/utils/imageConverter.ts
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export const convertImage = async (filePath: string, format: 'webp' | 'avif') => {
    const newFormatPath = filePath.replace(path.extname(filePath), `.${format}`);

    await sharp(filePath)
        .toFormat(format, { quality: 80 })  // Adjust quality as needed
        .toFile(newFormatPath);

    return newFormatPath;
};
