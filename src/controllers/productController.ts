// src/controllers/ProductController.ts
import { Request, Response } from 'express';
import {ProductService} from "../services/productService";
import {Err} from "joi";

export class ProductController {
    private productService: ProductService = new ProductService();

    public async getAllProducts(req: Request, res: Response): Promise<any> {
        try {
            const products = await this.productService.getAllProducts();
            return res.json(products);
        }catch (err: any){
            console.log("getAllProducts :: ", err);
            return res.status(500).json({error: err});
        }

    }

    public async getProductById(req: Request, res: Response): Promise<any> {
        try {
            const product = await this.productService.getProductById(parseInt(req.params.id));
            return res.json(product);
        }catch (err: any){
            console.log("getProductById :: ", err);
            return res.status(500).json({error: err});
        }
    }

    public async createProduct(req: Request, res: Response): Promise<any> {
        try {
            const newProduct = await this.productService.createProduct(req.body);
            return res.json(newProduct);
        }catch (err: any){
            console.log("createProduct :: ", err);
            return res.status(500).json({error: err});
        }
    }

    public async updateProduct(req: Request, res: Response): Promise<any> {
        try {
            const updatedProduct = await this.productService.updateProduct(parseInt(req.params.id), req.body);
            return res.json(updatedProduct);
        }catch (err: any){
            console.log("updateProduct :: ", err);
            return res.status(500).json({error: err});
        }
    }

    public async deleteProduct(req: Request, res: Response): Promise<any> {
        try {
            const result = await this.productService.deleteProduct(parseInt(req.params.id));
            return res.json({ result });
        }catch (err: any){
            console.log("deleteProduct :: ", err);
            return res.status(500).json({error: err});
        }
    }


    async addProductImages(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const files: Express.Multer.File[] = req.files as Express.Multer.File[];
            const images = await this.productService.addImagesToProduct(parseInt(id), files);
            return res.json(images);
        }catch (err: any){
            console.log("addProductImages :: ", err);
            return res.status(500).json({error: err});
        }
    }

    async getProductImages(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const images = await this.productService.getProductImages(parseInt(id));
            return res.json(images);
        }catch (err: any){
            console.log("getProductImages :: ", err);
            return res.status(500).json({error: err});
        }
    }

    async deleteProductImage(req: Request, res: Response): Promise<any> {
        try {
            const { id, imageId } = req.params;
            await this.productService.deleteProductImage(parseInt(id), parseInt(imageId));
            return res.sendStatus(204);
        }catch (err: any){
            console.log("deleteProductImage :: ", err);
            return res.status(500).json({error: err});
        }
    }
}
