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
    console.log(query);
    res
      .status(200)
      .render("listingContainer", await this.api.getHTMLManyProducts(query));
  };

  async get404(req, res) {
    res.status(404).json({ message: "bad request", error: "true" });
  }

  postProduct = async (req, res) => {
    // console.log(req.body);
    if (!req.file && !req.files) {
      res.status(400).json({});
      return;
    }
    // const { product } = req.body; // <---------- Propenso a ser cambiado ya que actualmente se manda por post un objeto {product:product} en vez de product directamente (esto debido a como envia los datos el formulario)
    // console.log(req.file);
    // console.log(req.files)
    const product = req.body;
    const { profileImageUrl, imagesUrls } = req.files;
    product.profileImageUrl = config.IMAGE_ROUTE + profileImageUrl[0].filename;

    console.log("req.files", req.files);
    if (imagesUrls) {
      product.imagesUrls = [
        { imageUrl: config.IMAGE_ROUTE + profileImageUrl[0].filename },
      ];
      for (const file of imagesUrls) {
        product.imagesUrls.push({
          imageUrl: config.IMAGE_ROUTE + file.filename,
        });
      }
    }
    res.status(201).json(await this.api.postProduct(product));
  };

  putProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    console.log(product);
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
