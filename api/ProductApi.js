// import Model from "../models/ModelMem.js";
import Model from'../models/ModelMongo.js'

export default class ProductApi {
  constructor() {
    this.model = new Model();
  }
  async getProduct(id) {
    return await this.model.getProduct(id);
  }

  async getManyProducts(skip, limit) {
    return await this.model.getManyProducts(skip, limit);
  }

  async getAllProducts() {
    return await this.model.getAllProducts();
  }

  async getSponsored(n) {
    return await this.model.getSponsoredProducts(n);
  }

  async getNewest(n) {
    return await this.model.getNewestProducts(n);
  }

  async getPopular(n) {
    return await this.model.getPopularProducts(n);
  }

  async getCartProduct(id) {
    const product = await this.getProduct(id);
    const { price, profileImageUrl, name, stock } = product;
    return { id, price, profileImageUrl, name, stock };
  }

  async getHTMLCartProduct(id) {
    const products = [await this.getCartProduct(id)];
    return { layout: false, products };
  }

  async getHTMLTableProducts(skip, limit) {
    const products = await this.getManyProducts({skip, limit});
    const pages = [];
    const len = await this.model.getProductsQuantity();
    for (let i = 0; i < len / limit; i++) {
      pages.push({ page: i + 1, current: i == skip / limit });
    }
    return { layout: false, products, pages, len };
  }

  async postProduct(product) {
    return await this.model.createProduct(product);
  }

  async updateProduct(id, product) {
    return await this.model.updateProduct(id, product);
  }

  async deleteProduct(id) {
    return await this.model.deleteProduct(id);
  }
}
