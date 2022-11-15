// import Model from "../models/ModelMem.js";
import Model from "../models/ModelMongo.js";
import Api from "./Api.js";

export default class ProductApi extends Api {
  constructor() {
    super();
    this.model = new Model();
  }
  async getProduct(id) {
    return await this.model.getProduct(id);
  }

  async getManyProducts(query) {
    return await this.model.getManyProducts(query);
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

  // async getHTMLTableProducts(skip, limit) {
  //   [skip, limit] = [+skip, +limit];
  //   const len = await this.model.getProductsQuantity();
  //   const products = await this.getManyProducts({ skip, limit });

  //   return {
  //     layout: false,
  //     products,
  //     ...getPaginationHbsObj(skip, limit, len),
  //   };
  // }

  async getHTMLManyProducts(reqQuery) {
    let { skip, limit, query, order } = reqQuery;
    const orderFormatted = this.getOrderFormatted(order);
    const queryFromReq = query;
    [skip, limit] = [+skip, +limit];
    query = this.getQueryObjectFromSearch(query);
    const len = await this.model.getProductsQuantity(query);
    const products = await this.getManyProducts({
      ...reqQuery,
      skip,
      limit,
      query,
      order: orderFormatted,
    });

    return {
      query: queryFromReq,
      layout: false,
      products,
      order,
      ...this.getPaginationHbsObj(skip, limit, len),
    };
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
