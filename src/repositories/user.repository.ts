import { User } from "../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request } from "express";
import { AppError } from "../errors";
import { sign } from "jsonwebtoken";
import { ICreateUser } from "../interfaces";

class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  register = async ({ validated }: Request) => {
    const newUser = this.repo.create({ ...validated });
    await this.repo.save(newUser);
    const savedUser = await this.repo.findOneBy({ id: newUser.id });
    return savedUser;
  };

  // login = async ({ validated }: Request): Promise<string | null> => {
  //   const user: User = await this.repo.findOneBy({
  //     email: validated.email,
  //   });

  //   if (!user) throw new AppError("Invalid credentials", 422);

  //   if (!(await user.comparePwd(validated.password)))
  //     throw new AppError("Invalid credentials", 422);

  //   const token: string = sign({ ...user }, process.env.SECRET_KEY, {
  //     expiresIn: process.env.EXPIRES_IN,
  //   });

  //   return token;
  // };

  retrievePwd = async (id: string): Promise<string> => {
    const requestUser = await this.repo
      .createQueryBuilder("user")
      .select("user.id")
      .addSelect("user.password")
      .where("user.id = :id", { id: id })
      .getOne();

    return requestUser!.password;
  };
}

export default new UserRepository();
