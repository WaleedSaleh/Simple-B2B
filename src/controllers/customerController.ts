import { Request, Response } from 'express';
import {CustomerService} from "../services/customerService";

export class CustomerController {
    private customerService: CustomerService = new CustomerService();

    async getAllCustomers(req: Request, res: Response): Promise<any> {
        try {
            const customers = await this.customerService.getAllCustomers();
            return res.json(customers);
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getCustomerById(req: Request, res: Response): Promise<any> {
        try {
            const customer = await this.customerService.getCustomerById(parseInt(req.params.id));
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            return res.json(customer);
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async createCustomer(req: Request, res: Response): Promise<any> {
        try {
            const newCustomer = await this.customerService.createCustomer(req.body);
            return res.status(201).json(newCustomer);
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateCustomer(req: Request, res: Response): Promise<any> {
        try {
            const updatedCustomer = await this.customerService.updateCustomer(parseInt(req.params.id), req.body);
            return res.json(updatedCustomer);
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteCustomer(req: Request, res: Response): Promise<any> {
        try {
            await this.customerService.deleteCustomer(parseInt(req.params.id));
            return res.status(204).send();
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
