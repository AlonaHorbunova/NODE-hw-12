import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

let client;
let db;

export async function connectDB() {
  try {
    if (!mongoUrl) {
      throw new Error("Переменная MONGO_URL не указана в .env");
    }

    if (!dbName) {
      throw new Error("Переменная DB_NAME не указана в .env");
    }

    client = new MongoClient(mongoUrl);
    await client.connect();

    db = client.db(dbName);
    console.log("Подключение к MongoDB успешно");
  } catch (error) {
    console.error("Ошибка подключения к MongoDB:", error);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) {
    throw new Error("База данных не подключена. Вызовите сначала connectDB()");
  }
  return db;
}

export async function closeDB() {
  if (client) {
    await client.close();
    console.log("Подключение к MongoDB закрыто");
  }
}
