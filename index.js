import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import swaggerUI from "swagger-ui-express";
import { specs } from "./Utils/Swagger.js";
import connection from "./Utils/Connection.js";
import qrRouter from "./Router/QrRouter.js";

const app = express();
const dotenv = config();
const conn = connection();
app.use(express.json());
app.use(cors());
app.use(
  "/api/swagger",
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true })
);

app.use("/api", qrRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
