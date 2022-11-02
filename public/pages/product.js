import Btn from "/modules/Btn.js";
import { cart } from "/js/header.js";
import PageHome from "/pages/home.js";

export default class ProductPage {
  constructor() {
    this.productElement = document.querySelector(".solo-product");
    this.productId = this.productElement.dataset.id;
    this.imgDisplayingEl = this.productElement.querySelector(
      ".solo-product__ppal-image"
    );
    this.favoriteClassName = "solo-product__form-link--fav";
    this.updateLocalStorage = PageHome.prototype.updateLocalStorage;
    this.addBtns = {};
    this.btnAddClassName = "solo-product__form-link--add";
    this.addBtns[this.productId] = new Btn(
      this.productElement.querySelector(`.${this.btnAddClassName}`),
      this.btnAddClassName,
      true,
      '<i class="fa fa-shopping-basket solo-product__form-link-icon" aria-hidden="true"></i>Agregar al carrito'
    );
    PageHome.prototype.checkLocalStorage.call(this);
    // this.checkLocalStorage = PageHome.prototype.checkLocalStorage;
    // this.checkLocalStorage();
    this.quantityToAdd = 1;
    // this.addFavoriteButtonEvent = PageHome.prototype.addFavoriteButtonEvent;
    // this.addFavoriteButtonEvent()
    PageHome.prototype.addFavoriteButtonEvent.call(this);
    this.productElement.addEventListener("click", async (e) => {
      if (e.target.classList.contains("solo-product__image")) {
        this.imgDisplayingEl.src = e.target.src;
      }
      // if(e.target.classList.contains('solo-product__form-link--add')) {
      //   e.preventDefault();
      //   console.log(this.quantityToAdd)
      //   await cart.addNewCartProduct(this.productId, this.quantityToAdd);
      // }
    });
    this.productElement.addEventListener("input", (e) => {
      if (e.target.classList.contains("solo-product__datalist-input")) {
        const quantity = Number(e.target.value);
        if (isNaN(quantity)) {
          e.target.value = this.quantityToAdd;
          return;
        }
        this.quantityToAdd = quantity;
      }
    });
    PageHome.prototype.addEventCardSection.call(
      this,
      this.productElement,
      this.btnAddClassName
    );
  }

  async init() {}
}
