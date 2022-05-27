import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { compare, hash } from "bcrypt";
import userRepository from "../repositories/user.repository";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id?: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    return this.password && (this.password = await hash(this.password, 10));
  }

  @Column({ default: false })
  isAdmin: boolean;

  comparePwd = async (receivedPwd: string): Promise<any> => {
    return (
      receivedPwd &&
      (await compare(receivedPwd, await userRepository.retrievePwd(this.id)))
    );
  };
}
