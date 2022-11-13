import Model from "../models/ModelMongoCart.js";

export default class CartApi {
  constructor() {
    this.model = new Model();
  }

  async postCart(sale) {
    return await this.model.createSale(sale);
  }
}
