import { productRouter } from "../app.js";
// import ProductApi from "./ProductApi.js";
import ModelPage from "../models/ModelPage.js";

export default class PageApi {
  constructor() {
    this.productApi = productRouter.controller.api;
    this.model = new ModelPage();
    // this.productApi = new ProductApi();
  }

  async getHomePage(n) {
    const sponsoredCards = await this.productApi.getSponsored(n);
    const popularCards = await this.productApi.getPopular(n);
    const newCards = await this.productApi.getNewest(n);
    return { layout: false, sponsoredCards, popularCards, newCards };
  }

  async getAltaPage() {
    const products = await this.productApi.getAllProducts();
    return { layout: false, products };
  }

  async getPage(page) {
    return this.model.findPage(page) && { layout: false };
  }

  async get404() {
    return { layout: false, title: "Página no encontrada" };
  }

  async getProduct(id) {
    const product = await this.productApi.getProduct(id);
    return product;
  }

  async getRemoveModal(id) {
    const product = await this.productApi.getProduct(id);
    return {
      layout: false,
      confirm: true,
      product,
      text: "¿Seguro de eliminar el siguiente producto?",
    };
  }
}
