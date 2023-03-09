const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Zelda Api",
    description:
      "An API built about the Zelda game that started it all. Uses CRUD operations on a MongoDB collection. To start, this API only deals with the equipment Link aquires throughout the game",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
