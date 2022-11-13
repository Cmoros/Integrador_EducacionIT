import Model from "../models/ModelMongoContact.js";

export default class CartApi {
  constructor() {
    this.model = new Model();
  }

  async postContact(contact) {
    return await this.model.createContact(contact);
  }
}
