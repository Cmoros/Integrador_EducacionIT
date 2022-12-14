import { query } from "/js/header.js";
import Spin from "../modules/Spin.js";
import PageHome from "./home.js";

export default class PageListado {
  constructor() {
    this.container = document.querySelector(".listing__wrapper");
    this.initialSkip = 0;
    this.limit = 7;
    this.currentPage = 1;
    this.favoriteClassName = "card__favorite";
    this.container.addEventListener("click", async (e) => {
      if (e.target.dataset.page) {
        e.preventDefault();
        const page = e.target.dataset.page;
        this.currentPage = page >= 1 ? page : 1;
        const order = this.getOrder();
        this.init(this.calculateSkip(), this.limit, order);
      }
    });
    this.container.addEventListener("change", (e) => {
      if (e.target.classList.contains("products-header__select")) {
        this.currentPage = 1;
        const order = this.getOrder();
        this.init(this.calculateSkip(), this.limit, order);
      }
    });
  }

  async init(
    skip = this.initialSkip,
    limit = this.limit,
    order = "sponsored:-1"
  ) {
    const params = { skip, limit, order };
    if (query) params.query = query;
    const searchParams = "?" + new URLSearchParams(params);
    Spin.init();
    try {
      const newHTML = await fetch(
        "./api/products/listado/text" + searchParams
      ).then((res) => res.text());
      this.container.innerHTML = newHTML;
    } catch (e) {
      console.error("Error trayendo el listado: ", e);
    }
    Spin.remove();
    this.updateFavorites();
  }

  getOrder() {
    const select = document.querySelector(".products-header__select");
    return select?.value || "sponsored:-1";
  }

  calculateSkip() {
    return (this.currentPage - 1) * this.limit;
  }

  updateFavorites() {
    this.updateLocalStorage = PageHome.prototype.updateLocalStorage;
    PageHome.prototype.checkLocalStorage.call(this);
    PageHome.prototype.addFavoriteButtonEvent.call(this);
  }
}
