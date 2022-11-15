import SaleApi from "../api/SaleApi.js";

export default class SaleController {
  constructor() {
    this.api = new SaleApi();
  }

  getTableSales = async (req, res, next) => {
    const { skip, limit } = req.query;
    const { format } = req.params;
    if (format == "json") {
      res.status(200).json(await this.api.getManySales(skip, limit));
    } else if (format == "text") {
      res
        .status(200)
        .render("salesTable", await this.api.getHTMLManySales({ skip, limit }));
    } else {
      next();
    }
  };

  async get404(req, res) {
    res.status(404).json({ message: "bad request", error: "true" });
  }

  postSale = async (req, res) => {
    const sale = req.body;
    const saleResult = await this.api.postSale(sale);
    if (Object.keys(saleResult).length == 0 || saleResult.error) {
      res.status(404).json({});
      return;
    }
    res.status(200).json(saleResult);
  };
}
