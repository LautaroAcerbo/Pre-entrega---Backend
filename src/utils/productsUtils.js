const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../data/products.json");

const setProducts = () => {
  if (!fs.existsSync(productsPath)) {
    fs.writeFileSync(productsPath, JSON.stringify([]));
  }
  const data = fs.readFileSync(productsPath, "utf8");
  return JSON.parse(data);
};

const saveProducts = (products) => {
  const data = JSON.stringify(products, null, 2);
  fs.writeFileSync(productsPath, data);
};

module.exports = {
  setProducts,
  saveProducts,
};
