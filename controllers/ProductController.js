import ProductApi from "../api/ProductApi.js";
import config from "../config.js";

export default class ProductController {
  constructor() {
    this.api = new ProductApi();
  }

  getProduct = async (req, res) => {
    const { id } = req.params;
    res.status(200).json(await this.api.getProduct(id));
  };

  getManyProducts = async (req, res) => {
    const { skip, limit } = req.query;
    if (skip != null && limit != null) {
      res.status(200).json(await this.api.getManyProducts(skip, limit));
    } else {
      res.status(200).json(await this.api.getAllProducts());
    }
  };

  getCartProduct = async (req, res, next) => {
    const { id, format } = req.params;
    if (!format || format == "json") {
      res.status(200).json(await this.api.getCartProduct(id));
    } else if (format == "text") {
      res
        .status(200)
        .render("productsCart", await this.api.getHTMLCartProduct(id));
    } else {
      next();
    }
  };

  getTableProducts = async (req, res, next) => {
    const { skip, limit } = req.query;
    const { format } = req.params;
    if (format == "json") {
      res.status(200).json(await this.api.getManyProducts(skip, limit));
    } else if (format == "text") {
      res
        .status(200)
        .render(
          "productsTable",
          await this.api.getHTMLManyProducts({ skip, limit })
        );
    } else {
      next();
    }
  };

  getListadoProducts = async (req, res, next) => {
    const { query } = req;
    res
      .status(200)
      .render("listingContainer", await this.api.getHTMLManyProducts(query));
  };

  async get404(req, res) {
    res.status(404).json({ message: "bad request", error: "true" });
  }

  postProduct = async (req, res) => {
    if (!req.file && !req.files) {
      res.status(400).json({});
      return;
    }
    const product = req.body;
    console.log('🚀 ~ ProductController ~ postProduct= ~ product', product);
    handleReqFiles(req.files, product);
    res.status(201).json(await this.api.postProduct(product));
  };

  putProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    handleReqFiles(req.files, product);
    const updatedProduct = await this.api.updateProduct(id, product);
    res.json(updatedProduct);
  };

  deleteProduct = async (req, res) => {
    const { id } = req.params;
    const removedProduct = await this.api.deleteProduct(id);
    res.json(removedProduct);
  };

  // async getSponsored(req, res) {

  // }

  // async getPopular(req, res) {

  // }

  // async getNewest(req, res) {

  // }
}

function handleReqFiles(files, product) {
  if (!files) return;
  const { profileImageUrl, imagesUrls } = files;
  if (profileImageUrl) {
    product.profileImageUrl =
      config.IMAGE_ROUTE_UPLOADS + profileImageUrl[0].filename;
  }
  if (imagesUrls) {
    product.imagesUrls = [
      ,/*{ imageUrl: config.IMAGE_ROUTE + profileImageUrl[0].filename }*/
    ];
    for (const file of imagesUrls) {
      product.imagesUrls.push({
        imageUrl: config.IMAGE_ROUTE_UPLOADS + file.filename,
      });
    }
  }
}
