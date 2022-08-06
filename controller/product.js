const models = require("../models");

const product = {
  async get(req, res, next) {
    try {
      const products = await models.product.getAll();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },
  async getById(req, res, next) {
    try {
      const product = await models.product.getOneById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const item_id = req.params.id;
      const { name, description, category, quantity, price, image } = req.body.input;
      await models.product.updateProduct(name, description, category, quantity, price, image, item_id);
      res.status(200).json({ message: "Product Updated Successfully!" });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { name, description, category, quantity, price, image } = req.body.input;
      await models.product.addProduct(name, description, category, quantity, price, image);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = product;
