const fs = require("fs");
const path = require("path");

const cartsPath = path.join(__dirname, "../data/carts.json");

const setCarts = () => {
  if (!fs.existsSync(cartsPath)) {
    fs.writeFileSync(cartsPath, JSON.stringify([]));
  }
  const data = fs.readFileSync(cartsPath, "utf8");
  return JSON.parse(data);
};

const saveCarts = (carts) => {
  const data = JSON.stringify(carts, null, 2);
  fs.writeFileSync(cartsPath, data);
};

module.exports = {
  setCarts,
  saveCarts,
};
