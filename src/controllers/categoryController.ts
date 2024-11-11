import { Request, Response } from 'express';
import {CategoryService} from "../services/categoryService";

export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    async listAllCategories(req: Request, res: Response) {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.json(categories);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }

    async getCategory(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const category = await this.categoryService.getCategoryById(id);
            if (category) {
                res.json(category);
            } else {
                res.status(404).send("Category not found");
            }
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    async createCategory(req: Request, res: Response) {
        try {
            const newCategory = await this.categoryService.createCategory(req.body);
            res.status(201).json(newCategory);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    async updateCategory(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const updatedCategory = await this.categoryService.updateCategory(id, req.body);
            res.json(updatedCategory);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }

    async deleteCategory(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            await this.categoryService.deleteCategory(id);
            res.status(204).send();
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }
}
