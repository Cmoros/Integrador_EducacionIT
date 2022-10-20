// import {modelMem} from'../model/inventory-mem.js'
import modelMem from'../model/inventory-mem.js'
// import model from'../model/inventory-fs.js'
// import model from'../model/inventory-mongodb.js'

export default class ProductApi {
  constructor(opt = "mem") {
    if (opt == "mem") {
      this.model = modelMem;
    }
    this.model = modelMem;
  }
  async getProduct(id) {
    return await this.model.getProduct(id);
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
    return await this.model.getCartProduct(id)
  }
  async getHTMLCartProduct(id) {
    const products = [await this.getCartProduct(id)];
    return {layout: false, products}
  }

  async postProduct(product) {
    return await this.model.createProduct(product)
  }

  // async postManyProducts() {

  // }

  async updateProduct(id, product) {
    return await model.updateProduct(id, product)
  }

  async updateAllProducts(cb) {

    return await model.updateAllProducts(cb)
  }

  async deleteProduct(id) {
    return await model.deleteProduct(id)
  }

  // async deleteManyProducts() {

  // }
}