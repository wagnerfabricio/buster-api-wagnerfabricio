import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
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

  @ManyToMany((type) => Dvd, { eager: true })
  @JoinTable()
  dvds: Dvd[];
}
