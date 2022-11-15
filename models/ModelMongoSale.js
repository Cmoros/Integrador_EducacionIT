import SaleModel from "./SaleModel.js";
import DBMongoDB from "./DB/MongoDB.js";

export default class ModelMongoCart {
  ////////////////////////////////////////////////////////////////////////////////
  //                              CRUD - R: Read                             //
  ////////////////////////////////////////////////////////////////////////////////`

  async getSale(id) {
    if (!(await DBMongoDB.connectDB())) {
      return {};
    }
    try {
      const sale = await SaleModel.findById(id).lean().exec();
      if (sale) return DBMongoDB.getObjectWithId(sale);
    } catch (error) {
      console.error("Error al intentar de LEER una venta:", error);
    }
    return {};
  }

  async getManySales(params) {
    if (!(await DBMongoDB.connectDB())) {
      return [];
    }
    const { query, order, skip, limit } = params;
    try {
      const sales = await SaleModel.find(query || {})
        .sort(order || {})
        .skip(skip || 0)
        .limit(limit || Infinity)
        .lean()
        .exec();
      return DBMongoDB.getObjectWithId(sales);
    } catch (error) {
      console.error("Error al intentar de LEER varias ventas:", error);
    }
    return [];
  }

  async getSalesQuantity(query) {
    if (!(await DBMongoDB.connectDB())) {
      return -1;
    }
    try {
      const quantity = await SaleModel.countDocuments(query || {});
      return quantity;
    } catch (error) {
      console.error("Error al intentar de LEER cantidad de ventas:", error);
    }
    return -1;
  }

  ////////////////////////////////////////////////////////////////////////////////
  //                              CRUD - C: Create                              //
  ////////////////////////////////////////////////////////////////////////////////`

  async createSale(sale) {
    if (!(await DBMongoDB.connectDB())) {
      return {};
    }
    try {
      console.log(sale);
      let newSale = new SaleModel(sale);
      // console.log("before populate", newSale);
      // newSale = await newSale.populate({
      //   path: "products.product",
      // })
      // console.log("after populate", newSale);
      await newSale.save();
      return DBMongoDB.getObjectWithId(newSale.toObject());
    } catch (e) {
      console.error("Error al intentar de CREAR un sale:", e);
      return {};
    }
  }
}
