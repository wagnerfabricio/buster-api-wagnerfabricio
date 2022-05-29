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
    nullable: false,
    eager: true,
    cascade: true, //habilita cadastrar o stock já no cadastro do dvd...
    onDelete: "CASCADE", //habilida deletar o dvd ao deletar o stock...
  })
  @JoinColumn()
  stock: Stock;
}
