import express, { Router } from "express";
import qrController from "../Controller/QrController.js";
import path from "path";
import { fileURLToPath } from "url";
import { write, writeFileSync } from "fs";

const qrRouter = Router();
/**
 * @swagger
 * tags:
 *  name: QR
 *  description: QR Generate
 */

/**
 * @swagger
 *  /api/getQr:
 *    get:
 *      summary: QR
 *      tags: [QR]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/QR"
 */

qrRouter.get("/", qrController.getQr);

qrRouter.post("/file", async (req, res) => {
  const filePath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "..",
    "..",
    "var",
    "www",
    "text.txt"
  );
  writeFileSync(filePath, "sdfghjhgfdsadfghjhgfdsadfgh");
  console.log(filePath);
});

export default qrRouter;
