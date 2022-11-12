import { query } from "/js/header.js";

export default class PageListado {
  constructor() {
    this.container = document.querySelector(".listing__wrapper");
    this.initialSkip = 0;
    this.limit = 5;
    this.currentPage = 1;
    this.container.addEventListener("click", async (e) => {
      if (e.target.dataset.page) {
        e.preventDefault();
        const page = e.target.dataset.page;
        this.currentPage = page >= 1 ? page : 1;
        this.init(this.calculateSkip(), this.limit);
      }
    });
  }

  async init(skip = this.initialSkip, limit = this.limit) {
    const params = { skip, limit };
    if (query) params.query = query;
    const searchParams = "?" + new URLSearchParams(params);
    try {
      const newHTML = await fetch(
        "./api/products/listado/text" + searchParams
      ).then((res) => res.text());
      this.container.innerHTML = newHTML;
    } catch (e) {
      console.log(e);
    }
  }

  calculateSkip() {
    return (this.currentPage - 1) * this.limit;
  }
}
