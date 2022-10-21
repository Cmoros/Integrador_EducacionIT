"use strict";

import express from "express";
// import { engine } from "express-handlebars";
import { create } from "express-handlebars";
import inventory from "./db/inventory.js";

import * as path from "path";
import { fileURLToPath } from "url";
import fs from "fs";



const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = "./views";
async function getFilesNames(dir, ext = "", exceptions = new Set()) {
  const files = await fs.promises.readdir(dir);
  return files.filter((file) => file.includes(ext) && !exceptions.has(file));
}
const exceptionsHbsFiles = new Set(["main.hbs", "404.hbs"]);
export const hbsFiles = await getFilesNames(dir, ".hbs", exceptionsHbsFiles).then(
  (files) => {
    return new Set(files.map((file) => file.split(".hbs")[0]));
  }
);



const app = express();
const hbs = create({
  partialsDir: ["views/partials/"],
  extname: ".hbs",
  helpers:{
    // Function to do basic mathematical operation in handlebar
    math: function(lvalue, operator, rvalue) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    }}
});



app.enable("view cache");
// app.engine(".hbs", engine({ extname: ".hbs" }));

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.resolve(__dirname, "./views"));



app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("*", (req, res, next) => {
  console.log("req.url get", req.url);
  next();
});

app.post("*", (req, res, next) => {
  console.log("req.url", req.url);
  console.log("req.body",req.body);
  next();
});


app.get("/", function getMain(req, res) {
  // res.redirect("/#test");
  res.render("main", { title: "Inicio", layout: false });
});

// app.get("/#/404", (req, res) => {
//   res.status(404).render("404", { title: "Inicio", layout: false});
// })

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/text/page/home", (req, res) => {
  const sponsoredCards = inventory.getSponsored(4);
  const popularCards = inventory.getMostVisited(4);
  const newCards = inventory.getNewest(4);
  res.render("home", { layout: false, sponsoredCards, popularCards, newCards });
});

app.get("/api/text/page/:page", (req, res, next) => {
  const page = req.params.page;
  if (hbsFiles.has(page)) {
    res.render(page, { layout: false });
  } else {
    next();
  }
});

app.get("/api/text/page/*", (req, res) => {
  res
    .status(404)
    .render("404", { title: "Pagina no encontrada", layout: false });
});

app.get("/api/json/products", (req, res) => {
  res.json(inventory.getAll());
});

app.get("/api/text/product/:id/cart", (req, res) => {
  const {id} = req.params;
  const product = {...inventory.getById(id), quantity: 1};
  const products = [product];
  console.log(products)
  res.render('productsCart', {products, layout:false});
});

app.post("/api/text/products/cart", (req, res) => {
  const products = req.body;
  res.render('productsCart', {products, layout:false});
});

app.get("/api/json/product/:id/:format?", (req, res) => {
  const { id, format } = req.params;
  const product = inventory.getById(id);

  if (product) {
    if (format == "cart") {
      res.json(product.getInfoCart());
    } else if (format == "card") {
      res.json(product.getInfoCard());
    } else {
      res.json(product);
    }
  } else {
    res.status(404).json({ message: "Product not found", error: true });
  }
});

app.post("/api/json/product", (req, res) => {
  const {product} = req.body;
  console.log(product)
  inventory.create(product);
  res.json(product);
});

app.put("/api/json/product/:id", (req, res) => {
  const id = req.params.id;
  const product = req.body;
  inventory.update(id, product);
  res.json(product);
});

app.delete("/api/json/product/:id", (req, res) => {
  const id = req.params.id;
  inventory.delete(id);
  res.json({ message: "Product deleted" });
});

app.get("/api/json/products/sponsored", (req, res) => {
  res.json(inventory.getSponsored());
});

app.get("/api/json/products/popular", (req, res) => {
  const quantity = req.query.quantity || 4;
  res.json(inventory.getMostVisited(quantity));
});

app.get("/api/json/products/newest", (req, res) => {
  const quantity = req.query.quantity || 4;
  res.json(inventory.getNewest(quantity));
});

app.get("/api/json/*", (req, res) => {
  res.json({ message: "Recurso no encontrado" });
});

app.get("/*", function getMain(req, res) {
  res.redirect("/#/404");
  // res.status(404).render("404", { title: "404 - Juguetería Cósmica"});
});

// app.get("/#/*", function getMain(req, res) {
//   res.redirect("/#/404");
//   // res.status(404).render("404", { title: "404 - Juguetería Cósmica"});
// });

const PORT = 1234;

const server = app.listen(PORT, function appListen() {
  console.log(
    `Servidor iniciado en el http://localhost:${this.address().port}`
  );
});

server.on("error", (error) =>
  console.error(
    "Se produjo un error al intentar iniciar el servidor Express. Detalle: " +
      error.message
  )
);
