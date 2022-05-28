import {
  BaseEntity,
  Column,
  Entity,
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
}