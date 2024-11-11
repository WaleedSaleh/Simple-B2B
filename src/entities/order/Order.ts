// src/entities/Order.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToOne, JoinColumn
} from "typeorm";
import {OrderItem} from "../orderItem/OrderItem";
import {OrderStatus} from "../../enums/orderStatus";
import {Customer} from "../customer/Customer";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp", nullable: false })
    orderDate: Date;

    @Column({type:"enum", enum:OrderStatus, default:OrderStatus.New})
    status: OrderStatus;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    totalAmount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];

    @ManyToOne(() => Customer, customer => customer.orders)
    @JoinColumn({ name: "customerId" })
    customer: Customer;
}
