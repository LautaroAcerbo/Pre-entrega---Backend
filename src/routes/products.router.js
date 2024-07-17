const express = require("express");
const router = express.Router();
const { setProducts, saveProducts } = require("../utils/productsUtils.js");

setProducts();
let products = setProducts();
//get de productos

router.get("/", (req, res) => {
  const limit = req.query.limit;

  if (limit) {
    res.status(200).json(products.slice(0, limit));
  } else {
    res.status(200).json(products);
  }
});

// get Id

router.get("/:pid", (req, res) => {
  const productID = parseInt(req.params.pid);
  const product = products.find((i) => i.id === productID);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400).json("producto no encontrado");
  }
});

//post

router.post("/", (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
  let maxId = products.reduce(
    (max, product) => (product.id > max ? product.id : max),
    0
  );
  const priceNumber = Number(price);
  const stockNumber = Number(stock);
  //Validacion de entrada
  if (
    typeof title === "string" &&
    title &&
    typeof description === "string" &&
    description &&
    typeof code === "string" &&
    code &&
    !isNaN(priceNumber) &&
    priceNumber > 0 &&
    !isNaN(stockNumber) &&
    stockNumber > 0 &&
    typeof category === "string" &&
    category
  ) {
    const newProduct = {
      id: maxId + 1,
      title: title,
      description: description,
      code: code,
      price: price,
      status: true,
      stock: stock,
      category: category,
    };
    products.push(newProduct);
    saveProducts(products);

    res.status(200).json(newProduct);
  } else {
    res.status(400).json({ msg: "Campos invalidos o incompletos" });
  }
});

//delete

router.delete("/:pid", (req, res) => {
  const productID = parseInt(req.params.pid);
  products = products.filter((i) => i.id !== productID);
  res.status(200).json({ msg: `el ID:${productID} fue eliminado` });
  saveProducts(products);
});

//put

router.put("/:pid", (req, res) => {
  const productID = parseInt(req.params.pid);
  const product = products.find((i) => i.id === productID);

  // const priceNumber = Number(price);
  // const stockNumber = Number(stock);

  if (product) {
    const { title, description, code, price, stock, category } = req.body;

    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.code = code ?? product.code;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;
    product.category = category ?? product.category;

    saveProducts(product);
    res.status(200).json({ msg: "Producto actualizado correctamente" });
  } else {
    res.status(400).json({ message: "El prodcuto no se puede actualizar" });
  }
});

module.exports = router;
