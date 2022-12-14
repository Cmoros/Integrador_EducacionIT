"use strict";

import express from "express";
import { create } from "express-handlebars";
import morgan from "morgan";
import cors from "cors";

import * as path from "path";
import { fileURLToPath } from "url";

import hbsConfig from "./hbsConfig.js";
import config from "./config.js";
import MainRouter from "./routers/MainRouter.js";
import PageRouter from "./routers/PageRouter.js";
import ProductRouter from "./routers/ProductRouter.js";
import SaleRouter from "./routers/SaleRouter.js";
import ContactRouter from "./routers/ContactRouter.js";
// import {} from "./models/DB/MongoDB.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const hbs = create(hbsConfig);

app.enable("view cache");

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.resolve(__dirname, "./views"));

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

const mainRouter = new MainRouter(app);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const productRouter = new ProductRouter(app);
export { productRouter };

const saleRouter = new SaleRouter(app);
export { saleRouter };

const contactRouter = new ContactRouter(app);

const pageRouter = new PageRouter(app);

app.get("/*", function getMain(req, res) {
  res.redirect("/#/404");
});

const server = app.listen(config.PORT, function appListen() {
  console.info(
    `Servidor iniciado en el http://localhost:${this.address().port}`
  );
});

server.on("error", (error) =>
  console.error(
    "Se produjo un error al intentar iniciar el servidor Express. Detalle: " +
      error.message
  )
);
