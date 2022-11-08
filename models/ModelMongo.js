import ProductModel from "./ProductModel.js";
import DBMongoDB from "./DB/MongoDB.js";

export default class ModelMongo {
  ////////////////////////////////////////////////////////////////////////////////
  //                              CRUD - C: Create                              //
  ////////////////////////////////////////////////////////////////////////////////`

  async createProduct(product) {
    if (!(await DBMongoDB.connectDB())) {
      return {};
    }
    try {
      const newProduct = new ProductModel(product);
      await newProduct.save();
      return DBMongoDB.getObjectWithId(newProduct.toObject());
    } catch (error) {
      console.error("Error al intentar de CREAR un product:", error);
      return {};
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  //                               CRUD - R: Read                               //
  ////////////////////////////////////////////////////////////////////////////////

  async getAllProducts() {
    if (!(await DBMongoDB.connectDB())) {
      return [];
    }
    try {
      const products = await ProductModel.find({}).lean().exec();
      return DBMongoDB.getObjectWithId(products);
    } catch (error) {
      console.error("Error al intentar de LEER un product:", error);
    }
    return [];
  }

  async getProduct(id) {
    if (!(await DBMongoDB.connectDB())) {
      return {};
    }
    try {
      const product = await ProductModel.findById(id).lean().exec();
      if (product) return DBMongoDB.getObjectWithId(product);
    } catch (error) {
      console.error("Error al intentar de LEER un product:", error);
    }
    return {};
  }

  async getProductsQuantity(query) {
    if (!(await DBMongoDB.connectDB())) {
      return -1;
    }
    try {
      const quantity = await ProductModel.countDocuments(query || {});
      return quantity;
    } catch (error) {
      console.error("Error al intentar de LEER un product:", error);
    }
    return -1;
  }

  async getManyProducts(params) {
    if (!(await DBMongoDB.connectDB())) {
      return [];
    }
    const {query, order, skip, limit} = params;
    try {
      const products = await ProductModel.find(query || {})
        .sort(order || {})
        .skip(skip || 0)
        .limit(limit || Infinity)
        .lean()
        .exec();
      return DBMongoDB.getObjectWithId(products);
    } catch (error) {
      console.error("Error al intentar de LEER un product:", error);
    }
    return [];
  }

  async getSponsoredProducts(quantity = 4) {
    if (!(await DBMongoDB.connectDB())) {
      return [];
    }
    try {
      const products = await ProductModel.find({ sponsored: true })
        .limit(quantity)
        .lean()
        .exec();
      return DBMongoDB.getObjectWithId(products);
    } catch (error) {
      console.error(
        `Error al intentar LEER productos patrocinados: `,
        error.message
      );
    }
    return [];
  }

  async getPopularProducts(quantity = 4) {
    if (!(await DBMongoDB.connectDB())) {
      return [];
    }
    try {
      const products = await ProductModel.find({ visits: { $gt: 0 } })
        .sort({ visits: -1 })
        .limit(quantity)
        .lean()
        .exec();
      return DBMongoDB.getObjectWithId(products);
    } catch (error) {
      console.error(
        `Error al intentar LEER productos patrocinados: `,
        error.message
      );
    }
    return [];
  }

  async getNewestProducts(quantity = 4) {
    if (!(await DBMongoDB.connectDB())) {
      return [];
    }
    try {
      const products = await ProductModel.find({})
        .sort({ date: -1 })
        .limit(quantity)
        .lean()
        .exec();
      return DBMongoDB.getObjectWithId(products);
    } catch (error) {
      console.error(
        `Error al intentar LEER productos patrocinados: `,
        error.message
      );
    }
    return [];
  }

  ////////////////////////////////////////////////////////////////////////////////
  //                              CRUD - U: Update                              //
  ////////////////////////////////////////////////////////////////////////////////`

  async updateProduct(id, product) {
    if (!(await DBMongoDB.connectDB())) {
      return [];
    }
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        { $set: product },
        // { returnDocument: "after" }
        { new: true }
      )
        .lean()
        .exec();
      return DBMongoDB.getObjectWithId(updatedProduct);
    } catch (error) {
      console.error("Error al intentar de ACTUALIZAR un product:", error);
    }
    return {};
  }

  ////////////////////////////////////////////////////////////////////////////////
  //                              CRUD - D: Delete                              //
  ////////////////////////////////////////////////////////////////////////////////
  async deleteProduct(id) {
    if (!(await DBMongoDB.connectDB())) {
      return [];
    }
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(id)
        .lean()
        .exec();
      return DBMongoDB.getObjectWithId(deletedProduct);
    } catch (error) {
      console.error(
        `Error al intentar eliminar el producto #:${id}`,
        error.message
      );
      return {};
    }
  }
}
