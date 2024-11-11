import { Repository } from 'typeorm';
import {Order} from "../entities/order/Order";
import { AppDataSource } from '../data-source';
import {OrderItem} from "../entities/orderItem/OrderItem";


export class OrderService {
    private orderRepository: Repository<Order> = AppDataSource.getRepository(Order);

    async getAllOrders(): Promise<Order[]> {
        try {
            return await this.orderRepository.find({ relations: ['orderItems', 'customer'] });
        } catch (error:any) {
            throw new Error('Failed to retrieve orders: ' + error.message);
        }
    }

    async getOrderById(id: number): Promise<Order | null> {
        try {
            const order = await this.orderRepository.findOne({
                where: { id },
                relations: ['orderItems', 'customer']
            });
            if (!order) {
                throw new Error('Order not found');
            }
            return order;
        } catch (error:any) {
            throw new Error('Failed to find order: ' + error.message);
        }
    }

    async createOrder(orderData: Partial<Order> & { orderItems: Partial<OrderItem>[] }): Promise<Order> {
        try {
            console.log("createOrder :: server :: orderData :: ", orderData);

            let totalAmount = 0;

            orderData?.orderItems?.forEach(item => {
                const itemTotal = item.unitPrice * item.quantity;
                const itemDiscount = item.discount ? itemTotal * (item.discount / 100) : 0;
                totalAmount += (itemTotal - itemDiscount);
            });

            const order = this.orderRepository.create({
                ...orderData,
                totalAmount: totalAmount,
                customer: orderData.customer
            });

            return await this.orderRepository.save(order);
        } catch (error:any) {
            throw new Error('Failed to create order: ' + error.message);
        }
    }

    async updateOrder(id: number, orderData: Partial<Order> & { orderItems: Partial<OrderItem>[] }): Promise<Order> {
        try {
            const order = await this.orderRepository.findOneBy({ id });
            if (!order) {
                throw new Error('Order not found');
            }


            let totalAmount = 0;
            orderData?.orderItems?.forEach(item => {
                const itemTotal = item.unitPrice * item.quantity;
                const itemDiscount = item.discount ? itemTotal * (item.discount / 100) : 0;
                totalAmount += (itemTotal - itemDiscount);
            });

            // Update the order with new data
            this.orderRepository.merge(order, {
                ...orderData,
                totalAmount: totalAmount
            });

            return await this.orderRepository.save(order);
        } catch (error:any) {
            throw new Error('Failed to update order: ' + error.message);
        }
    }

    async deleteOrder(id: number): Promise<void> {
        try {
            const deleteResult = await this.orderRepository.delete(id);
            if (deleteResult.affected === 0) {
                throw new Error('Order not found');
            }
        } catch (error:any) {
            throw new Error('Failed to delete order: ' + error.message);
        }
    }



    async findOrdersWithFilters(filters: any): Promise<Order[]> {
        console.log("WALEEED!!");
        const queryBuilder = this.orderRepository.createQueryBuilder("order");

        queryBuilder.innerJoinAndSelect("order.customer", "customer");

        console.log("filters :: ", filters);

        if (filters.name) {
            queryBuilder.andWhere("customer.name ILIKE :name", { name: `%${filters.name}%` });
        }
        if (filters.email) {
            queryBuilder.andWhere("customer.email ILIKE :email", { email: `%${filters.email}%` });
        }
        if (filters.phoneNumber) {
            queryBuilder.andWhere("customer.phoneNumber ILIKE :phoneNumber", { phoneNumber: `%${filters.phoneNumber}%` });
        }
        if (filters.status) {
            queryBuilder.andWhere("order.status = :status", { status: `${filters.status}` });
        }
        if (filters.orderDate) {
            queryBuilder.andWhere("DATE(order.orderDate) = DATE(:orderDate)", { orderDate: filters.orderDate });
        }

        return queryBuilder.getMany();
    }



}
