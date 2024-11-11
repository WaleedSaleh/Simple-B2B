// src/entities/Product.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn, DeleteDateColumn
} from "typeorm";
import {Category} from "../category/Category";
import {OrderItem} from "../orderItem/OrderItem";
import {ProductImage} from "../productImage/ProductImage";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar",  nullable: false })
    name: string;

    @Column({ type: "varchar", nullable: false, unique: true })
    sku: string;

    @Column({ type: "varchar",  nullable: false })
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    cost: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('int')
    stock: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Category, category => category.products)
    category: Category;

    @OneToMany(() => OrderItem, orderItem => orderItem.product)
    orderItems!: OrderItem[];

    @OneToMany(() => ProductImage, image => image.product)
    images: ProductImage[];
}
