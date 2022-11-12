import Product from "../src/Product.js";
import products from "../db/products.js";

export default class ModelMem {
  constructor() {
    this.products = products.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});
  }

  async getAllProducts() {
    const productsArray = [];
    for (const id in this.products) {
      productsArray.push(this.products[id]);
    }
    return productsArray;
  }

  async getProductsQuantity() {
    return Object.keys(this.products).length;
  }

  async getManyProducts(skip, limit) {
    const products = await this.getAllProducts();
    return products.slice(skip, +skip + +limit);
  }

  async getProduct(id) {
    return this.products[id] || {};
  }

  async createProduct(product) {
    const newProduct = new Product(product);
    this.products[newProduct.id] = newProduct;
    return this.products[newProduct.id];
  }

  async updateProduct(id, product) {
    // FIXME
    this.products[id] = { ...this.products[id], ...product };
    return this.products[id] || {};
  }

  async updateAllProducts(cb) {
    for (const id in this.products) {
      await cb(id);
    }
    return await this.getAllProducts();
  }

  async deleteProduct(id) {
    const deletedProduct = this.products[id] || {};
    delete this.products[id];
    return deletedProduct;
  }

  async getSponsoredProducts(quantity = 4) {
    const sponsored = [];
    for (const id in this.products) {
      if (this.products[id].sponsored) {
        sponsored.push(this.products[id]);
      }
      if (quantity && sponsored.length == quantity) break;
    }
    return sponsored;
  }

  async getPopularProducts(quantity = 4) {
    const products = await this.getAllProducts();
    products.sort((a, b) => b.visits - a.visits);
    return products.slice(0, quantity || products.length);
  }

  async getNewestProducts(quantity = 4) {
    const products = await this.getAllProducts();
    products.sort((a, b) => b.date - a.date);
    return products.slice(0, quantity || products.length);
  }
}
