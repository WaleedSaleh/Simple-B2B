import { DataSource } from 'typeorm';
import {Order} from "../entities/order/Order";
import {OrderItem} from "../entities/orderItem/OrderItem";
import {Customer} from "../entities/customer/Customer";
import {Product} from "../entities/product/Product";
import { faker } from '@faker-js/faker';
import {OrderStatus} from "../enums/orderStatus";


export async function seedOrders(dataSource: DataSource): Promise<void> {
    const orderRepository = dataSource.getRepository(Order);
    const orderItemRepository = dataSource.getRepository(OrderItem);
    const customerRepository = dataSource.getRepository(Customer);
    const productRepository = dataSource.getRepository(Product);

    // Fetch all customers and products
    const customers = await customerRepository.find();
    const products = await productRepository.find();

    if (customers.length === 0 || products.length === 0) {
        console.log('Customers or products are not seeded yet.');
        return;
    }

    for (let i = 0; i < 20; i++) {
        const order = orderRepository.create({
            orderDate: faker.date.recent({days:90}),
            status: faker.helpers.arrayElement(Object.values(OrderStatus)),
            totalAmount: 0,  // Will calculate after adding items
            customer: faker.helpers.arrayElement(customers),
            createdAt: faker.date.recent({days:5}),
            updatedAt: faker.date.recent({days:12}),
        });

        const savedOrder = await orderRepository.save(order);

        let totalAmount = 0;
        const numItems = faker.number.int({ min: 1, max: 5 });
        for (let j = 0; j < numItems; j++) {
            const product = faker.helpers.arrayElement(products);
            const quantity = faker.number.int({ min: 1, max: 10 });
            const unitPrice = products[j].price;  // Assume `price` is a string from faker
            const discount = faker.number.float({ min: 0, max: unitPrice * 0.1, });

            const orderItem = orderItemRepository.create({
                order: savedOrder,
                product: product,
                quantity: quantity,
                unitPrice: unitPrice,
                discount: discount,
                createdAt: savedOrder.createdAt,
                updatedAt: faker.date.recent({days:1}),
            });

            totalAmount += (quantity * unitPrice) - discount;
            await orderItemRepository.save(orderItem);
        }

        // Update the total amount of the order
        savedOrder.totalAmount = totalAmount;
        await orderRepository.save(savedOrder);
    }

    console.log('Orders and order items seeded successfully.');
}
