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
    this.progressContent = `<i class="fa-solid fa-hourglass-half ${className}"></i>Agregando`;
    this.successContent = `<i class="fa-solid fa-check ${className}"></i>Agregado`;
    this.nostockContent = `<i class="fa-solid fa-circle-exclamation ${className}"></i>No Stock`;
  }

  timeoutMessage(classToToggle, message) {
    this.btnEl.innerHTML = message;
    this.btnEl.classList.add(classToToggle);
    setTimeout(() => {
      this.btnEl.classList.remove(classToToggle);
      this.btnEl.innerHTML = this.originalContent;
    }, 3000);
  }
}
