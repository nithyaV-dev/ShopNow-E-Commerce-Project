import Product from "../models/Product.js";

export async function getProducts(req, res) {
  const { search = "", category = "", min = "", max = "", sort = "newest" } = req.query;

  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } }
    ];
  }
  if (category) filter.category = category;
  if (min !== "") filter.price = { ...(filter.price || {}), $gte: Number(min) };
  if (max !== "") filter.price = { ...(filter.price || {}), $lte: Number(max) };

  let sortOption = { createdAt: -1 };
  if (sort === "priceAsc") sortOption = { price: 1 };
  if (sort === "priceDesc") sortOption = { price: -1 };
  if (sort === "rating") sortOption = { rating: -1 };

  const products = await Product.find(filter).sort(sortOption);
  res.json({ products });
}

export async function getCategories(req, res) {
  const categories = await Product.distinct("category");
  res.json({ categories });
}

export async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json({ product });
}

export async function createProduct(req, res) {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
}

export async function updateProduct(req, res) {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json({ product });
}

export async function deleteProduct(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json({ message: "Product deleted." });
}
