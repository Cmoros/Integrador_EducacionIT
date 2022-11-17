import { cart } from "/js/header.js";
import Btn from "/modules/Btn.js";

export default class PageHome {
  constructor() {
    this.sections = document.querySelectorAll(".section-cards");
    this.containerSponsored = this.sections[0];
    this.containerPopular = this.sections[1];
    this.containerNew = this.sections[2];
    this.addBtns = {};
    this.favoriteClassName = "card__favorite";
    this.addBtnClassName = "card__link-add";
    this.addEventCardSection(this.containerSponsored, this.addBtnClassName);
    this.addEventCardSection(this.containerPopular, this.addBtnClassName);
    this.addEventCardSection(this.containerNew, this.addBtnClassName);
    this.checkLocalStorage();
  }

  init() {
    this.addFavoriteButtonEvent();
  }

  addEventCardSection(container, className, quantity = 1) {
    container.addEventListener("click", async (e) => {
      if (e.target.classList.contains(className)) {
        e.preventDefault();
        // if (e.target.constains("btn--nostock")) return;

        const id = e.target.dataset.id;

        this.addBtns[id] ||= new Btn(e.target, className);
        let btn = this.addBtns[id];
        e.target.innerHTML = btn.progressContent;
        e.target.classList.add("btn--process");
        quantity = this.quantityToAdd || quantity;
        const added = await cart.addNewCartProduct(id, quantity);
        if (added === false && !cart.checkProductInCart(id)) {
          return;
        }
        e.target.classList.remove("btn--process");
        if (added == "nostock") {
          clearTimeout(btn.timeoutId);
          btn.timeoutId = btn.timeoutMessage(
            "btn--nostock",
            btn.nostockContent
          );
          return;
        }
        // e.target.innerHTML = btn.successContent;
        // e.target.classList.add("btn--success");
        clearTimeout(btn.timeoutId);

        btn.timeoutId = btn.timeoutMessage("btn--success", btn.successContent);
      }
    });
  }

  checkLocalStorage() {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
      this.favorites = {};
    } else {
      this.favorites = favorites;
      for (const id in this.favorites) {
        document
          .querySelector(`.${this.favoriteClassName}[data-id="${id}"]`)
          ?.classList.add(`${this.favoriteClassName}--selected`);
      }
    }
  }

  updateLocalStorage() {
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  addFavoriteButtonEvent() {
    document
      .querySelectorAll(`.${this.favoriteClassName}`)
      .forEach((button) => {
        button.addEventListener("click", (e) => {
          if (button.href) e.preventDefault();
          if (button.classList.toggle(`${this.favoriteClassName}--selected`)) {
            this.favorites[button.dataset.id] = true;
          } else {
            delete this.favorites[button.dataset.id];
          }
          this.updateLocalStorage();
        });
      });
  }
}
