import ProductApi from "../api/ProductApi.js";

export default class ProductController {
  constructor() {
    this.api = new ProductApi();
  }
  
  getProduct = async (req, res) => {
    const { id } = req.params;
    res.json(await this.api.getProduct(id));
  }
  
  getAllProducts = async (req, res) => {
    res.json(await this.api.getAllProducts());
  }

  // async getCartProduct(req, res, next) {
  //   const { id, format } = req.params;
  //   if (format || format == "json") {
  //     res.json(await this.api.getCartProduct(id));
  //   } else if (format == "text") {
  //     res.render(await this.api.getHTMLCartProduct(id));
  //   } else {
  //     next();
  //   }
  // }

  getCartProduct = async (req, res, next) => {
    const { id, format } = req.params;
    if (!format || format == "json") {
      res.json(await this.api.getCartProduct(id));
    } else if (format == "text") {
      res.render("productsCart",await this.api.getHTMLCartProduct(id));
    } else {
      next();
    }
  }

  async get404(req, res) {
    res.json({message: "bad request", error: "true"})
  }

  // async getSponsored(req, res) {

  // }

  // async getPopular(req, res) {

  // }

  // async getNewest(req, res) {

  // }

  postProduct = async (req, res)=> {
    const newProduct = req.body;
    res.json(await this.api.createProduct(newProduct));
  }

  putProduct = async (req, res) => {
    const product = req.body;
    const updatedProduct = await this.api.updateProduct(product.id, product);
    res.json(updatedProduct);
  }

  deleteProduct = async (req, res) => {
    const { id } = req.params;
    const removedProduct = await api.deleteProduct(id);
    res.json(removedProduct);
  }
}
