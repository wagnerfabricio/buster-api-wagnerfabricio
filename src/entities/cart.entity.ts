import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartDvd } from "./cartdvd.entity";
import { Dvd } from "./dvd.entity";
import { User } from "./user.entity";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ default: false })
  paid: boolean;

  @Column({ type: "float", default: 0 })
  total: number;

  @OneToOne(() => User, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  user: User;

  @OneToMany((type) => CartDvd, (cartDvd) => cartDvd.cart, {
    cascade: true,
    eager: true,
  })
  dvds: CartDvd[];
}
