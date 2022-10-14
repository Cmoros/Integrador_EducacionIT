import express from "express";
// import { engine } from "express-handlebars";
import { create } from "express-handlebars"; 

import * as path from 'path';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const hbs = create({
  partialsDir: [
    "views/partials/"
  ],
  extname: ".hbs"
})

app.enable('view cache');
// app.engine(".hbs", engine({ extname: ".hbs" }));

app.engine(".hbs", hbs.engine)
app.set("view engine", ".hbs");
app.set("views", path.resolve(__dirname, "./views"));

app.use(express.json());
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  console.log("req.url", req.url);
  next();
});


app.get("/#test", (req, res) => {
  res.send('<h1>Home</h1>');
});

app.get("/", function getMain(req, res) {
  // res.redirect("/#test");
  res.render("home", {title: "Inicio"});
});

app.get("/alta", function getAlta(req, res) {
  res.render("alta", {title: "Alta"});
})

app.get("/nosotros", function getNosotros(req, res) {
  res.render("nosotros", {title: "Nosotros"});
})

app.get("/contacto", function getContacto(req, res) {
  res.render("contacto", {title: "Contacto"});
})

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
