// src/entities/Sales.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import {Product} from "../product/Product";
import {SalesStatus} from "../../enums/saleStatus";

@Entity()
export class Sales {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar",  nullable: false })
    title: string;

    @Column({ type: "varchar",  nullable: false })
    description: string;

    @Column({ type: "enum",enum:SalesStatus, default:SalesStatus.Draft})
    status: SalesStatus;

    @Column({ type: "date",  nullable: false })
    startDate: Date;

    @Column({ type: "date",  nullable: false })
    endDate: Date;

    @Column('decimal', { precision: 5, scale: 2, nullable: false })
    discountRate: number;

    @ManyToMany(() => Product)
    @JoinTable()
    affectedProducts!: Product[];
}
