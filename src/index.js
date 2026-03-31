import "dotenv/config";
import { connectDB, closeDB } from "./db/index.js";
import startServer from "./server.js";

process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closeDB();
  process.exit(0);
});

const bootstrap = async () => {
  try {
    await connectDB();
    startServer();
  } catch (error) {
    console.error("Ошибка при запуске приложения:", error);
    process.exit(1);
  }
};

bootstrap();
