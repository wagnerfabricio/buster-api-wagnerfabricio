import { User } from "../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request } from "express";
import { AppError } from "../errors";
import { sign } from "jsonwebtoken";
import { ICreateUser, IUserLogin } from "../interfaces";

class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  save = async (user: Partial<User>): Promise<User> =>
    await this.repo.save(user);

  create = async (validated: ICreateUser) => {
    return this.repo.create(validated);
  };

  findOne = async (payload: object): Promise<User> => {
    return await this.repo.findOneBy({ ...payload });
  };

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
