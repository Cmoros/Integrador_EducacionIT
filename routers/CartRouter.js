import { Router } from "express";
import CartController from "../controllers/CartController.js";

export default class CartRouter {
  constructor(app) {
    this.controller = new CartController();
    this.router = Router();
    this.router.post("/", this.controller.postCart);
    app.use("/api/cart", this.router);
  }
}
