import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Stock } from "./stock.entity";

@Entity("dvd")
export class Dvd {
  @PrimaryGeneratedColumn("uuid")
  readonly id?: string;

  @Column({ unique: true })
  name: string;

  @Column()
  duration: string;

  @OneToOne(() => Stock, {
    eager: true,
  })
  @JoinColumn()
  stock: Stock;
}
