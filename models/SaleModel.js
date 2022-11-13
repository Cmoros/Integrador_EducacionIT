import mongoose from "mongoose";
import ProductModel from "./ProductModel.js";

const saleSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  client: {
    type: String,
    default: "Anonymous",
  },
});

saleSchema.pre("save", async function preSaveSaleMiddleware() {
  for (const productSale of this.products) {
    const productId = productSale.product;
    const product = await ProductModel.findById(productId).lean().exec();
    if (product.stock <= product.quantity)
      throw new Error(
        "Error tratando de comprar un producto sin suficiente stock"
      );
  }
  await Promise.all(
    this.products.map(async (product) => {
      const updated = await ProductModel.findByIdAndUpdate(
        product.product,
        {
          $inc: { stock: -1 * product.quantity },
        },
        { new: true }
      );
    })
  );
});

export default mongoose.model("sale", saleSchema);
