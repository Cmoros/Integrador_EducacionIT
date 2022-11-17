import popup from "./popup.js";
import Spin from "./Spin.js";

export default class Table {
  constructor(tableProductsContainer, baseUrl) {
    this.url = baseUrl;
    this.container = tableProductsContainer;
    this.currentItems = {};
    this.limit = 7;
    this.restartTable();
    this.container.addEventListener("click", async (e) => {
      if (e.target.dataset.page) {
        e.preventDefault();
        const page = e.target.dataset.page;
        this.currentPage = page >= 1 ? page : 1;
        this.updateTable(this.calculateSkip(), this.limit);
      }
    });
  }

  async updateTable(skip = this.calculateSkip(), limit = this.limit) {
    const query = new URLSearchParams({ skip, limit });
    Spin.init(this.container);
    try {
      const newProducts = await fetch(this.url + "table/json?" + query).then(
        (res) => res.json()
      );
      for (const product of newProducts) {
        this.currentItems[product.id] = product;
      }
      const newHTML = await fetch(this.url + "table/text?" + query).then(
        (res) => res.text()
      );
      this.container.innerHTML = newHTML;
      if (this.container.querySelector(".empty") && this.currentPage > 1) {
        this.currentPage -= 1;
        this.updateTable();
      }
    } catch (e) {
      console.error("Error actualizando el carrito:", e);
      this.currentItems = {};
      this.restartTable();
    }
    Spin.remove();
  }

  checkResultFromFetch(result, text1, text2) {
    if (!Object.keys(result).length) {
      popup.init(
        `<i class="fa-solid fa-ban"></i>Ups! No se pudo ${text1} el producto`
      );
      return false;
    }
    popup.init(
      `<i class="fa-solid fa-check"></i>Se ${text2} el producto correctamente`
    );
    return true;
  }

  calculateSkip() {
    return (this.currentPage - 1) * this.limit;
  }

  async restartTable() {
    this.currentPage = 1;
    try {
      await this.updateTable();
    } catch (e) {
      this.container.innerHTML = "<p>Hubo algun error</p>";
    }
  }
}
