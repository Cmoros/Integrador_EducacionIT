import Spin from "./Spin.js";

let modalBG;
const body = document.querySelector("body");

export default class Modal {
  static async init(url, fn = () => {}) {
    return new Promise(async (resolve) => {
      body.classList.add("open-modal");
      await Modal.create(url, resolve, fn);
    });
  }

  static async create(url, resolve, fn) {
    modalBG = document.createElement("div");
    modalBG.classList.add("modal__bg");
    modalBG.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("modal__bg") ||
        e.target.classList.contains("modal__close-btn")
      ) {
        Modal.close(fn);
        resolve(false);
        return;
      }
      if (e.target.classList.contains("modal__success")) {
        Modal.close(fn);
        resolve(true);
        return;
      }
      if (e.target.classList.contains("modal__link")) {
        Modal.close(fn);
        resolve(e.target.href);
      }
    });
    body.append(modalBG);
    Spin.init();
    await fetch("/api/page/modal/" + url)
      .then((res) => res.text())
      .then((text) => (modalBG.innerHTML = text));
    Spin.remove();
  }

  static close(fn) {
    body.classList.remove("open-modal");
    modalBG.remove();
    fn();
  }
}
