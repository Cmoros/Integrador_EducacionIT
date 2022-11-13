export default class Product {
  static productQuantity = 0;
  constructor(obj) {
    this.id = Product.productQuantity++;
    this.name = obj.name;
    this.price = obj.price;
    this.stock = obj.stock;
    this.brand = obj.brand;
    this.category = obj.category;
    this.typeAge = obj.typeAge || "Y";
    this.minAge = obj.minAge;
    this.maxAge = obj.maxAge;
    this.profileImageUrl = obj.profileImageUrl;
    if (obj.imagesUrls) {
      this.imagesUrls = obj.imagesUrls.reduce((acc, image) => {
        acc.push({ imageUrl: image });
        return acc;
      }, []);
    } else {
      this.imagesUrls = [];
    }
    this.shipping = obj.shipping || "false";
    this.shortDescription = obj.shortDescription;
    this.longDescription = obj.longDescription || "";
    this.visits = obj.visits || 0;
    this.date = obj.date || new Date();
    this.sponsored = obj.sponsored || false;
  }
}
