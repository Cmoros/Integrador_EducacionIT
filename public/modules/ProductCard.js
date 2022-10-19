

export default class ProductCard {
  constructor(productObj) {
    this.product = productObj;
    this.createProductCard();
    this.favoriteButton = this.productCardHTML.querySelector(".card__favorite");
    this.favoriteButton.addEventListener("click", (e) => {
      console.log(e.currentTarget);
      this.favoriteButton.classList.toggle("card__favorite--selected");
      e.preventDefault();
    });
    // document.addEventListener('click', e => console.log(e.currentTarget))
  } 
  
  createProductCard() {
    this.productCardHTML = document.createElement("div");
    this.productCardHTML.classList.add("card");
    let imageFilePath;
    if (this.product.imageFileName) {
      imageFilePath = `/image/products/${this.product.imageFileName}`;
    } else {
      imageFilePath = this.product.profileImageUrl;
    }

    // const textToCompile = fetch('./templates/card').then(res => res.text());
    // const template = Handlebars.compile(textToCompile);
    // const resultText = template({...this.product, imageFilePath});
    // this.productCardHTML.innerHTML = resultText;

    this.productCardHTML.innerHTML = `
    <a href="#" class="card__link-add" data-id="${this.product.id}">Agregar</a>
    <article class="card__article">
      <div class="card__image-container">
        <button class="card__favorite">
        <svg height="24" width="24" version="1.1">
        <g transform="translate(0 -1028.4)">
         <path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" fill="#e74c3c"></path>
        </g>
       </svg>
        </button>
        <a class="card__image-link" href="#">
          <img class="card__image" src="${imageFilePath}" alt="${this.product.name}">
        </a>
      </div>
      <div class="card__content">
        <h3 class="card__heading">
          ${this.product.name}
        </h3>
        <div class="card__price-container">
        <p class="card__price">${this.product.price}</p>
        </div>
        <div class="card__description">
          <p class="card__description-short">
            ${this.product.shortDescription}
          </p>
        </div>
      </div>
    </article>
    `;
    return this.productCardHTML;
  }
}
