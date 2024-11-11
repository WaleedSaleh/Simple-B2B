import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn
} from "typeorm";
import {Product} from "../product/Product";

@Entity()
export class ProductImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imagePath: string;  // Path to the image file

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Product, product => product.images)
    @JoinColumn({ name: "productId" })
    product: Product;  // Many images can belong to one product
}
