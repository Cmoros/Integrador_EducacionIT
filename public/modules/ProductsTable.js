import { altaForm } from "../pages/alta.js";
import Modal from "./Modal.js";
import Spin from "./Spin.js";
import Table from "./Table.js";

export default class ProductsTable extends Table {
  constructor(tableProductsContainer, baseUrl) {
    super(tableProductsContainer, baseUrl);
    this.form = altaForm;
    this.container.addEventListener("click", async (e) => {
      if (e.target.classList.contains("table__btn--edit")) {
        this.form.selectProduct(this.currentItems[e.target.dataset.id]);
      } else if (e.target.classList.contains("table__btn--delete")) {
        if (await Modal.init("remove/" + e.target.dataset.id)) {
          const result = await this.deleteProduct(e.target.dataset.id);
          if (this.checkResultFromFetch(result, "borrar", "borró")) {
            this.updateTable(this.calculateSkip(), this.limit);
          }
        }
      }
    });
  }

  async deleteProduct(id) {
    Spin.init();
    let deletedProduct;
    try {
      deletedProduct = await fetch(this.url + id, {
        method: "delete",
      }).then((res) => res.json());
      delete this.currentItems[id];
      if (altaForm.state[1] == id) altaForm.restartForm();
    } catch (e) {
      console.log(`Hubo un error borrando el producto ${id}. Detalles: ${e}`);
      deletedProduct = {};
    }
    Spin.remove();
    return deletedProduct;
  }
}
