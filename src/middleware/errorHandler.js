function errorHandler(error, _req, res, _next) {
  console.error("Ошибка на сервере:", error);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res
    .status(statusCode)
    .json({ error: error.message || "Внутренняя ошибка сервера" });
}
