import { productRouter } from "../app.js"
// import ProductApi from "./ProductApi.js";

export default class PageApi {
  constructor() {
    this.productApi = productRouter.controller.api;
    // this.productApi = new ProductApi();
  }
  
  async getHomePage(n) {
    const sponsoredCards = await this.productApi.getSponsored(n)
    const popularCards = await this.productApi.getPopular(n)
    const newCards = await this.productApi.getNewest(n)
    return {layout: false, sponsoredCards, popularCards, newCards};
  }

  async getPage(page) {
    return {layout: false}
  }

  async get404() {
    return {layout: false, title: "Página no encontrada"};
  }

  async getProduct(id) {
    const product = await this.productApi.getProduct(id);
    console.log('🚀 ~ PageApi ~ getProduct ~ product', product);
    return product;
  }
}