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

  getApprovedModal = async (req, res) => {
    const { saleId } = req.params;
    res
      .status(200)
      .render("modalApproved", await this.api.getApprovedModal(saleId));
  };

  getRemoveModal = async (req, res) => {
    const { productId } = req.params;
    res
      .status(200)
      .render("modalRemove", await this.api.getRemoveModal(productId));
  };

  getConfirmModal = async (req, res) => {
    const { query } = req;
    res
      .status(200)
      .render("modalConfirm", await this.api.getConfirmModal(query));
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

  async getSalePage(req, res, next) {
    const { id } = req.params;
    const config = await this.api.getSalePage(id);
    if (Object.keys(config).length == 0) {
      next();
      return;
    }
    res.status(200).render("sale", config);
  }

  async getListadoPage(req, res) {
    res.status(200).render("listado", { layout: false });
  }
}
