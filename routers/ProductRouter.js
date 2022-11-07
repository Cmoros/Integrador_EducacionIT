import { Router } from "express";
import ProductController from "../controllers/ProductController.js";
import { upload } from "../multer.js";
import config from "../config.js";

export default class ProductRouter {
  constructor(app) {
    this.router = Router();
    this.controller = new ProductController();
    this.router.get("/", this.controller.getManyProducts);
    this.router.get("/:id", this.controller.getProduct);
    this.router.get("/:id/cart/:format?", this.controller.getCartProduct);
    this.router.get("/table/:format?", this.controller.getTableProducts);
    // this.router.get("/sponsored/:n?", this.controller.getSponsored)
    // this.router.get("/popular/:n?", this.controller.getPopular)
    // this.router.get("/newest/:n?", this.controller.getNewest)
    this.router.get("*", this.controller.get404.bind(this.controller));

    this.router.post(
      "/",
      // handleProfileImage,
      // handleImages,
      handleImagesFields,
      this.controller.postProduct.bind(this.controller)
    );
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

async function handleProfileImage(req, res, next) {
  try {
    await upload.single("profileImageUrl")(req, res, next);
  } catch (e) {
    console.log("Error cargando la imagen 'profileImageUrl': ", e);
    next();
  }
}

async function handleImages(req, res, next) {
  try {
    if (req.body.imagesUrlsMissing) {
      delete req.body.imagesUrlsMissing;
      next();
      return;
    }
    upload.single("imagesUrls")(req, res, next);
  } catch (e) {
    console.log("Error cargando la imagen 'imagesUrls': ", e);
    next();
  }
}

const imagesFields = [
  { name: "profileImageUrl", maxCount: 1 },
  { name: "imagesUrls", maxCount: 5 }
]

async function handleImagesFields(req, res, next) {
  const fields = getCurrentFields(imagesFields)
  upload.fields(fields)(req, res, next);
}

function getCurrentFields(req, filesArr) {
  return filesArr.reduce((acc, file) => {
    if (!req.body[file.name+"Missing"]) {
      acc.push(file)
    }
    return acc;
  }, [])
}