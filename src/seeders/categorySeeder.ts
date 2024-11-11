import { DataSource } from 'typeorm';
import {Category} from "../entities/category/Category";
import { faker } from '@faker-js/faker';

export async function seedCategory(dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);
    const categories = [];

    for (let i = 0; i < 5; i++) {
        categories.push(categoryRepository.create({
            name: faker.commerce.department(),
            description: faker.lorem.sentence()
        }));
    }

    await categoryRepository.save(categories);
    console.log('Categories seeded successfully.');
}
