import app from "./app";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";

dotenv.config();

// async () => {
//   await
AppDataSource.initialize()
  .then(() => {
    console.log("\n==========================================================");
    console.log("💾: Database connected");
  })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`🚀: Server started at http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error(err));
// };
