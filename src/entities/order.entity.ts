import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";
import { Dvd } from "./dvd.entity";
import { OrderDvd } from "./orderDvd.entity";
import { User } from "./user.entity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  readonly id?: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @Column({ default: true })
  paid: boolean;

  @Column({ type: "float", default: 0 })
  total: number;

  @ManyToOne((type) => User, (user) => user.orders, {
    nullable: false,
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @OneToMany((type) => OrderDvd, (orderDvd) => orderDvd.order, {
    cascade: true,
    eager: true,
  })
  dvds: OrderDvd[];
}
