import express from "express";
import cors from "cors";

import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

import productsRoutes from "./routes/products.routes.js";

const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => res.send("Я родился!"));

  app.use("/products", productsRoutes);

  app.use(notFound);
  app.use(errorHandler);

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));
};

export default startServer;
