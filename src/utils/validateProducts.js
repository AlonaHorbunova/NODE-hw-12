export function validateProductOnCreate(product) {
  const errors = [];

  // Валидация name (обязательное поле)
  if (
    !product.name ||
    typeof product.name !== "string" ||
    !product.name.trim()
  ) {
    errors.push(
      "Поле 'name' (название продукта) должно быть непустой строкой.",
    );
  }

  if (
    product.price === undefined ||
    typeof Number(product.price) !== "number" ||
    isNaN(Number(product.price))
  ) {
    errors.push("Поле 'price' (цена) обязательно и должно быть числом.");
  } else if (Number(product.price) <= 0) {
    errors.push("Цена должна быть больше 0.");
  }

  if (
    product.description !== undefined &&
    typeof product.description !== "string"
  ) {
    errors.push("Поле 'description' должно быть строкой.");
  }

  return errors;
}

export function validateProductOnUpdate(product) {
  const errors = [];

  if (product.name !== undefined) {
    if (typeof product.name !== "string" || !product.name.trim()) {
      errors.push("Поле 'name' должно быть непустой строкой.");
    }
  }

  if (product.price !== undefined) {
    if (isNaN(Number(product.price)) || Number(product.price) <= 0) {
      errors.push("Цена должна быть числом больше 0.");
    }
  }

  if (product.description !== undefined) {
    if (typeof product.description !== "string") {
      errors.push("Поле 'description' должно быть строкой.");
    }
  }

  return errors;
}
