import Product from "../src/Product.js";
import Inventory from "../src/Inventory.js";

const inventory = new Inventory([
  new Product({
    name: "Pelota Nro 2 Infantil",
    price: 1580,
    stock: 10,
    brand: "Nike",
    category: "JUEGOS DE PLAZA Y AIRE LIBRE",
    minAge: "3-6 Años",
    maxAge: "Adultos",
    profileImageUrl: "/img/productos/pelotainfantil2.webp",
    shipping: false,
    shortDescription: "Compeusta de PVC de 480mm",
    sponsored: true,
  }),
  new Product({
    name: "Auto De Policía A Radio Control",
    price: 2609,
    stock: 7,
    brand: "Yifeng",
    category: "VEHÍCULOS DE JUGUETE",
    minAge: "3-6 Años",
    maxAge: "9-12 Años",
    profileImageUrl: "/img/productos/autodepolicia.webp",
    shipping: false,
    shortDescription: "Marca: Yifeng. Edad mínima recomendada: 3 años",
    sponsored: true,
  }),
  //
  new Product({
    name: "Reloj Infantil De Spiderman",
    price: 1999,
    stock: 12,
    brand: "Marvel",
    category: "ELECTRÓNICOS PARA NIÑOS",
    minAge: "6-9 Años",
    maxAge: "9-12 Años",
    profileImageUrl: "/img/productos/reloj_spiderman.webp",
    shipping: false,
    shortDescription: "Correa ajustable. Proyecta 24 imágenes diferente. Hora digital",
    sponsored: true,
  }),
  //
  new Product({
    name: "Juego de mesa Croky attack",
    price: 2570,
    stock: 5,
    brand: "Ditoys",
    category: "JUEGOS DE MESA",
    minAge: "3-6 Años",
    maxAge: "9-12 Años",
    profileImageUrl: "/img/productos/crocky_attack.webp",
    shipping: false,
    shortDescription: "Marca Ditoys. Edad recomendada: 6 años. Estimula el ingenio.",
    sponsored: true,
  }),

  //
  new Product({
    name: "Teclado Musical Infantil",
    price: 6489,
    stock: 7,
    brand: "NEWVISION",
    category: "INSTRUMENTOS MUSICALES",
    minAge: "6-9 Años",
    maxAge: "9-12 Años",
    profileImageUrl: "/img/productos/teclado_musical.webp",
    shipping: false,
    shortDescription: "Marca NEWVISION. Dispone de 37 teclas, 8 tonos, 8 ritmos y más",
    sponsored: false,
    visits: 25
  }),

  new Product({
    name: "Ukelele Soprano Infantil",
    price: 3499,
    stock: 20,
    brand: "Yamaha",
    category: "INSTRUMENTOS MUSICALES",
    minAge: "6-9 Años",
    maxAge: "Adolescentes",
    profileImageUrl: "/img/productos/ukelele_infantil.webp",
    shipping: false,
    shortDescription: "Ukelele madera soprano infantil, importado de primera calidad",
    sponsored: false,
    visits: 10
  }),

  new Product({
    name: "Dinosaurio Tiranosaurio Rex",
    price: 5499,
    stock: 25,
    brand: "Lyon Toys",
    category: "MUÑECOS Y MUÑECAS",
    minAge: "3-6 Años",
    maxAge: "9-12 Años",
    profileImageUrl: "/img/productos/dinosaurio_pone_huevos.webp",
    shipping: false,
    shortDescription: "Dinosaurio camina ,emite sonido,luces y pone huevos. Lyon Toys",
    sponsored: false,
    visits: 15
  }),

  new Product({
    name: "Walkie Talkie Handy",
    price: 3999,
    stock: 12,
    brand: "Baofeng",
    category: "ELECTRÓNICOS PARA NIÑOS",
    minAge: "3-6 Años",
    maxAge: "9-12 Años",
    profileImageUrl: "/img/productos/walkie_talkie_baofang.webp",
    shipping: false,
    shortDescription: "Kit x 2 handies Baofeng. 16 Canales. Frecuencia 400 - 470 Mhz",
    sponsored: false,
    visits: 20
  }),
  new Product({
    name: "Cactus Juguete Bailarin",
    price: 5604,
    stock: 10,
    brand: "Lyon Toys",
    category: "MUÑECOS Y MUÑECAS",
    minAge: "6-12 Meses",
    maxAge: "1-3 Años",
    profileImageUrl: "/img/productos/pato_bailarin.webp",
    shipping: false,
    shortDescription: "Cactus de juguete peluche bailarín electronico interactivo",
    sponsored: false,
    date: new Date("2023-05-01"),
  }),
  new Product({
    name: "Robot Bailarin Gira 360",
    price: 6500,
    stock: 10,
    brand: "Naughty",
    category: "ELECTRÓNICOS PARA NIÑOS",
    minAge: "1-3 Años",
    maxAge: "3-6 Años",
    profileImageUrl: "/img/productos/robot_bailarin.webp",
    shipping: false,
    shortDescription: "Robot bailarin “Naughty” Con luces y música, movimientos continuos",
    sponsored: false,
    date: new Date("2023-06-02"),
  }),new Product({
    name: "Juguete Fidget Spiner",
    price: 299,
    stock: 30,
    brand: "Fidget",
    category: "PUZZLES",
    minAge: "6-9 Años",
    maxAge: "Adultos",
    profileImageUrl: "/img/productos/fidget_spiner.webp",
    shipping: false,
    shortDescription: "Fidget Spiner Anti-estrés. Marca Spinner. Para niños y adultos",
    sponsored: false,
    date: new Date("2023-07-03"),
  }),
  new Product({
    name: "Pista De Carreras Chicco",
    price: 23749,
    stock: 5,
    brand: "Chicco",
    category: "VEHÍCULOS DE JUGUETE",
    minAge: "1-3 Años",
    maxAge: "3-6 Años",
    profileImageUrl: "/img/productos/pista_carrera_bunny_toys.webp",
    shipping: false,
    shortDescription: "Pista De Carreras Para Niños De 2 Años Chicco Bunny Toys",
    sponsored: false,
    date: new Date("2023-08-04"),
  }),
  ]
)

export default inventory
