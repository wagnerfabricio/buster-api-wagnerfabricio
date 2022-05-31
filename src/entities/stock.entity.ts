import {
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

  @OneToOne(() => Dvd, (dvd) => dvd.stock, {
    onDelete: "CASCADE", //habilida deletar o stock ao deletar o dvd...
  })
  @JoinColumn()
  dvd: Dvd;
}
