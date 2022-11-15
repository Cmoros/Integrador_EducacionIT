import { productRouter, saleRouter } from "../app.js";
// import ProductApi from "./ProductApi.js";
import ModelPage from "../models/ModelPage.js";
import { Types } from "mongoose";

export default class PageApi {
  constructor() {
    this.productApi = productRouter.controller.api;
    this.saleApi = saleRouter.controller.api;
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

  async getApprovedModal(id) {
    const sale = await this.saleApi.getSale(id);
    return {
      layout: false,
      confirm: true,
      sale,
    };
  }

  async getConfirmModal(query) {
    // const idQuery = { $or: [] };
    // for (const id in query) {
    //   idQuery.$or.push({_id: id});
    // }
    const idQuery = { _id: { $in: [] } };
    for (const id in query) {
      idQuery._id.$in.push(Types.ObjectId(id));
    }
    const products = await this.productApi.getManyProducts({ query: idQuery });
    console.log(products);
    const total = products.reduce((acc, product) => {
      const quantity = query[product.id];
      product.quantity = quantity;
      product.subtotal = quantity * product.price;
      return acc + product.subtotal;
    }, 0);
    return {
      fromProducts: true,
      layout: false,
      confirm: true,
      total,
      products,
    };
  }

  async getSalePage(id) {
    const sale = await this.saleApi.getSale(id);
    if (!sale || Object.keys(sale).length == 0) {
      return {};
    }
    return {
      fromProducts: false,
      layout: false,
      ...sale,
    };
  }
}
