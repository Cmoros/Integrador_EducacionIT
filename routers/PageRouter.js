import { Router } from "express";
import PageController from "../controllers/PageController.js";

export default class PageRouter {
  constructor(app) {
    this.router = Router();
    this.controller = new PageController();
    this.router.get("/", this.controller.getDefault);
    this.router.get("/home/:n?", this.controller.getHomePage);
    this.router.get("/alta", this.controller.getAltaPage);
    this.router.get(
      "/products/:id",
      this.controller.getProductPage.bind(this.controller)
    );
    // this.router.get("/listado", this.controller.getListadoPage);
    this.router.get("/:page", this.controller.getPage);
    this.router.get("*", this.controller.get404);
    app.use("/api/page", this.router);
  }
}
