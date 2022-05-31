import app from "./app";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log("==========================================================");
    console.log("Database connected");
  })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log("Data Source initialized");
      console.log("==========================================================");
      return;
    });
  })
  .catch((err) => console.error(err));
