module.exports = app => {
  var controller = require("../Controller/product.controller.js");

  const product = "product";
  app.get("/products", exports.getAll(product));

};