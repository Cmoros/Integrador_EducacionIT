import MainApi from "../api/MainApi.js";

export default class MainController {
  constructor() {
    this.api = new MainApi();
  }

  getMain = async (req, res) => {
    res.render("main", await this.api.getHomePage());
  };
}
