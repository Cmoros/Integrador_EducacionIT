import Model from'../model/ModelMem.js'
// import Model from'../model/ModelMongo.js'

export default class ProductApi {
  constructor() {
    this.model = new Model
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
    const product = await this.getProduct(id);
    const {price, profileImageUrl, name, stock} = product;
    return {id, price, profileImageUrl, name, stock}
  }

  async getHTMLCartProduct(id) {
    const products = [await this.getCartProduct(id)];
    return {layout: false, products}
  }

  async postProduct(product) {
    return await this.model.createProduct(product)
  }

  async updateProduct(id, product) {
    return await this.model.updateProduct(id, product)
  }

  async deleteProduct(id) {
    return await this.model.deleteProduct(id)
  }
}