import { Router } from "express";
import MainController from "../controllers/MainController.js";

export default class MainRouter {
  constructor(app) {
    console.log('MainRouter', this instanceof MainRouter)
    this.router = Router();
    this.controller = new MainController();
    this.router.get("/", this.controller.getMain);
    app.use("", this.router);
  }
}
