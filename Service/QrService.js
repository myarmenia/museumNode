import qr from "qrcode";
import QrToken from "../Model/QrModel.js";
import generateAccessToken from "../Utils/Token.js";
import {
  creatDatabase,
  createTable,
  storeQrToDB,
  useDatabase,
} from "../Database/Controller.js";

const qrService = {
  getQr: async () => {
    try {
      const data = {
        email: "user@exame.ru",
      };
      const uniqToken = generateAccessToken();
      const startIndex = uniqToken.length - 8;
      const endIndex = uniqToken.length - 1;
      const uniqSlice = uniqToken.slice(startIndex, endIndex);
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
      await storeQrToDB(qr_code, uniqSlice);
    } catch (error) {
      console.error(error);
    }
  },
};

export default qrService;
