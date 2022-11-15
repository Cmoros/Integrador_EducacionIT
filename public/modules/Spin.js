const container = document.createElement("div");
container.classList.add("spin__container");
container.innerHTML = `<div class="spin">`;

const body = document.querySelector("body");

export default class Spin {
  static init(target = body) {
    getComputedStyle(target).width;
    target.append(container);
  }

  static remove() {
    container.remove();
  }
}
