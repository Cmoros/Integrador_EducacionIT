import PageApi from "../api/PageApi.js";

export default class PageController {
  constructor() {
    this.api = new PageApi();
  }

  getHomePage = async (req, res) => {
    const { n } = req.params;
    res.status(200).render("home", await this.api.getHomePage(n));
  };

  getAltaPage = async (req, res) => {
    res.status(200).render("alta", await this.api.getAltaPage());
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

  getModal = async (req, res) => {};

  getRemoveModal = async (req, res) => {
    const { id } = req.params;
    res.status(200).render("modal", await this.api.getRemoveModal(id));
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
    product.imagesUrls.unshift({ imageUrl: product.profileImageUrl });
    res.status(200).render("product", { layout: false, ...product });
  }

  async getListadoPage(req, res) {
    res.status(200).render("listado", { layout: false });
  }
}
