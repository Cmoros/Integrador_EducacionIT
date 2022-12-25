const PERSISTENCE_TYPE = {
  TYPE_MEM: "MEMORY",
  TYPE_FILE: "FILE SYSTEM",
  TYPE_MONGODB: "MONGODB",
};

export default {
  PORT: process.env.PORT || 8081,
  PERSISTENCE_TYPE: PERSISTENCE_TYPE.TYPE_MONGODB,
  MONGODB_CONNECTION_STR:
    "mongodb+srv://cmoros:ecommerce123@jcosmicadb.zrjnr6g.mongodb.net/ecommerce?retryWrites=true&w=majority",
  MONGODB_TIMEOUT: 2000,
  IMAGE_ROUTE_UPLOADS: "./img/productos/uploads/",
};
