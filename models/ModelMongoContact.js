import ContactModel from "./ContactModel.js";
import DBMongoDB from "./DB/MongoDB.js";

export default class ModelMongoCart {
  ////////////////////////////////////////////////////////////////////////////////
  //                              CRUD - C: Create                              //
  ////////////////////////////////////////////////////////////////////////////////`

  async createContact(contact) {
    if (!(await DBMongoDB.connectDB())) {
      return {};
    }
    try {
      const newContact = new ContactModel(contact);
      await newContact.save();
      return newContact;
    } catch (e) {
      // console.error('error')
      console.error("Error al intentar de CREAR un contact:", e);
      return {};
    }
  }
}
