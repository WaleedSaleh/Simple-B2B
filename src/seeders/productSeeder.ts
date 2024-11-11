import { DataSource } from 'typeorm';
import {Product} from "../entities/product/Product";
import {Category} from "../entities/category/Category";
import { faker } from '@faker-js/faker';
import {ProductImage} from "../entities/productImage/ProductImage";

export async function seedProduct(dataSource: DataSource): Promise<void> {
    const productRepository = dataSource.getRepository(Product);
    const categoryRepository = dataSource.getRepository(Category);
    const productImageRepository = dataSource.getRepository(ProductImage);

    // Fetch all categories to ensure each product is linked to a valid category
    const categories = await categoryRepository.find();
    if (categories.length === 0) {
        console.log('No categories found, please seed categories first.');
        return;
    }

    const products = [];
    for (let i = 0; i < 100; i++) {
        const category = faker.helpers.arrayElement(categories); // Randomly select a category
        products.push(productRepository.create({
            name: faker.commerce.productName(),
            sku: faker.commerce.isbn(10),
            description: faker.commerce.productDescription(),
            cost: parseFloat(faker.commerce.price({min:20, max:100})),
            price: parseFloat(faker.commerce.price({min:101, max:500})),
            stock: faker.number.int({ min: 10, max: 100 }),
            category: category
        }));

        const savedProduct = await productRepository.save(products);


        // Assume each product will have between 1 to 5 images
        const imageCount = faker.number.int({ min: 1, max: 5 });
        for (let j = 0; j < imageCount; j++) {
            const productImage = productImageRepository.create({
                imagePath: faker.image.url(),  // Using Faker to generate a placeholder image URL
                product: savedProduct[j]
            });
            await productImageRepository.save(productImage);
        }

    }
    await productRepository.save(products);
    console.log('Products seeded successfully.');
}
