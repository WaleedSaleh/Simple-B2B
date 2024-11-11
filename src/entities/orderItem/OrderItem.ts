// src/entities/OrderItem.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn, DeleteDateColumn
} from "typeorm";
import {Order} from "../order/Order";
import {Product} from "../product/Product";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.orderItems)
    @JoinColumn({ name: "orderId" })
    order: Order;


    @ManyToOne(() => Product, product => product.orderItems)
    @JoinColumn({ name: "productId" })
    product: Product;

    @Column('int')
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    unitPrice: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    discount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
