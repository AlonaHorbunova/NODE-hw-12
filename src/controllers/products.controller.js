import { ObjectId } from "mongodb";
import { getDB } from "../db/index.js";
import { isValidObjectId } from "../utils/isValidObjectId.js";
// Валидацию мы поправим следующим шагом, пока импортируем так
import {
  validateProductOnCreate,
  validateProductOnUpdate,
} from "../utils/validateProducts.js";

export async function createProduct(req, res, next) {
  try {
    const db = getDB();
    const collection = db.collection("products");

    const newProduct = req.body;

    const validationErrors = validateProductOnCreate(newProduct);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        error: "Ошибки валидации:",
        details: validationErrors,
      });
    }

    const productToInsert = {
      name: newProduct.name.trim(),
      price: Number(newProduct.price),
      description: newProduct.description ? newProduct.description.trim() : "",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(productToInsert);
    const createdProduct = await collection.findOne({ _id: result.insertedId });

    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
}

export async function getAllProducts(req, res, next) {
  try {
    const db = getDB();
    const products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function getProductById(req, res, next) {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Некорректный ID продукта." });
    }

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    if (!product) {
      return res.status(404).json({ error: "Продукт не найден." });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const db = getDB();
    const { id } = req.params;
    const updateData = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Некорректный ID продукта." });
    }

    const fieldToUpdate = {};
    if (updateData.name) fieldToUpdate.name = updateData.name.trim();
    if (updateData.price !== undefined)
      fieldToUpdate.price = Number(updateData.price);
    if (updateData.description !== undefined)
      fieldToUpdate.description = updateData.description.trim();

    fieldToUpdate.updatedAt = new Date();

    const result = await db
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: fieldToUpdate });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Продукт не найден." });
    }

    const updatedProduct = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Некорректный ID продукта." });
    }

    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Продукт не найден." });
    }
    res.json({ message: "Продукт успешно удален." });
  } catch (error) {
    next(error);
  }
}
