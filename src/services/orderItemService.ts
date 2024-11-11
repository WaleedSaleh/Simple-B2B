import {EntityManager, Repository} from 'typeorm';
import {OrderItem} from "../entities/orderItem/OrderItem";
import { AppDataSource } from '../data-source';
import {Order} from "../entities/order/Order";

export class OrderItemService {
    private orderItemRepository: Repository<OrderItem> = AppDataSource.getRepository(OrderItem);

    async getAllOrderItems(): Promise<OrderItem[]> {
        try {
            return await this.orderItemRepository.find({ relations: ['order', 'product'] });
        } catch (error:any) {
            throw new Error('Failed to retrieve order items: ' + error.message);
        }
    }

    async getOrderItemById(id: number): Promise<OrderItem | null> {
        try {
            const orderItem = await this.orderItemRepository.findOne({
                where: { id },
                relations: ['order', 'product']
            });
            if (!orderItem) {
                throw new Error('OrderItem not found');
            }
            return orderItem;
        } catch (error:any) {
            throw new Error('Failed to find order item: ' + error.message);
        }
    }


    async createOrderItem(orderItemData: Partial<any>): Promise<OrderItem> {
        const entityManager = AppDataSource.manager;
        console.log("createOrderItem :: orderItemData :: ", orderItemData)
        try {
            return await entityManager.transaction(async transactionManager => {
                const orderItem = transactionManager.create(OrderItem, {
                    order: orderItemData.order,
                    product: orderItemData.product,
                    quantity: orderItemData.quantity,
                    unitPrice: orderItemData.unitPrice,
                    discount: orderItemData.discount
                });
                const savedOrderItem = await transactionManager.save(orderItem);
                console.log("savedOrderItem :: ", savedOrderItem);
                await this.updateOrderTotal( orderItemData.orderId , transactionManager);
                return savedOrderItem;
            });
        } catch (error:any) {
            throw new Error('Failed to create order item: ' + error.message);
        }
    }

    async updateOrderItem(id: number, orderItemData: Partial<any>): Promise<OrderItem> {
        const entityManager = AppDataSource.manager;
        console.log("updateOrderItem :: orderItemData :: ", orderItemData)
        try {
            return await entityManager.transaction(async transactionManager => {
                const orderItem = await transactionManager.findOne(OrderItem, { where: { id }, relations: ['order'] });
                if (!orderItem) throw new Error('OrderItem not found');
                transactionManager.merge(OrderItem, orderItem, orderItemData);
                const updatedOrderItem = await transactionManager.save(orderItem);
                await this.updateOrderTotal(updatedOrderItem?.order?.id, transactionManager);
                return updatedOrderItem;
            });
        } catch (error:any) {
            throw new Error('Failed to update order item: ' + error.message);
        }
    }

    private async updateOrderTotal(orderId: number, transactionManager: EntityManager): Promise<void> {
        try {
            console.log("Enteretd the updateOrderTotal :: orderId :: ", orderId);
            const order = await transactionManager.findOne(Order, { where: { id: orderId }, relations: ['orderItems'] });
            if (!order) throw new Error('Order not found');

            const totalAmount = order.orderItems.reduce((total: number, item) => {
                const itemTotal = item?.unitPrice * item?.quantity;
                const itemDiscount = item.discount || 0;
                return total + (itemTotal - itemDiscount);
            }, 0);

            order.totalAmount = totalAmount;
            console.log("totalAmount :: ", totalAmount);
            await transactionManager.save(order);
        } catch (error: any) {
            throw new Error('Failed to update order total: ' + error.message);
        }
    }


    async deleteOrderItem(id: number): Promise<void> {
        try {
            const result = await this.orderItemRepository.delete(id);
            if (result.affected === 0) {
                throw new Error('No order item found to delete');
            }
        } catch (error: any) {
            throw new Error('Failed to delete order item: ' + error.message);
        }
    }
}
