// src/entities/Category.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";
import {Product} from "../product/Product";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar", nullable: false})
    name: string;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Product, product => product.category)
    products: Product[];
}
