import { Repository } from 'typeorm';
import {Customer} from "../entities/customer/Customer";
import { AppDataSource } from '../data-source';

export class CustomerService {
    private customerRepository: Repository<Customer> = AppDataSource.getRepository(Customer);

    async getAllCustomers(): Promise<Customer[]> {
        try {
            return await this.customerRepository.find();
        } catch (error) {
            throw new Error('Failed to retrieve customers');
        }
    }

    async getCustomerById(id: number): Promise<Customer | null> {
        try {
            return await this.customerRepository.findOneBy({ id });
        } catch (error) {
            throw new Error('Failed to find customer');
        }
    }

    async createCustomer(customerData: Partial<Customer>): Promise<Customer> {
        try {
            const customer = this.customerRepository.create(customerData);
            return await this.customerRepository.save(customer);
        } catch (error) {
            throw new Error('Failed to create customer');
        }
    }

    async updateCustomer(id: number, customerData: Partial<Customer>): Promise<Customer> {
        try {
            const customer = await this.customerRepository.findOneBy({ id });
            if (!customer) {
                throw new Error('Customer not found');
            }
            this.customerRepository.merge(customer, customerData);
            return await this.customerRepository.save(customer);
        } catch (error) {
            throw new Error('Failed to update customer');
        }
    }

    async deleteCustomer(id: number): Promise<void> {
        try {
            const deleteResponse = await this.customerRepository.delete(id);
            if (!deleteResponse.affected) {
                throw new Error('Customer not found');
            }
        } catch (error) {
            throw new Error('Failed to delete customer');
        }
    }
}
