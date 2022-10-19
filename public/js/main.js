class Main {
  constructor() {
    this.links = document.querySelectorAll(".main-nav__link");
  }
  async start() {
    await this.loadTemplates();
  }

  async loadTemplates() {
    await this.loadTemplate();
    window.addEventListener("hashchange", () => this.loadTemplate());
  }

  async loadTemplate() {
    this.id = this.getIdFromHash();

    const viewUrl = this.getApiUrlFromId(this.id);
    const viewContent = await this.ajax(viewUrl);
    document.querySelector("main").innerHTML = viewContent;
    if (this.error404) {
      document.title = "404 - Juguetería Cósmica";
      this.deactiveActiveLink();
      return;
    }
    document.title = `
    ${this.id[0].toUpperCase() + this.id.slice(1)} 
    - Juguetería Cósmica
    `;
    this.updateActiveLink();
    this.initJS(this.id);
  }

  getIdFromHash() {
    let id = location.hash.slice(1);
    if (id[0] === "/") {
      id = id.slice(1);
    }
    return id || "home";
  }

  getApiUrlFromId(id) {
    console.log(`${location.origin}/api/page/${id}`);
    return `${location.origin}/api/page/${id}`;
  }

  async ajax(url, method = "get") {
    this.error404 = false;
    console.log('url', url)
    return await fetch(url, { method: method }).then((r) => {
      this.error404 = r.status != 200;
      return r.text();
    });
  }

  updateActiveLink() {
    this.deactiveActiveLink();
    for (const link of this.links) {
      if (link.getAttribute("href") === `#/${this.id}`) {
        link.classList.add("main-nav__link--active");
        link.ariaCurrent = "page";
        this.activeLink = link;
        return;
      }
    }
  }

  deactiveActiveLink() {
    this.activeLink?.classList.remove("main-nav__link--active");
    this.activeLink?.removeAttribute("aria-current");
  }

  async initJS(id) {
    const moduleUrl = this.getPageUrlFromId(id);
    try {
      console.log('Trying to import', moduleUrl)
      const { default: page } = await import(moduleUrl);
      const pageInstance = new page();
      if (typeof pageInstance.init !== "function") {
        console.error(`El módulo ${id} no posee un método init().`);
        return;
      }
      pageInstance.init();
    } catch (error) {
      console.log('Detalles del error:',error);
      console.error(`No se pudo importar el módulo ${moduleUrl}.`);
    }
  }

  getPageUrlFromId(id) {
    return `/pages/${id}.js`;
  }
}

const main = new Main();
main.start();
