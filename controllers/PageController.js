import PageApi from "../api/PageApi.js";
import { hbsFiles } from "../app.js";

export default class PageController {
  constructor() {
    this.api = new PageApi();
  }
  getHomePage = async (req, res) => {
    const {n} = req.params

    res.render("home", await this.api.getHomePage(n))
  }

  getPage = async (req, res, next) => {
    const {page} = req.params
    if (hbsFiles.has(page)) {
      res.render(page, await this.api.getPage(page));
    } else {
      console.log('Se nexteó en getPage')
      next()
    }
  }

  get404 = async (req, res) => {
    res.status(404).render("404", await this.api.get404())
  }

  async getDefault(req, res) {
    console.log('Se redirigió en getDefault')
    res.redirect('/api/page/home');
  }

  async getProductPage(req, res, next) {
    const {id} = req.params
    const product = await this.api.getProduct(id)
    console.log('🚀 ~ PageController ~ getProductPage ~ config', product);
    if (Object.keys(product).length == 0) {
      next();
      return;
    }
    res.render("product", {layout:false, ...product})
  }
}