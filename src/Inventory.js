import Product from "./Product.js";

export default class Inventory {
  constructor(productArray) {
    this.products = {};
    this.createFromArray(productArray);
  }
  async getAllProducts() {
    const productsArray = [];
    for (const id in this.products) {
      productsArray.push(this.products[id]);
    }
    return productsArray;
  }

  async getProduct(id) {
    return this.products[id] || {};
  }

  async getCartProduct(id) {
    return await this.products[id].getInfoCart();
  }


  async createProduct(product) {
    const newProduct = new Product(product);
    this.products[newProduct.id] = newProduct;
    return this.products[newProduct.id];
  }

  async createFromArray(products, cb) {
    products.forEach((product, index, array) => {
      this.products[product.id] = product;
      if (typeof cb == 'function') {
        cb(product,index,array);
      }
    })
  }
  
  async updateProduct(id, product) {
    this.products[id] &&= product;
    return this.products[id] || {};
  }

  async updateAllProducts(cb) {
    for (const id in this.products) {
      await cb(id);
    }
    return await this.getAllProducts();
  }

  async deleteProduct(id) {
    const deletedProduct = this.products[id];
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