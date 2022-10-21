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

  // FIXME
  postProduct = async (req, res)=> {
    const {product} = req.body;       // <---------- Propenso a ser cambiado ya que actualmente se manda por post un objeto {product:product} en vez de product directamente (esto debido a como envia los datos el formulario)
    res.json(await this.api.postProduct(product));
  }
  
  putProduct = async (req, res) => {
    const {id} = req.params; 
    const updatedProduct = await this.api.updateProduct(id, product);
    res.json(updatedProduct);
  }
  
  deleteProduct = async (req, res) => {
    const { id } = req.params;
    const removedProduct = await this.api.deleteProduct(id);
    res.json(removedProduct);
  }
  
    // async getSponsored(req, res) {
  
    // }
  
    // async getPopular(req, res) {
  
    // }
  
    // async getNewest(req, res) {
  
    // }
}
