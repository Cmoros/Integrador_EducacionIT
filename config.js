const PERSISTENCE_TYPE = {
  TYPE_MEM: "MEMORY",
  TYPE_FILE: "FILE SYSTEM",
  TYPE_MONGODB: "MONGODB",
};

export default {
  PORT: process.env.PORT || 8081,
  PERSISTENCE_TYPE: PERSISTENCE_TYPE.TYPE_MONGODB,
  MONGODB_CONNECTION_STR: process.env.MONGO_ROUTE,
  MONGODB_TIMEOUT: 2000,
  IMAGE_ROUTE_UPLOADS: "./img/productos/uploads/",
};
