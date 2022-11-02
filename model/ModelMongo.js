import mongoose from "mongoose";
import config from "../config.js";

let connected = false;

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_CONNECTION_SRT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
      serverSelectionTimeoutMS: config.MONGODB_TIMEOUT,
    });
    console.log("Conexión con MongoDB exitosa.");
    connected = true;
  } catch (error) {
    console.error("Error al intentar establecer la conexión con MongoDB");
  }
};

const productSquema = mongoose.Schema({
  // id : Product.productQuantity++,
  name: String,
  price: Number,
  stock: Number,
  brand: String,
  category: String,
  minAge: String,
  maxAge: String,
  typeAge: String,
  profileImageUrl: String,
  imagesUrls: Array,
  shipping: Boolean,
  shortDescription: String,
  longDescription: String,
  visits: Number,
  date: Date,
  sponsored: Boolean,
});

const ProductsModel = mongoose.model("products", productSquema);

export default class ModelMongo {
  ////////////////////////////////////////////////////////////////////////////////
  //                              CRUD - C: Create                              //
  ////////////////////////////////////////////////////////////////////////////////`

  async createProduct(product) {
    if (!connected) return {};
    try {
      const newProduct = new ProductsModel(product);
      const save = await newProduct.save();
      return newProduct;
    } catch (error) {
      console.error("Error al intentar de CREAR un product:", error);
    }
    return {};
  }

  ////////////////////////////////////////////////////////////////////////////////
  //                               CRUD - R: Read                               //
  ////////////////////////////////////////////////////////////////////////////////

  async getAllProducts() {
    if (!connected) return [];
    try {
      const product = (await ProductsModel.find({})) || [];
      return product;
    } catch (error) {
      console.error("Error al intentar de LEER un product:", error);
    }
    return [];
  }

  async getProduct(id) {
    if (!connected) return {};
    try {
      const product = (await ProductsModel.findById(id)) || {};
      return product;
    } catch (error) {
      console.error("Error al intentar de LEER un product:", error);
    }
    return {};
  }

  async getSponsoredProducts(quantity = 4) {
    if (!connected) return [];
    try {
      return ProductsModel.find({ sponsored: true });
      // TODO: Encontrar los productos por patrocinio (true)
    } catch (error) {
      console.error(
        `Error al intentar LEER productos patrocinados: `,
        error.message
      );
    }
    return [];
  }

  async getPopularProducts(quantity = 4) {
    if (!connected) return [];
    try {
      return ProductsModel.find({}).sort({ visited: 1 }).limit(quantity);
      // TODO: Encontrar los productos por mayor cantidad de visitas
    } catch (error) {
      console.error(
        `Error al intentar LEER productos patrocinados: `,
        error.message
      );
    }
    return [];
  }

  async getNewestProducts(quantity = 4) {
    if (!connected) return [];
    try {
      return ProductsModel.find({}).sort({ Date: 1 }).limit(quantity);
      // TODO: Encontrar los productos por date mas reciente
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
    if (!connected) return {};
    try {
      // const oldProduct = await ProductsModel.findByIdAndUpdate(id, {$set: product})
      const updatedProduct = await ProductsModel.findByIdAndUpdate(
        id,
        { $set: product },
        { returnDocument: "after" }
      );
      return updatedProduct;
    } catch (error) {
      console.error("Error al intentar de ACTUALIZAR un product:", error);
    }
    return {};
  }

  ////////////////////////////////////////////////////////////////////////////////
  //                              CRUD - D: Delete                              //
  ////////////////////////////////////////////////////////////////////////////////
  async deleteProduct(id) {
    if (!connected) return {};
    try {
      // await ProductsModel.deleteOne({_id: id});
      const deletedProduct = (await ProductsModel.findByIdAndDelete(id)) || {};
      return deletedProduct;
    } catch (error) {
      console.error(
        `Error al intentar eliminar el producto #:${id}`,
        error.message
      );
      return {};
    }
  }
}
