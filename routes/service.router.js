const express = require("express");
const router = express.Router();
const Services = require("./../services/service.services");
const service = new Services();
const validatorHandler = require("../middlewares/validator.handler");
const {
  createServiceSchema,
  updateServiceSchema,
  getServiceSchema,
} = require("../schemas/product.schema");

router.get("/", async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get(
  "/:id",
  validatorHandler(getServiceSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createServiceSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const newproduct = await service.create(body);
    res.json({
      message: "created",
      data: newproduct,
    });
  }
);

router.patch(
  "/:id",
  validatorHandler(getServiceSchema, "params"),
  validatorHandler(updateServiceSchema, "body"),

  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const producto = await service.update(id, body);
      res.json({
        message: "Update",
        data: producto,
        id,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const productoDelete = await service.delete(id);

  res.json({
    message: "Delete",
    productoDelete,
  });
});

module.exports = router;
