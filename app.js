"use strict";

import express from "express";
// import { engine } from "express-handlebars";
import { create } from "express-handlebars";

import * as path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import MainRouter from "./routers/MainRouter.js";
import PageRouter from "./routers/PageRouter.js";
import ProductRouter from "./routers/productRouter.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = "./views";
async function getFilesNames(dir, ext = "", exceptions = new Set()) {
  const files = await fs.promises.readdir(dir);
  return files.filter((file) => file.includes(ext) && !exceptions.has(file));
}
const exceptionsHbsFiles = new Set(["main.hbs", "404.hbs"]);
export const hbsFiles = await getFilesNames(
  dir,
  ".hbs",
  exceptionsHbsFiles
).then((files) => {
  return new Set(files.map((file) => file.split(".hbs")[0]));
});

const app = express();
const hbs = create({
  partialsDir: ["views/partials/"],
  extname: ".hbs",
  helpers: {
    // Function to do basic mathematical operation in handlebar
    math: function (lvalue, operator, rvalue) {
      lvalue = parseFloat(lvalue);
      rvalue = parseFloat(rvalue);
      return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue,
      }[operator];
    },
  },
});

app.enable("view cache");
// app.engine(".hbs", engine({ extname: ".hbs" }));

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.resolve(__dirname, "./views"));

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("*", (req, res, next) => {
  console.log("req.url get", req.url);
  next();
});

app.post("*", (req, res, next) => {
  console.log("req.url post", req.url);
  next();
});

const mainRouter = new MainRouter(app);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const productRouter = new ProductRouter(app);

export {productRouter}

const pageRouter = new PageRouter(app);

app.get("/*", function getMain(req, res) {
  res.redirect("/#/404");
});

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
