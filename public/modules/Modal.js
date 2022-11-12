let modalBG;
const body = document.querySelector("body");

export default class Modal {
  static async init(url) {
    return new Promise(async (resolve) => {
      body.classList.add("open-modal");
      await Modal.create(url, resolve);
    });
  }

  static async create(url, resolve) {
    modalBG = document.createElement("div");
    modalBG.classList.add("modal__bg");
    modalBG.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("modal__bg") ||
        e.target.classList.contains("modal__close-btn")
      ) {
        Modal.close();
        resolve(false);
        return;
      }
      if (e.target.classList.contains("btn--success")) {
        Modal.close();
        resolve(true);
      }
    });
    fetch("/api/page/modal/" + url)
      .then((res) => res.text())
      .then((text) => (modalBG.innerHTML = text));
    body.append(modalBG);
  }

  static close() {
    body.classList.remove("open-modal");
    modalBG.remove();
  }
}
