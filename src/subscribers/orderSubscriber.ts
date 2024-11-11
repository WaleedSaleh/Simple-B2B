import {
    EventSubscriber,
    EntitySubscriberInterface,
    UpdateEvent,
    DataSource
} from "typeorm";
import {Order} from "../entities/order/Order";
import sendOrderToThirdPartyApi from "../utils/sendOrderToThirdPartyApi";
import {AppDataSource} from "../data-source";

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order> {
    constructor(private dataSource: DataSource) {
    }

    listenTo() {
        return Order;
    }


    async afterUpdate(event: UpdateEvent<any>) {
        console.log(`AFTER ENTITY UPDATED: `, event.entity)
        if (event.entity) {
            try {
                console.log("entity :: ", event.entity.id)
                const fullOrder = await this.loadFullOrder(event.entity.id);
                console.log("fullOrder :: ", fullOrder);
                if (fullOrder) {
                    const orderDetails = this.prepareOrderDetails(fullOrder);
                    await this.sendOrderDetails(orderDetails);
                } else {
                    console.error('Order not found with ID:', event);
                }
            } catch (error) {
                console.error('Error processing updated order:', error);
            }
        } else {
            console.error('Updated order entity is undefined.');
        }
    }

    private async loadFullOrder(orderId: number): Promise<Order | null> {
        try {
            return AppDataSource.getRepository(Order).findOne({
                where: {id: orderId},
                relations: ["orderItems", "customer"] // Include any relations needed
            });
        } catch (error) {
            console.error('Error loading full order', error);
            return null;
        }
    }

    private prepareOrderDetails(order: Order) {
        console.log("prepareOrderDetails :: order :: ", order);
        try {
            return {
                order: order.id,
                orderDate: order.orderDate,
                totalAmount: order.totalAmount,
                status: order.status,
                orderItems: order.orderItems.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    discount: item.discount
                })),
                customer: {
                    name: order.customer.name,
                    email: order.customer.email,
                    mobileNumber: order.customer.phoneNumber,
                }
            };
        } catch (error) {
            console.error('Error prepareOrderDetails', error);
        }
    }

    private async sendOrderDetails(orderDetails: any) {
        try {
            await sendOrderToThirdPartyApi(orderDetails);
            console.log("Order details sent to third-party API successfully.");
        } catch (error) {
            console.error("Failed to send order details to third-party API:", error);
        }
    }
}
