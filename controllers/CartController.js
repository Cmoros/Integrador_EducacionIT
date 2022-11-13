import CartApi from "../api/CartApi.js";

export default class CartController {
  constructor() {
    this.api = new CartApi();
  }

  postCart = async (req, res) => {
    const sale = req.body;
    console.log(sale);
    const saleResult = await this.api.postCart(sale);
    if (Object.keys(saleResult).length == 0 || saleResult.error) {
      res.status(404).json({});
      return;
    }
    res.status(200).json(saleResult);
  };
}
