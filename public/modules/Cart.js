import popup from "./popup.js";
import Spin from "./Spin.js";
import Modal from "./Modal.js";

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
    this.submitBtn = cartWindow.querySelector(".cart-window__submit");
    this.subtotal = 0;

    document.addEventListener("click", async (e) => {
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
      if (e.target.classList.contains("cart-window__submit")) {
        e.preventDefault();
        const confirmed = await this.confirmSale();
        if (!confirmed) return;
        Spin.init();
        const result = await this.completeSale();
        Spin.remove();
        if (Object.keys(result).length == 0) return;
        this.approvedSale(result.id);
        this.restart();
        this.toggleCartModal();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.toggleCartModal("hide");
      }
    });
    this.cartWindowEmptyHTML = document.createElement("div");
    this.cartWindowEmptyHTML.classList.add("cart-window__empty");
    this.cartWindowEmptyHTML.innerHTML = "El carrito est?? vac??o";
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
    // En caso de existir el producto pero no el id, es que est?? agregandose
    let added = false;
    if (this.loading[id] != null) {
      this.loading[id] += quantity;
      return added;
    }
    if (id in this.products || id in this.loading) {
      this.addQuantityToProduct(id, quantity);
    } else {
      this.loading[id] = 0;
      const res = await fetch(`./api/products/${id}/cart/json`);
      const product = await res.json();
      if (
        product.error ||
        // Agregar (o quitar) linea si se desea que no deje agregar sin stock
        product.stock == 0
      ) {
        popup.init(
          '<i class="fa-solid fa-ban"></i>Ups! Nos quedamos sin stock'
        );
        delete this.loading[id];
        return "nostock";
        // return "error";
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
    this.updateSubtotal();
    this.updateBubble();
  }

  updateBubble() {
    this.numberOfProducts = this.countProducts();
    this.bubble.innerHTML = this.numberOfProducts;
    this.updateEmptyCart();
  }

  updateEmptyCart() {
    if (this.numberOfProducts === 0) {
      this.cartProductsContainer.innerHTML = "";
      this.cartProductsContainer.append(this.cartWindowEmptyHTML);
      this.submitBtn.classList.add("disabled");
      for (const id in this.products) {
        delete this.products[id];
      }
    } else {
      this.cartWindowEmptyHTML.remove();
      this.submitBtn.classList.remove("disabled");
    }
  }

  countProducts() {
    let numberOfProducts = 0;
    for (const id in this.products) {
      numberOfProducts += this.products[id].quantity;
    }
    return numberOfProducts;
  }

  async completeSale() {
    const finalProducts = { products: [] };

    for (const id in this.products) {
      const quantity = this.products[id].quantity;
      if (isNaN(quantity) || quantity <= 0) continue;
      finalProducts.products.push({
        productId: id,
        quantity,
        subtotal: quantity * this.products[id].price,
      });
    }

    finalProducts.total = finalProducts.products.reduce((acc, product) => {
      return acc + product.subtotal;
    }, 0);

    try {
      const result = await fetch("/api/sales/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalProducts),
      }).then((res) => res.json());
      if (Object.keys(result).length == 0) throw new Error();
      popup.init(
        `<i class="fa-solid fa-truck"></i>Compra exitosa! Los productos ya van en camino!`,
        5
      );
      return result;
    } catch (e) {
      console.error("Error realizando la compra:", e);
      popup.init(
        `<i class="fa-solid fa-ban"></i>Algo salio mal en la compra. Intente mas tarde`
      );
      return {};
    }
  }

  async confirmSale() {
    if (this.countProducts() == 0) {
      popup.init(
        `<i class="fa-solid fa-cart-plus"></i>Ups! No hay productos en el carrito`
      );
      return false;
    }
    const infoProducts = {};
    for (const id in this.products) {
      const { quantity } = this.products[id];
      if (quantity >= 1) {
        infoProducts[id] = quantity;
      }
    }
    const query = new URLSearchParams(infoProducts);
    return await Modal.init("confirm/?" + query, this.setOpenModal);
  }

  async approvedSale(id) {
    return await Modal.init("approved/" + id);
  }

  setOpenModal = () => {
    this.body.classList.add("open-modal");
  };
}
