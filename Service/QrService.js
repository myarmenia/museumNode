import qr from "qrcode";
import { pool, storeQrToDB } from "../Database/Controller.js";
import qrController from "../Service/QrService.js";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import { write, writeFileSync } from "fs";

const qrService = {
  getQr: async () => {
    try {
      const data = {
        email: "user@exame.ru",
      };

      const result = await pool.query(`SELECT * FROM token;`);

      const unique_token = crypto.randomBytes(8).toString("hex").toUpperCase();
      const qr_path = `public/qr_images/${unique_token}.png`;
      const qrfilePath = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "..",
        "..",
        `${unique_token}.png`
      );
      // const qrfilePath = path.join(
      //   path.dirname(fileURLToPath(import.meta.url)),
      //   "..",
      //   "..",
      //   "..",
      //   "var",
      //   "www",
      //   "museum.gorc-ka.am",
      //   "storage",
      //   "app",
      //   "public",
      //   "qr_images",
      //   `${unique_token}.png`
      // );
      const find_pathdb = result[0].find((item) => {
        return item.unique_token === unique_token;
      });
      const find_uniqueIds = result[0].find((item) => {
        return item.qr_path === qr_path;
      });
      const stJson = JSON.stringify(data);
      const qr_code = qr.toString(
        stJson,
        { type: "terminal" },
        async (err, code) => {
          if (err) {
            console.log(err);
          }
          if (!find_pathdb && !find_uniqueIds) {
            await qr.toFile(qrfilePath, unique_token);

            await storeQrToDB(qr_path, unique_token);

            return unique_token;
          } else {
            const resultrec = await qrController.getQr();
            return resultrec;
          }
        }
      );

      return unique_token;
    } catch (error) {
      console.error(error);
    }
  },
};

export default qrService;
