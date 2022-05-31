import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";
import { CartDvd } from "./cartdvd.entity";
import { OrderDvd } from "./orderDvd.entity";
import { Stock } from "./stock.entity";

@Entity("dvd")
export class Dvd {
  @PrimaryGeneratedColumn("uuid")
  readonly id?: string;

  @Column({ unique: true })
  name: string;

  @Column()
  duration: string;

  @OneToOne(() => Stock, (stock) => stock.dvd, {
    eager: true,
    nullable: false,
    cascade: true,
  })
  stock: Stock;

  @OneToMany((type) => CartDvd, (cartDvd) => cartDvd.dvd)
  cartDvds: CartDvd[];

  @OneToMany((type) => OrderDvd, (orderDvd) => orderDvd.dvd)
  dvds: OrderDvd[];
}
