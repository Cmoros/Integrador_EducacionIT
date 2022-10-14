export default class Product {
  static productQuantity = 0;
  constructor(
    name,
    price,
    stock,
    brand,
    category,
    minAge,
    maxAge,
    profileImageUrl,
    imagesUrls,
    shipping,
    shortDescription,
    longDescription = ""
  ) {
    this.id = Product.productQuantity++;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.brand = brand
    this.category = category;
    this.minAge = minAge;
    this.maxAge = maxAge;
    this.profileImageUrl = profileImageUrl;
    this.imagesUrls = imagesUrls;
    this.shipping = shipping;
    this.shortDescription = shortDescription;
    this.longDescription = longDescription;

  }

}
