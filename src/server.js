import express from "express";
import cors from "cors";

const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => res.send("Я родился!"));

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));
};

export default startServer;
