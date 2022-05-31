import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Dvd } from "./dvd.entity";

@Entity("cart_dvd")
export class CartDvd {
  @PrimaryGeneratedColumn("uuid")
  readonly id?: string;

  @Column()
  quantity: number;

  @Column({ type: "float", default: 0 })
  subtotal: number;

  @ManyToOne((type) => Cart, (cart) => cart.dvds, {
    nullable: false,
    onDelete: "CASCADE",
  })
  cart: Cart;

  @ManyToOne((type) => Dvd, (dvd) => dvd.cartDvds, {
    onDelete: "CASCADE",
    eager: true,
    nullable: false,
  })
  dvd: Dvd;
}
