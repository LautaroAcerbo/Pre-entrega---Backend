const express = require("express");
const router = express.Router();
const { saveCarts, setCarts } = require("../utils/cartsUtils.js");

setCarts();
let carts = setCarts();

//Get
router.get("/", (req, res) => {
  const limit = req.query.limit;

  if (limit) {
    res.status(200).json(carts.slice(0, limit));
  } else {
    res.status(200).json(carts);
  }
});

//Get ID
router.get("/:cid", (req, res) => {
  const cartID = parseInt(req.params.pid);
  const cart = carts.find((i) => i.id === cartID);
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(400).json("no se encontro el carrito");
  }
});

//Post
router.post("/", (req, res) => {
  const { products } = req.body;
  let maxId = 0;
  if (carts.length > 0) {
    maxId = carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
  }
  const newCart = {
    id: maxId + 1,
    products: products || [],
  };

  carts.push(newCart);
  saveCarts(carts);
  res.status(200).json(newCart);
});

//Delete
router.delete("/:cid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  carts = carts.filter((cart) => cart.id !== cartId);
  saveCarts(carts);
  res.status(200).json({
    message: `Carrito con id: ${cartId}, eliminado`,
  });
});

router.delete("/:cid/product/:pid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const cart = carts.find((cart) => cart.id === cartId);
  const prod = cart.products.find((product) => product.id === productId);

  //validacion de carrito
  if (!cart) {
    return res
      .status(404)
      .json({ message: `No se encuentra el carrito con (ID: ${cartId})` });
  } else if (!prod) {
    return res.status(404).json({
      message: `El producto con (ID: ${productId})no se encuentra. El carrito con(ID: ${cartId}) no se encuentra`,
    });
  }

  let indexCart = carts.findIndex((i) => i.id === cartId);

  let filteredCart = cart.products.filter(
    (product) => product.id !== productId
  );

  carts[indexCart].products = filteredCart;
  saveCarts(carts);

  res.status(200).json({
    message: `Producto (ID:${productId}) eliminado del carrito (ID: ${cartId}) correctamente!`,
  });
});
module.exports = router;
