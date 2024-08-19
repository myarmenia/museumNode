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
import moment from "moment";
import  timestamp  from "unix-timestamp"

const qrService = {
  getQr: async (typeObj) => {
    try {
      // await creatDatabase()
      await useDatabase();
      // await createTable()
      // const typeObj = { standart: 1, discount: 1 };
      const resultObj = {};
      const types = [
        "standart",
        "discount",
        "free",
        "event",
        "subscription",
        "united",
        "corporative",
        "educational",
        "event-config"
      ];

      const objectLength = Object.keys(typeObj).length;
      const findArray = [];

      for (const type in typeObj) {
        const findType = types.find((el) => {
          return el === type;
        });
        if (findType && typeof typeObj[type] === "number") {
          findArray.push(findType);
        }
      }
      if (findArray.length === objectLength) {
        for (const type in typeObj) {
          const resArray = [];
          for (let i = 0; i < typeObj[type]; i++) {
            const objByType = {};
            const data = {
              email: "user@exame.ru",
            };

            const result = await pool.query(`SELECT * FROM token;`);

            const uniq_token = crypto
              .randomBytes(7)
              .toString("hex")
              .toUpperCase();

            const unique_token = uniq_token;
            const qr_path = `public/qr_images/${unique_token}.png`;

            const qrfilePath = path.join(
              path.dirname(fileURLToPath(import.meta.url)),
              "..",
              "..",
              "..",
              "var",
              "www",
              "Museum",
              "storage",
              "app",
              "public",
              "qr_images",
              `${unique_token}.png`
            );

            // const qrfilePath = path.join(
            //   path.dirname(fileURLToPath(import.meta.url)),
            //   "..",
            //   "..",
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
                  // const timestamp = Date.now().toString();

                  // Create a SHA-256 hash object
                  const hash = crypto.createHash("sha256");

                  // Update the hash with the timestamp
                  hash.update(uniq_token);

                  // Generate the hash in hexadecimal format
                  const token = hash.digest("hex");
                  const now = moment();

                  const Time = now
                    .format("YYYY-MM-DD HH:mm:ss")
                    .split(" ")
                    .join("T");
                  console.log("specificDate", Time);

                  console.log("Time",Time);
                  
                  // Convert to Unix timestamp in seconds
                  const unixTimestamp = timestamp.fromDate(Time)

                  console.log("Specific Date Unix Timestamp:", unixTimestamp);

                  const qrToken = uniq_token + "#" + token + "#" + unixTimestamp;
                  console.log("SHA-256 Token:", token);

                  await qr.toFile(qrfilePath, qrToken, {
                    width: 221,
                    height: 221,
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
      } else {
        return { message: "wrong ticket type or number error" };
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default qrService;
