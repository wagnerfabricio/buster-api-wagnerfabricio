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
  // synchronize: false,
  logging: false,
  entities:
    process.env.NODE_ENV !== "production"
      ? [path.join(__dirname, "./entities/**/*.{js,ts}")]
      : ["dist/entities/**/*.js"],
  migrations:
    process.env.NODE_ENV !== "production"
      ? [path.join(__dirname, "./migrations/**/*.{js,ts}")]
      : ["dist/migrations/**/*.js"],
});
