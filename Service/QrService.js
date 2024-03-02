import qr from "qrcode";
import generateAccessToken from "../Utils/Token.js";
import { pool, storeQrToDB} from "../Database/Controller.js";

const qrService = {
  getQr: async () => {
    try {
      const data = {
        email: "user@exame.ru",
      };

      const result = await pool.query(`SELECT * FROM token;`);

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
      }else{
       const uniq=await fetch("http://localhost:5006/api/getQr").then((res)=>{
        return res
       })
      }

 
      return uniqSlice;
    } catch (error) {
      console.error(error);
    }
  },
};

export default qrService;
