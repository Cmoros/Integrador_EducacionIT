export default class Product {
  static productQuantity = 0;
  constructor(obj) {
    this.id = Product.productQuantity++;
    this.name = obj.name;
    this.price = obj.price;
    this.stock = obj.stock;
    this.brand = obj.brand;
    this.category = obj.category;
    this.minAge = obj.minAge;
    this.maxAge = obj.maxAge;
    this.profileImageUrl = obj.profileImageUrl;
    this.imagesUrls = obj.imagesUrls || [{imageUrl: obj.profileImageUrl},{imageUrl: obj.profileImageUrl},{imageUrl: "https://http2.mlstatic.com/D_NQ_NP_811576-MLA46847351192_072021-O.webp"}];
    this.shipping = obj.shipping || false;
    this.shortDescription = obj.shortDescription;
    this.longDescription = obj.longDescription || "";
    this.visits = obj.visits || 0;
    this.date = obj.date || new Date();
    this.sponsored = obj.sponsored
  }

  getInfoCart() {
    return {
      id: this.id,
      price: this.price,
      // imageFileName: this.profileImageUrl.split("/").slice(-1).join()
      profileImageUrl: this.profileImageUrl,
      name: this.name,
      stock: this.stock,
      // quantity: 0
    };
  }

  getInfoCard() {
    return {
      id: this.id,
      price: this.price,
      // imageFileName: this.profileImageUrl.split("/").slice(-1).join(''),
      profileImageUrl: this.profileImageUrl,
      name: this.name,
      shortDescription: this.shortDescription,
    };
  }
}
