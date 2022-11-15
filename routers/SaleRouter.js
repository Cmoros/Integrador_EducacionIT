import { Router } from "express";
import SaleController from "../controllers/SaleController.js";

export default class SaleRouter {
  constructor(app) {
    this.controller = new SaleController();
    this.router = Router();
    this.router.get("/table/:format", this.controller.getTableSales);
    this.router.get("*", this.controller.get404.bind(this.controller));
    this.router.post("/", this.controller.postSale);
    app.use("/api/sales", this.router);
  }
}
