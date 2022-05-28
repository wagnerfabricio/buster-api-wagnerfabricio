import { User } from "../entities";
import { AppError } from "../errors";
import { userRepository } from "../repositories";
import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import { Request } from "express";

dotenv.config();

class UserService {
  register = async ({ validated }: Request) => {
    const newUser: Partial<User> = await userRepository.create(
      validated as User
    );
    await userRepository.save(newUser);
    const savedUser: User = await userRepository.findOne({ id: newUser.id });

    return savedUser;
  };

  login = async ({ validated }: Request): Promise<string | null> => {
    const user: User = await userRepository.findOne({
      email: (validated as User).email,
    });

    if (!user) throw new AppError("Invalid credentials", 422);

    if (!(await user.comparePwd((validated as User).password)))
      throw new AppError("Invalid credentials", 422);

    const token: string = sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return token;
  };
}

export default new UserService();
