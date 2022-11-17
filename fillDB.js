import ProductModel from "./models/ProductModel.js";
// import DBMongoDB from "./models/DB/MongoDB.js";
import {} from "./models/DB/MongoDB.js";
import products from "./db/products.js";

// await DBMongoDB.connectDB();

const algo = await ProductModel.create(products);

console.info("Productos agregados satisfactoriamente");
