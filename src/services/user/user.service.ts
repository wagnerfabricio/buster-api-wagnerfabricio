import { User } from "../../entities";
import { AppError } from "../../errors";
import { ICreateUser, IUserLogin } from "../../interfaces";
import { userRepository } from "../../repositories";
import { serializedCreateUserSchema } from "../../schemas";
import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import { Request } from "express";

dotenv.config();

class UserService {
  register = async ({ validated }: Request) => {
    const newUser: Partial<User> = await userRepository.create({
      ...validated,
    });
    await userRepository.save(newUser);
    const savedUser: User = await userRepository.findOne({ id: newUser.id });

    return savedUser;
  };

  login = async ({validated}: Request): Promise<string | null> => {
    const user: User = await userRepository.findOne({
      email: validated.email,
    });

    if (!user) throw new AppError("Invalid credentials", 422);

    if (!(await user.comparePwd(validated.password)))
      throw new AppError("Invalid credentials", 422);

    const token: string = sign({ ...user }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return token;
  };
}

export default new UserService();
