import {Category} from "../entities/category/Category";
import { AppDataSource } from "../data-source";

export class CategoryService {
    private categoryRepository = AppDataSource.getRepository(Category);

    async getAllCategories(): Promise<Category[]> {
        try {
            return await this.categoryRepository.find();
        } catch (error) {
            throw new Error('Error retrieving categories');
        }
    }

    async getCategoryById(id: number): Promise<Category | null> {
        try {
            return await this.categoryRepository.findOneBy({ id });
        } catch (error) {
            throw new Error('Error finding category');
        }
    }

    async createCategory(categoryData: Category): Promise<Category> {
        try {
            const category = this.categoryRepository.create(categoryData);
            return await this.categoryRepository.save(category);
        } catch (error) {
            throw new Error('Error creating category');
        }
    }

    async updateCategory(id: number, categoryData: Partial<Category>): Promise<Category> {
        try {
            const category = await this.categoryRepository.findOneBy({ id });
            if (category) {
                this.categoryRepository.merge(category, categoryData);
                return await this.categoryRepository.save(category);
            } else {
                throw new Error('Category not found');
            }
        } catch (error) {
            throw new Error('Error updating category');
        }
    }

    async deleteCategory(id: number): Promise<void> {
        try {
            await this.categoryRepository.delete(id);
        } catch (error) {
            throw new Error('Error deleting category');
        }
    }
}
