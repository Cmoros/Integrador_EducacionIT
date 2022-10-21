import fs from "fs";

const PRODUCTS_FILE = "products.dat";
const CHARSET = "utf-8";

async function getNextProductId(products) {
  const nextId = products.length
    ? String(Number(products[products.length - 1].id) + 1)
    : "1";
  return nextId;
}

async function readFileProducts() {
  let products = [];
  try {
    const fileContent = await fs.promises.readFile(PRODUCTS_FILE, CHARSET);
    products = JSON.parse(fileContent);
  } catch (error) {
    console.error(error.message);
  }
  return products;
}

async function saveFileProducts(products) {
  await fs.promises.writeFile(
    PRODUCTS_FILE,
    JSON.stringify(products, null, "\t")
  );
}

export default class ModelFS {
  
  ////////////////////////////////////////////////////////////////////////////////
  //                                   CRUD                                     //
  ////////////////////////////////////////////////////////////////////////////////`

  ////////////////////////////////////////////////////////////////////////////////
  //                              CRUD - C: Create                              //
  ////////////////////////////////////////////////////////////////////////////////`
  async createProduct(product) {
    const products = await readFileProducts();
    product.id = getNextProductId(products);
    products.push(product);
    await saveFileProducts(products);
    return product;
  }

  ////////////////////////////////////////////////////////////////////////////////
  //                               CRUD - R: Read                               //
  ////////////////////////////////////////////////////////////////////////////////

  async readProducts() {
    const products = await readFileProducts();
    return products;
  }

  async readProduct(id) {
    const products = await readFileProducts();
    const product = products.find((product) => product.id === id) || {};
    return product;
  }

  ////////////////////////////////////////////////////////////////////////////////
  //                              CRUD - U: Update                              //
  ////////////////////////////////////////////////////////////////////////////////`

  async updateProduct(id, product) {
    const products = await readFileProducts();

    const index = products.findIndex((product) => product.id === id);
    if (index == -1) return {}
    product.id = id;
    products[index] = product;

    await saveFileProducts(products);
    return product;
  }

  ////////////////////////////////////////////////////////////////////////////////
  //                              CRUD - D: Delete                              //
  ////////////////////////////////////////////////////////////////////////////////

  async deleteProduct(id) {
    const products = await readFileProducts();

    const index = products.findIndex((product) => product.id === id);
    if (index == -1) return {}
    const removedProduct = products.splice(index, 1)[0];

    await saveFileProducts(products);
    return removedProduct;
  }
}
