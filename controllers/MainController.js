import MainApi from "../api/MainApi.js";

export default class MainController {
  constructor() {
    console.log('MainController', this instanceof MainController)
    this.api = new MainApi();
  }

  getMain = async (req, res) => {
    console.log('MainController', this instanceof MainController)
    res.render("main", await this.api.getHomePage())
  }
}