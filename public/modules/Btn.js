export default class Btn {
  constructor(btn, adding = true) {
    this.btnEl = btn;
    this.id = btn.dataset.id;
    this.adding = adding;
  }
  originalContent = '<i class="fa fa-shopping-basket card__link-add-icon" aria-hidden="true"></i>Agregar'
  progressContent = '<i class="fa-solid fa-hourglass-half card__link-add-icon"></i>Agregando'
  successContent = '<i class="fa-solid fa-check card__link-add-icon"></i>Agregado'
}