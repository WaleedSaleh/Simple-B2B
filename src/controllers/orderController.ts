import { Request, Response } from 'express';
import {OrderService} from "../services/orderService";

export class OrderController {
    private orderService: OrderService = new OrderService();

    async getAllOrders(req: Request, res: Response): Promise<any> {
        try {
            const orders = await this.orderService.getAllOrders();
            return res.json(orders);
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getOrderById(req: Request, res: Response): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            const order = await this.orderService.getOrderById(id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            return res.json(order);
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async createOrder(req: Request, res: Response): Promise<any> {
        try {
            console.log("createOrder :: req.body :: ", req.body );
            const newOrder = await this.orderService.createOrder(req.body);
            return res.status(201).json(newOrder);
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateOrder(req: Request, res: Response): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            const updatedOrder = await this.orderService.updateOrder(id, req.body);
            return res.json(updatedOrder);
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteOrder(req: Request, res: Response): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            await this.orderService.deleteOrder(id);
            return res.status(204).send();
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }


    async getFilteredOrders(req: Request, res: Response): Promise<any> {
        try {
            console.log("getFilteredOrders :: ", )
            const filters = {
                name: req?.query?.name as string,
                email: req?.query?.email as string,
                phoneNumber: req?.query?.phoneNumber as string,
                status: req?.query?.status as string,
                orderDate: req?.query?.orderDate as string,
            };

            console.log("getFilteredOrders :: filters ", filters);
            const orders = await this.orderService.findOrdersWithFilters(filters);
            return res.json(orders);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }




}
