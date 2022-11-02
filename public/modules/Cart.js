import popup from "./popup.js";

export default class Cart {
  constructor(cartCheckboxToggle, cartButton, cartWindow) {
    this.cartCheckboxToggle = cartCheckboxToggle;
    this.cartButton = cartButton;
    this.cartWindow = cartWindow;
    this.products = {};
    this.loading = {};
    this.cartProductsContainer = cartWindow.querySelector(
      ".cart-window__products"
    );
    this.body = document.querySelector("body");
    this.subtotalContainer = cartWindow.querySelector(
      ".cart-window__subtotal-price"
    );
    this.bubble = document.querySelector(".cart-button__bubble");
    this.subtotal = 0;

    document.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("cart-window") ||
        e.target.classList.contains("cart-window__close-button")
      ) {
        this.toggleCartModal();
        return;
      }
      if (e.target.classList.contains("cart-product__button")) {
        const productElement = e.target.closest(".cart-product");
        const productId = productElement.dataset.id;
        if (e.target.classList.contains("cart-product__button--plus")) {
          this.addQuantityToProduct(productId, 1);
        } else if (e.target.classList.contains("cart-product__button--minus")) {
          this.addQuantityToProduct(productId, -1);
        } else if (e.target.classList.contains("cart-product__button--trash")) {
          this.removeProduct(productId);
        }
        this.updateLocalStorage();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.toggleCartModal("hide");
      }
    });
    this.checkLocalStorage();
  }

  toggleCartModal(action = "hide") {
    if (this.cartCheckboxToggle.checked && action == "hide") {
      this.body.classList.remove("open-modal");
      this.cartCheckboxToggle.checked = false;
    } else {
      if (action != "show") return;
      this.body.classList.toggle("open-modal", this.cartCheckboxToggle.checked);
    }
  }

  async checkLocalStorage() {
    try {
      const cartProductsInLocal = JSON.parse(
        localStorage.getItem("cartProducts")
      );
      if (cartProductsInLocal) {
        for (const id in cartProductsInLocal) {
          await this.addNewCartProduct(id, cartProductsInLocal[id].quantity);
          this.checkQuantityvsStock(id);
        }
      } else {
        this.updateLocalStorage();
      }
    } catch {
      this.updateLocalStorage();
    }
    this.updateSubtotal();
    this.updateBubble();
  }

  updateLocalStorage() {
    const compactedProducts = {};
    for (const id in this.products) {
      compactedProducts[id] = { quantity: this.products[id].quantity };
    }
    localStorage.setItem("cartProducts", JSON.stringify(compactedProducts));
  }

  checkProductInCart(id) {
    return Boolean(this.products[id]);
  }

  async createProductElement(product) {
    const productHTMLText = await fetch(
      `./api/products/${product.id}/cart/text`
    ).then((res) => res.text());
    const productContainer = document.createElement("div");
    productContainer.classList.add("cart-window__product-container");
    productContainer.innerHTML = productHTMLText;
    return productContainer;
  }

  async addNewCartProduct(id, quantity = 1) {
    // En caso de existir el producto pero no el id, es que está agregandose
    let added = false;
    if (this.loading[id] != null) {
      this.loading[id] += 1;
      return added;
    }
    if (id in this.products || id in this.loading) {
      this.addQuantityToProduct(id, quantity);
    } else {
      this.loading[id] = 0;
      const res = await fetch(`./api/products/${id}/cart/json`);
      const product = await res.json();
      if (product.error /*|| product.stock == 0*/) {
        popup.init(
          '<i class="fa-solid fa-ban"></i>Ups! Nos quedamos sin stock'
        );
        delete this.loading[id];
        return "error";
      }
      added = true;
      product.quantity = this.loading[id] + quantity;
      this.loading[id] = product.quantity;

      const productElement = await this.createProductElement(product);
      this.cartProductsContainer.append(productElement);
      this.products[id] = {
        ...product,
        productElement,
        quantity: this.loading[id],
      };
      delete this.loading[id];

      this.checkQuantityvsStock(id);
      this.updateSubtotal();
      this.updateBubble();
    }
    this.updateLocalStorage();
    if (this.products[id].stock == 0) {
      added = "nostock";
    }
    return added;
  }

  checkQuantityvsStock(id) {
    const product = this.products[id];
    const plusButton = product.productElement.querySelector(
      ".cart-product__button--plus"
    );
    const quantityHTML = product.productElement.querySelector(
      ".cart-product__quantity"
    );
    this.updateSubtotalProduct(id);
    if (product.quantity >= product.stock) {
      if (product.quantity > product.stock) {
        product.quantity = product.stock;
        this.updateLocalStorage();
        this.updateSubtotal();
        this.updateSubtotalProduct(id);
        this.updateBubble();
      }
      quantityHTML.innerText = product.stock;
    }
    plusButton.disabled = product.quantity >= product.stock;

    const minusButton = product.productElement.querySelector(
      ".cart-product__button--minus"
    );
    minusButton.disabled = product.quantity <= 1;
    if (product.quantity <= 1) {
      if (product.quantity < 1) {
        product.quantity = 0;
        this.updateLocalStorage();
        this.updateSubtotal();
        this.updateSubtotalProduct(id);
        this.updateBubble();
        quantityHTML.innerText = "s/n";
        popup.init(
          '<i class="fa-solid fa-ban"></i>Ups! Nos quedamos sin stock'
        );
      } else {
        quantityHTML.innerText = product.quantity;
      }
    }
    minusButton.disabled = product.quantity <= 1;
  }

  addQuantityToProduct(id, quantity) {
    const product = this.products[id];
    product.quantity += quantity;
    if (product.quantity > product.stock) product.quantity = product.stock;

    this.updateSubtotal();
    this.updateBubble();
    this.updateSubtotalProduct(id);
    this.checkQuantityvsStock(id);
  }

  removeProduct(id) {
    this.products[id].productElement.remove();
    delete this.products[id];
    this.updateSubtotal();
    this.updateBubble();
  }

  updateSubtotal() {
    this.subtotal = 0;
    for (const id in this.products) {
      const { price, quantity } = this.products[id];
      this.subtotal += price * quantity;
    }
    if (isNaN(this.subtotal)) this.restart();
    this.subtotalContainer.innerHTML = `$${this.subtotal}`;
  }

  updateSubtotalProduct(id) {
    const product = this.products[id];
    product.productElement.querySelector(".cart-product__quantity").innerHTML =
      product.quantity;
    const subtotalProduct = product.productElement.querySelector(
      ".cart-product__subtotal-total"
    );
    subtotalProduct.innerHTML = `$${product.price * product.quantity}`;
    const subtotalProductPrice = product.productElement.querySelector(
      ".cart-product__subtotal-price"
    );
    subtotalProductPrice.innerHTML = `$${product.price} X ${product.quantity}`;
  }

  restart() {
    this.products = {};
    this.updateLocalStorage();
    this.cartProductsContainer.innerHTML = "";
    this.subtotal = 0;
    this.numberOfProducts = 0;
    this.updateBubble();
  }

  updateBubble() {
    let numberOfProducts = 0;
    for (const id in this.products) {
      numberOfProducts += this.products[id].quantity;
    }
    this.bubble.innerHTML = numberOfProducts;
  }
}
