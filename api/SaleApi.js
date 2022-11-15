import Model from "../models/ModelMongoSale.js";
import Api from "./Api.js";

export default class SaleApi extends Api {
  constructor() {
    super();
    this.model = new Model();
  }

  async getSale(id) {
    return await this.model.getSale(id);
  }

  async getManySales(query) {
    return await this.model.getManySales(query);
  }

  async getHTMLManySales(reqQuery) {
    let { skip, limit, query, order } = reqQuery;
    const orderFormatted = this.getOrderFormatted(order);
    const queryFromReq = query;
    [skip, limit] = [+skip, +limit];
    query = this.getQueryObjectFromSearch(query);
    const len = await this.model.getSalesQuantity(query);
    const sales = await this.getManySales({
      ...reqQuery,
      skip,
      limit,
      query,
      order: orderFormatted,
    });

    return {
      query: queryFromReq,
      layout: false,
      sales,
      order,
      ...this.getPaginationHbsObj(skip, limit, len),
    };
  }

  async postSale(sale) {
    return await this.model.createSale(sale);
  }
}
