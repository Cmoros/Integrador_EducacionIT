export default class Btn {
  constructor(
    btnEl,
    className,
    adding = true,
    originalContent = `<i class="fa fa-shopping-basket ${className}" aria-hidden="true"></i>Agregar`
  ) {
    this.originalContent ||= originalContent;
    this.btnEl = btnEl;
    this.id = btnEl.dataset.id;
    this.adding = adding;
    this.progressContent =
      `<i class="fa-solid fa-hourglass-half ${className}"></i>Agregando`;
    this.successContent =
      `<i class="fa-solid fa-check ${className}"></i>Agregado`;
  }
}
