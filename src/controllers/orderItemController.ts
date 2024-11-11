import { Request, Response } from 'express';
import {OrderItemService} from "../services/orderItemService";


export class OrderItemController {
    private orderItemService: OrderItemService = new OrderItemService();

    async getAllOrderItems(req: Request, res: Response): Promise<any> {
        try {
            const orderItems = await this.orderItemService.getAllOrderItems();
            return res.json(orderItems);
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getOrderItemById(req: Request, res: Response): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            const orderItem = await this.orderItemService.getOrderItemById(id);
            return res.json(orderItem);
        } catch (error:any) {
            return res.status(404).json({ message: error.message });
        }
    }

    async createOrderItem(req: Request, res: Response): Promise<any> {
        try {
            const newOrderItem = await this.orderItemService.createOrderItem(req.body);
            return res.status(201).json(newOrderItem);
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateOrderItem(req: Request, res: Response): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            const updatedOrderItem = await this.orderItemService.updateOrderItem(id, req.body);
            return res.json(updatedOrderItem);
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteOrderItem(req: Request, res: Response): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            await this.orderItemService.deleteOrderItem(id);
            return res.status(204).send();
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
