import { cart } from "/js/header.js";
import PageHome from "/pages/home.js";


export default class ProductPage {
  constructor(){
    this.productElement = document.querySelector('.solo-product');
    this.productId = this.productElement.dataset.id;
    this.imgDisplayingEl = this.productElement.querySelector('.solo-product__ppal-image');
    this.favoriteClassName = 'solo-product__form-link--fav';
    this.updateLocalStorage = PageHome.prototype.updateLocalStorage;
    this.checkLocalStorage = PageHome.prototype.checkLocalStorage;
    this.addFavoriteButtonEvent = PageHome.prototype.addFavoriteButtonEvent;
    this.checkLocalStorage();
    this.quantityToAdd = 1;
    this.addFavoriteButtonEvent()
    this.productElement.addEventListener('click', async e => {
      if (e.target.classList.contains('solo-product__image')) {
        this.imgDisplayingEl.src = e.target.src;
        return;
      }
      if(e.target.classList.contains('solo-product__form-link--add')) {
        e.preventDefault();
        console.log(this.quantityToAdd)
        await cart.addNewCartProduct(this.productId, this.quantityToAdd);
      }
    })
    this.productElement.addEventListener('input', e => {
      if (e.target.classList.contains('solo-product__datalist-input')) {
        const quantity = Number(e.target.value);
        if (isNaN(quantity)) {
          console.log('Quantity is NaN')
          e.target.value = this.quantityToAdd
          return
        }
        this.quantityToAdd = quantity;
      }
    })
  }

  async init() {

  }
}