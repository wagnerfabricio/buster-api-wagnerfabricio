import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Dvd } from "./dvd.entity";

@Entity("stock")
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  readonly id?: string;

  @Column()
  quantity: number;

  @Column({ type: "float" })
  price: number;

  @OneToOne(() => Dvd)
  dvd: Dvd;
}
