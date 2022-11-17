import ContactApi from "../api/ContactApi.js";

export default class ContactController {
  constructor() {
    this.api = new ContactApi();
  }

  postContact = async (req, res) => {
    const contact = req.body;
    const contactResult = await this.api.postContact(contact);
    if (Object.keys(contactResult).length == 0 || contactResult.error) {
      res.status(404).json({});
      return;
    }
    res.status(200).json(contactResult);
  };
}
