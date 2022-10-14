export default class Products {
  constructor(productArray) {
    
    this.products = productArray;

    
  }
  getAll() {
    return this.products;
  }
  getById(id) {
    return this.products.find((product) => product.id === id);
  }
  create(product) {
    this.products.push(product);
  }
  update(id, product) {
    const index = this.products.findIndex((product) => product.id === id);
    this.products[index] = product;
  }
  delete(id) {
    this.products = this.products.filter((product) => product.id !== id);
  }
}