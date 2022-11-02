export default {
  PORT: process.env.PORT || 1234,
  PERSISTENCE_TYPE: "MONGODB",
  // MONGODB_CONNECTION_SRT: 'mongodb://localhost/ecommerce',
  MONGODB_CONNECTION_SRT: "mongodb://localhost:27017/ecommerce",
  MONGODB_TIMEOUT: 2000,
};
