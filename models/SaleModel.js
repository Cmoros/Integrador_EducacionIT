import mongoose from "mongoose";
import ProductModel, { productSchemaObj } from "./ProductModel.js";

const saleSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      product: productSchemaObj,
      quantity: {
        type: Number,
        required: true,
      },
      subtotal: {
        type: Number,
      },
    },
  ],
  client: {
    type: String,
    default: "Anonymous",
  },
  total: {
    type: Number,
  },
});

saleSchema.pre("validate", async function preSaveSaleMiddleware() {
  for (const productSale of this.products) {
    const { productId, quantity } = productSale;
    const product = await ProductModel.findById(productId).lean().exec();
    if (product.stock < quantity)
      throw new Error(
        "Error tratando de comprar un producto sin suficiente stock"
      );
    productSale.product = product;
  }
  await Promise.all(
    this.products.map(async (productSale) => {
      const updated = await ProductModel.findByIdAndUpdate(
        productSale.productId,
        {
          $inc: { stock: -1 * productSale.quantity },
        },
        { new: true }
      );
    })
  );
});

export default mongoose.model("sale", saleSchema);
