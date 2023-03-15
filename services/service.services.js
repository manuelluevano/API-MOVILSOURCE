const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");

class Service {
  constructor() {
    this.products = [];
    this.generate();
  }
  async generate() {
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }
  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async find() {
    return this.products;
  }
  async findOne(id) {
    const service = this.products.find((item) => item.id === id);
    if (!service) {
      throw boom.notFound("Product not Found");
    }
    if (service.isBlock) {
      throw boom.conflict("product is block");
    }
    return service;
  }
  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      //   throw new Error("Product not found");
      throw boom.notFound("Product not Found");
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      //   throw new Error("Product not found");
      throw boom.notFound("Product not Found");
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = Service;
