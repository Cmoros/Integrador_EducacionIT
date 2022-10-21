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
    this.addBtnClassName = "card__link-add"
    this.addEventCardSection(this.containerSponsored, this.addBtnClassName);
    this.addEventCardSection(this.containerPopular, this.addBtnClassName);
    this.addEventCardSection(this.containerNew, this.addBtnClassName);
    this.checkLocalStorage();
  }

  init() {
    this.addFavoriteButtonEvent();
  }

  addEventCardSection(container, className) {
    container.addEventListener("click", async (e) => {
      if (e.target.classList.contains(className)) {
        e.preventDefault();
        const id = e.target.dataset.id;
        
        this.addBtns[id] ||= new Btn(e.target, className)
        let btn = this.addBtns[id]
        e.target.innerHTML = btn.progressContent;
        e.target.classList.add('btn--process')
        const added = await cart.addNewCartProduct(id);
        if (added===false && !cart.checkProductInCart(id)) {
          return;
        }
        if (added == 'nostock') {
          e.target.classList.remove('btn--process')
          e.target.innerHTML = btn.originalContent;
          return;
        }
        e.target.innerHTML = btn.successContent;
        e.target.classList.add('btn--success')
        e.target.classList.remove('btn--process')
        clearTimeout(btn.timeoutId);
        btn.timeoutId = setTimeout(() => {
          e.target.classList.remove('btn--success')
          e.target.innerHTML = btn.originalContent;
        }, 3000);
      }
    });
  }

  checkLocalStorage() {
    console.log(this);
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
      this.favorites = {};
    } else {
      console.log("favorites", favorites);
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
