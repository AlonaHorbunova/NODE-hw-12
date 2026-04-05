import "dotenv/config";
import { connectDB, closeDB } from "./db/index.js";
import startServer from "./server.js";

// Корректное завершение работы при нажатии Ctrl+C
process.on("SIGINT", async () => {
  console.log("Завершение работы приложения (SIGINT)");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Завершение работы приложения (SIGTERM)");
  await closeDB();
  process.exit(0);
});

const bootstrap = async () => {
  try {
    await connectDB();

    startServer();
  } catch (error) {
    console.error("Ошибка при запуске приложения:", error);
    await closeDB();
    process.exit(1);
  }
};

bootstrap();
