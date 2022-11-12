import Cart from "/modules/Cart.js";

const searchForm = document.querySelector(".search-form");
const searchFormLabel = searchForm.querySelector(".search-form__label");
const searchFormInput = searchForm.querySelector(".search-form__input");
const searchFormSubmit = searchForm.querySelector(".search-form__submit");
const searchFormToggle = document.querySelector(".main-nav-search-form-toggle");

function disableEmptyForm(input, submit) {
  if (input.value === "") {
    submit.style.pointerEvents = "none";
  } else {
    submit.style.pointerEvents = "auto";
  }
}

function toggleForOfLabelSearchForm(bool = true) {
  if (searchFormToggle.checked === bool) {
    searchFormLabel.removeAttribute("for");
  } else {
    searchFormLabel.setAttribute("for", "search-form__input");
  }
}

disableEmptyForm(searchFormInput, searchFormSubmit);

searchFormInput.addEventListener("input", (e) => {
  disableEmptyForm(e.target, searchFormSubmit);
});

searchFormLabel.addEventListener("click", (e) => {
  searchFormToggle.checked = true;
});

searchFormInput.addEventListener("focusout", (e) => {
  if (e.target.value === "") {
    searchFormToggle.checked = false;
  }
  searchFormInput.blur();
});

const topMessage = document.querySelector(".message-container");
const mainHeader = document.querySelector(".main-header");
const body = document.querySelector("body");

document.addEventListener("scroll", (e) => {
  if (scrollY !== 0) {
    mainHeader.style.top = 0;
    // body.style.paddingTop = getComputedStyle(topMessage).height;
  } else {
    mainHeader.style.top = "";
    // body.style.padding = "";
  }
});

const mainNavToggle = document.querySelector(".main-nav-toggle");

document.addEventListener("click", function delegateClickEvents(e) {
  if (
    e.target.classList.contains("main-nav__link") ||
    e.target.classList.contains("main-header__logo-container")
  ) {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    mainNavToggle.checked = false;
    cart.toggleCartModal("hide");
  }
});

const cartCheckboxToggle = document.querySelector(".cart-modal-toggle");
const cartButton = document.querySelector(".cart-button");
const cartWindow = document.querySelector(".cart-window");

export const cart = new Cart(cartCheckboxToggle, cartButton, cartWindow);

document.addEventListener("input", (e) => {
  if (e.target == cart.cartCheckboxToggle) {
    mainNavToggle.checked = false;
    cart.toggleCartModal("show");
    return;
  }
  if (e.target == mainNavToggle) {
    cart.toggleCartModal();
  }
});

window.addEventListener("hashchange", (e) => {
  cart.toggleCartModal("hide");
});

let query = "";

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  query = searchFormInput.value;
  if (location.hash != "#/listado") {
    location.hash = "/listado";
  } else {
    const { currentPage } = await import("./main.js");
    currentPage[0].init();
  }
});

export { query };

// const mainNavList = document.querySelector(".main-nav__list");
// const mainNavLinks = mainNavList.querySelectorAll(".main-nav__link");

// function updateNavBar() {
//   const possiblesLocations = [
//     "",
//     "alta",
//     "contacto",
//     "nosotros",
//   ];
//   const HTMLCompleteLocation = window.location.href.split("/");
//   const HTMLActualPage = HTMLCompleteLocation[HTMLCompleteLocation.length - 1];
//   const index = possiblesLocations.indexOf(HTMLActualPage);
//   // if (index < 0) {
//   //     window.location.href += "index.html";
//   //     return;
//   // }

//   updateNavList(index);
// }

// function updateNavList(index) {
//   for (let i = 0; i < mainNavLinks.length; i++) {
//     if (i === index) {
//       mainNavLinks[i].classList.add("actual-page");
//     } else {
//       mainNavLinks[i].classList.remove("actual-page");
//     }
//   }
// }

// updateNavBar();
