import qr from "qrcode";
import generateAccessToken from "../Utils/Token.js";
import { pool, storeQrToDB } from "../Database/Controller.js";
import qrController from "../Service/QrService.js";
import crypto from "crypto"



const qrService = {
  getQr: async () => {
    try {
      const data = {
        email: "user@exame.ru",
      };

      const result = await pool.query(`SELECT * FROM token;`);
      
      const uniqueToken=crypto.randomBytes(8).toString("hex").toUpperCase()
      const find_indb = result[0].find((item) => {
        return item.unique_id === uniqueToken;
      });
      const stJson = JSON.stringify(data);
      const qr_code = qr.toString(
        stJson,
        { type: "terminal" },
        async (err, code) => {
          if (err) {
            console.log(err);
          }
          return code;
        }
      );

      if (!find_indb) {
        await storeQrToDB(qr_code, uniqueToken);
        return uniqueToken;
      } else {
        const resultrec = await qrController.getQr();
        
        return resultrec;
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default qrService;
