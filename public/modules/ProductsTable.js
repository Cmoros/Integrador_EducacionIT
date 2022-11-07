import { altaForm } from "../pages/alta.js";
import popup from "./popup.js";

export default class ProductsTable {
  constructor(tableProductsContainer) {
    this.form = altaForm;
    this.container = tableProductsContainer;
    this.currentProducts = {};
    this.limit = 5;
    this.restartTable();
    this.container.addEventListener("click", async (e) => {
      if (e.target.classList.contains("table-products__page-link")) {
        e.preventDefault();
        this.currentPage = e.target.dataset.page;
        this.updateTable(this.calculateSkip(), this.limit);
      } else if (e.target.classList.contains("table-products__btn--edit")) {
        this.form.selectProduct(this.currentProducts[e.target.dataset.id]);
      } else if (e.target.classList.contains("table-products__btn--delete")) {
        if (confirm("Seguro de borrar el producto " + e.target.dataset.id)) {
          const result = await this.deleteProduct(e.target.dataset.id);
          if (this.checkResultFromFetch(result, 'borrar', 'borró')) {
            this.updateTable(this.calculateSkip(), this.limit);
          }
        }
      }
    });
  }

  async updateTable(skip = this.calculateSkip(), limit = this.limit) {
    const query = new URLSearchParams({ skip, limit });
    try {
      const newProducts = await fetch(
        "./api/products/table/json?" + query
      ).then((res) => res.json());
      for (const product of newProducts) {
        this.currentProducts[product.id] = product;
      }
      const newHTML = await fetch("./api/products/table/text?" + query).then(
        (res) => res.text()
      );
      this.container.innerHTML = newHTML;
    } catch (e) {
      this.restartTable();
    }
  }

  checkResultFromFetch(result, text1, text2) {
    if (!Object.keys(result).length) {
      popup.init(
        `<i class="fa-solid fa-ban"></i>Ups! No se pudo ${text1} el producto`
      );
      return false
    }
    popup.init(
      `<i class="fa-solid fa-check"></i>Se ${text2} el producto correctamente`
    );
    return true
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

  async deleteProduct(id) {
    try {
      const deletedProduct = await fetch("./api/products/" + id, {
        method: "delete",
      }).then((res) => res.json());
      return deletedProduct;
    } catch (e) {
      console.log(`Hubo un error borrando el producto ${id}. Detalles: ${e}`);
      return {};
    }
  }

  async modifyProduct(id) {}
}
