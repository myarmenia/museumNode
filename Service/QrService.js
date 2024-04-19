import qr from "qrcode";
import {
  creatDatabase,
  createTable,
  pool,
  storeQrToDB,
  useDatabase,
} from "../Database/Controller.js";
import qrController from "../Service/QrService.js";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";





const qrService = {
  getQr: async (typeObj) => {
    try {
      // await creatDatabase()
      await useDatabase();
      // await createTable()
        
      const resultObj = {};

      for (const type in typeObj) {
        const resArray = [];
        for (let i = 0; i < typeObj[type]; i++) {
          const objByType = {};
          const data = {
            email: "user@exame.ru",
          };

          const result = await pool.query(`SELECT * FROM token;`);

          const unique_token = crypto
            .randomBytes(8)
            .toString("hex")
            .toUpperCase();
          const qr_path = `public/qr_images/${unique_token}.png`;
          // const qrfilePath = path.join(
          //   path.dirname(fileURLToPath(import.meta.url)),
          //   "..",
          //   "..",
          //   "image",
          //   `${unique_token}.png`
          // );

          const qrfilePath = path.join(
            path.dirname(fileURLToPath(import.meta.url)),
            "..",
            "..",
            "..",
            "var",
            "www",
            "museum.gorc-ka.am",
            "storage",
            "app",
            "public",
            "qr_images",
            `${unique_token}.png`
          );
          const find_pathdb = result[0].find((item) => {
            return item.unique_token === unique_token;
          });
          const find_uniqueIds = result[0].find((item) => {
            return item.qr_path === qr_path;
          });
          const stJson = JSON.stringify(data);
          const typeName = type;
          objByType.unique_token = unique_token;
          objByType.qr_path = qr_path;

          resArray.push(objByType);
          resultObj[typeName] = resArray;

          const qr_code = qr.toString(
            stJson,
            { type: "terminal" },
            async (err, code) => {
              if (err) {
                console.log(err);
              }
              if (!find_pathdb && !find_uniqueIds) {
               
                

                await qr.toFile(qrfilePath, `ԹԱՆԳԱՐԱՆԻ ՏՈՄՍ \n  ${unique_token}`, {
                  width:221,
                  height:221,
                  color: {
                    dark: "#000000", // Foreground color
                    light: "#FFFFFF", // Background color
                  },
                });

                await storeQrToDB(qr_path, unique_token);

                return unique_token;
              } else {
                const resultrec = await qrController.getQr();
                return resultrec;
              }
            }
          );
        }
      }

      return resultObj;
    } catch (error) {
      console.error(error);
    }
  },
};

export default qrService;
