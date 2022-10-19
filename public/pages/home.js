import { cart } from "/js/header.js";

export default class PageHome {
  constructor() {
    this.sectionsCards = document.querySelectorAll(".section-cards");
    this.containerSponsored =
      this.sectionsCards[0].querySelector(".cards-container");
    this.containerPopular =
      this.sectionsCards[1].querySelector(".cards-container");
    this.containerNew = this.sectionsCards[2].querySelector(".cards-container");
    
    this.addEventCardSection(this.containerSponsored);
    this.addEventCardSection(this.containerPopular);
    this.addEventCardSection(this.containerNew);
    this.checkLocalStorage()
  }

  init() {
    this.addFavoriteButtonEvent();
  }

  addEventCardSection(container) {
    container.addEventListener("click", async (e) => {
      if (e.target.classList.contains("card__link-add")) {
        e.preventDefault();
        await cart.addNewCartProduct(e.target.dataset.id);

      }

    });

  }

  checkLocalStorage() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites) {
      this.favorites = {};
    } else {
      this.favorites = favorites;
      for (const id in this.favorites) {
        document.querySelector(`.card__favorite[data-id="${id}"]`).classList.add('card__favorite--selected')
      }
    }
  }

  updateLocalStorage() {
    localStorage.setItem('favorite', JSON.stringify(this.favorites))
  }

  addFavoriteButtonEvent() {
    document.querySelectorAll('.card__favorite').forEach(button => {
      button.addEventListener('click', e => {
        if (button.classList.toggle('card__favorite--selected')) {
          this.favorites[button.dataset.id] = true;
          this.updateLocalStorage();
        }
      })
    })
  }
}
