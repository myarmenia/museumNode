import express, { Router } from "express";
import qrController from "../Controller/QrController.js";

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

qrRouter.get("/getQr", qrController.getQr);

export default qrRouter;
