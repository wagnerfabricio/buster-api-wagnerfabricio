import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Dvd } from "./dvd.entity";
import { Order } from "./order.entity";

@Entity("order_dvd")
export class OrderDvd {
  @PrimaryGeneratedColumn("uuid")
  readonly id?: string;

  @Column()
  quantity: number;

  @Column({ type: "float", default: 0 })
  subtotal: number;

  @ManyToOne((type) => Order, (order) => order.dvds, {
    nullable: false,
    onDelete: "CASCADE",
  })
  order: Order;

  @ManyToOne((type) => Dvd, (dvd) => dvd.dvds, {
    onDelete: "CASCADE",
    eager: true,
    nullable: false,
  })
  dvd: Dvd;
}
