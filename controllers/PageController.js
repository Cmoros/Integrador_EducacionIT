import PageApi from "../api/PageApi.js";

export default class PageController {
  constructor() {
    this.api = new PageApi();
  }
  getHomePage = async (req, res) => {
    const { n } = req.params;

    res.status(200).render("home", await this.api.getHomePage(n));
  };

  getPage = async (req, res, next) => {
    const { page } = req.params;
    const hbsRenderConfig = await this.api.getPage(page);
    if (hbsRenderConfig) {
      res.status(200).render(page, hbsRenderConfig);
    } else {
      next();
    }
  };

  get404 = async (req, res) => {
    res.status(404).render("404", await this.api.get404());
  };

  async getDefault(req, res) {
    res.redirect("/api/page/home");
  }

  async getProductPage(req, res, next) {
    const { id } = req.params;
    const product = await this.api.getProduct(id);
    if (Object.keys(product).length == 0) {
      next();
      return;
    }
    res.status(200).render("product", { layout: false, ...product });
  }
}
