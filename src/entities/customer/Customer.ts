// src/entities/Customer.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";
import {Order} from "../order/Order";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 150, unique: true, nullable: false })
    email: string;

    @Column({ type: "varchar", length: 15, nullable: true })
    phoneNumber: string; // Optional phone number field

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Order, order => order.customer)
    orders: Order[]; // Relationship to orders
}
