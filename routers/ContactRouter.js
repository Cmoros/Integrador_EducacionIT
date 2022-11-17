import { Router } from "express";
import ContactController from "../controllers/ContactController.js";
import { upload } from "../multer.js";

export default class ContacttRouter {
  constructor(app) {
    this.router = Router();
    this.controller = new ContactController();
    this.router.post(
      "/:format?",
      upload.fields([]),
      this.controller.postContact
    );
    app.use("/api/contact", this.router);
  }
}
