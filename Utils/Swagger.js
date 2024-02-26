import { configDotenv } from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";

const dotenv = configDotenv();

export const options = {
  explorer: true,
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "QR",
      version: "1.0.0",
      description: "QR geterate API",
    },
    servers: [{ url: `http://localhost:${process.env.PORT}` }],
    components: {
      request: {
        QR: {
          type: "object",
          properties: {
            qr: { type: "string", description: "QR code" },
            uniqID: { type: "string", description: "UniqID" },
          },
          example: {
            qr: "65b358b558bb92966f212454",
            uniqID: "aEtjR-eb",
          },
        },
      },
      schemas: {
        QR: {
          type: "object",
          properties: {
            qr: { type: "string", description: "required" },
            uniqID: { type: "string", description: "required" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./Router/*.js"],
};

export const specs = swaggerJSDoc(options);
