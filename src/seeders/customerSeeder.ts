import { DataSource } from 'typeorm';
import {Customer} from "../entities/customer/Customer";
import { faker } from '@faker-js/faker';

export async function seedCustomer(dataSource: DataSource): Promise<void> {
    const customerRepository = dataSource.getRepository(Customer);
    const customers = [];

    for (let i = 0; i < 10; i++) {
        customers.push(customerRepository.create({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phoneNumber:faker.phone.number({style:'international'})
        }));
    }

    await customerRepository.save(customers);
    console.log('Customers seeded successfully.');
}
