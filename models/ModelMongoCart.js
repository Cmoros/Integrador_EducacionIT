import SaleModel from "./SaleModel.js";
import DBMongoDB from "./DB/MongoDB.js";

export default class ModelMongoCart {
  ////////////////////////////////////////////////////////////////////////////////
  //                              CRUD - C: Create                              //
  ////////////////////////////////////////////////////////////////////////////////`

  async createSale(sale) {
    if (!(await DBMongoDB.connectDB())) {
      return {};
    }
    try {
      const newSale = new SaleModel(sale);
      await newSale.save();
      return newSale;
    } catch (e) {
      console.error("Error al intentar de CREAR un sale:", e);
      return {};
    }
  }
}
