import qr from "qrcode";
import generateAccessToken from "../Utils/Token.js";
import { pool, storeQrToDB } from "../Database/Controller.js";
import qrController from "../Service/QrService.js";

const qrService = {
  getQr: async () => {
    try {
      const data = {
        email: "user@exame.ru",
      };

      const result = await pool.query(`SELECT * FROM token;`);

      // crypto.randomBytes(4).toString("hex").toUpperCase()

      const uniqToken = generateAccessToken();
      const startIndex = uniqToken.length - 17;
      const endIndex = uniqToken.length - 1;
      const uniqSlice = uniqToken.slice(startIndex, endIndex);
      const find_indb = result[0].find((item) => {
        return item.unique_id === uniqSlice;
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
        await storeQrToDB(qr_code, uniqSlice);
        console.log("qr_code, uniqSlice ====> ", qr_code, uniqSlice);
        return uniqSlice;
      } else {
        const result = await qrController.getQr();
        console.log("result ====> ", result);
        return result;
        //  const uniq=await fetch("http://localhost:5006/api/getQr").then((res)=>{
        //   return res
        //  })
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default qrService;
