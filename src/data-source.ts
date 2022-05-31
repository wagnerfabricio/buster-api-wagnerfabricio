import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  synchronize: true,
  logging: true,
  entities:
    process.env.NODE_ENV === "production"
      ? ["dist/entities/**/*.js"]
      : [path.join(__dirname, "./entities/**/*.{js,ts}")],
  migrations:
    process.env.NODE_ENV === "production"
      ? ["dist/migrations/**/*.js"]
      : [path.join(__dirname, "./migrations/**/*.{js,ts}")],
});
