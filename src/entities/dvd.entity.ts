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
    cascade: true, //habilita cadastrar o stock já no cadastro do dvd...
    onDelete: "CASCADE", //habilida deletar o dvd ao deletar o stock...
  })
  stock: Stock;
}
