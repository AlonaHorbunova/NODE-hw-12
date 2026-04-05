import { ObjectId } from "mongodb";

export function isValidObjectId(id) {
  return ObjectId.isValid(id);
}
