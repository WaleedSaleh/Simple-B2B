// src/services/ProductService.ts
import { AppDataSource } from '../data-source';
import { Product } from '../entities/product/Product';
import {ProductImage} from "../entities/productImage/ProductImage";
import {convertImage} from "../utils/imageConverter";

export class ProductService {
    private productRepository = AppDataSource.getRepository(Product);

    public async getAllProducts(): Promise<Product[]> {
        return this.productRepository.find();
    }

    public async getProductById(id: number): Promise<Product | null> {
        return this.productRepository.findOneBy({ id });
    }

    public async createProduct(productData: Partial<Product>): Promise<Product> {
        const product = this.productRepository.create(productData);
        return this.productRepository.save(product);
    }

    public async updateProduct(id: number, productData: Partial<Product>): Promise<Product> {
        const product = await this.productRepository.findOneBy({ id });
        if (product) {
            this.productRepository.merge(product, productData);
            return this.productRepository.save(product);
        }
        throw new Error('Product not found');
    }

    public async deleteProduct(id: number): Promise<void> {
        await AppDataSource.transaction(async transactionalEntityManager => {
            const product = await this.productRepository.findOne({
                where: { id: id },
                relations: ['images']
            });
            if (!product) {
                throw new Error('Product not found');
            }
            if (product.images) {
                await transactionalEntityManager.remove(ProductImage, product.images);
            }
            await transactionalEntityManager.remove(Product, product);
        });
    }


    async addImagesToProduct(productId: number, files: Express.Multer.File[]): Promise<ProductImage[]> {
        const productRepository = AppDataSource.getRepository(Product);
        const imageRepository = AppDataSource.getRepository(ProductImage);

        const product = await productRepository.findOneBy({ id: productId });
        if (!product) throw new Error('Product not found');

        const images = await Promise.all(files.map(async file => {
            const originalPath = file.path;
            const webpPath = await convertImage(originalPath, 'webp');

            const img = new ProductImage();
            img.imagePath = webpPath; // Store the path to the WEBP or AVIF file
            img.product = product;
            return imageRepository.save(img);
        }));

        return images;
    }


    async getProductImages(productId: number): Promise<ProductImage[]> {
        const imageRepository = AppDataSource.getRepository(ProductImage);
        return imageRepository.find({
            where: { product: { id: productId } },
            select: ['id', 'imagePath']
        });
    }

    async deleteProductImage(productId: number, imageId: number): Promise<void> {
        const imageRepository = AppDataSource.getRepository(ProductImage);
        await imageRepository.delete({ id: imageId, product: { id: productId } });
    }
}
