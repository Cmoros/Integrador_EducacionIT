const PERSISTENCE_TYPE = {
  TYPE_MEM: 'MEMORY',
  TYPE_FILE: 'FILE SYSTEM',
  TYPE_MONGODB: 'MONGODB',
};

export default {
  PORT: process.env.PORT || 8080,
  PERSISTENCE_TYPE: PERSISTENCE_TYPE.TYPE_MONGODB,
  // MONGODB_CONNECTION_STR: 'mongodb://localhost/ecommerce',
  // MONGODB_CONNECTION_STR: "mongodb://localhost:27017/ecommerce",
  // MONGODB_CONNECTION_STR: 'mongodb+srv://juanromeroclases:HolaHola123@cluster0.5wxsavc.mongodb.net/ecommerce?retryWrites=true&w=majority',
  MONGODB_CONNECTION_STR: "mongodb+srv://cmoros:ecommerce123@jcosmicadb.zrjnr6g.mongodb.net/ecommerce?retryWrites=true&w=majority",
  MONGODB_TIMEOUT: 2000,
  IMAGE_ROUTE: './img/productos/'
};