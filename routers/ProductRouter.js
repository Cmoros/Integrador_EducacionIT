import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

export default class ProductRouter {
  constructor(app) {
    this.router = Router();
    this.controller = new ProductController();
    this.router.get("/", this.controller.getAllProducts);
    this.router.get("/:id", this.controller.getProduct);
    this.router.get("/:id/cart/:format?", this.controller.getCartProduct);
    // this.router.get("/sponsored/:n?", this.controller.getSponsored)
    // this.router.get("/popular/:n?", this.controller.getPopular)
    // this.router.get("/newest/:n?", this.controller.getNewest)
    this.router.get("*", this.controller.get404.bind(this.controller));

    this.router.post("/", this.controller.postProduct.bind(this.controller));
    this.router.post("*", this.controller.get404.bind(this.controller));
    this.router.put("/:id", this.controller.putProduct.bind(this.controller));
    this.router.put("*", this.controller.get404.bind(this.controller));
    this.router.delete(
      "/:id",
      this.controller.deleteProduct.bind(this.controller)
    );
    this.router.delete("*", this.controller.get404.bind(this.controller));
    app.use("/api/products", this.router);
  }
}
