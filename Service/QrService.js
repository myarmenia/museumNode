import qr from "qrcode";
import QrToken from "../Model/QrModel.js";
import generateAccessToken from "../Utils/Token.js";

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
      const searchQr = await QrToken.findOne({
        uniqueId: uniqSlice,
      });

      if (!searchQr) {
        const qrdata = new QrToken({
          qr: qr_code,
          uniqueId: uniqSlice,
        });
        await qrdata.save();
        return uniqSlice;
      } else {
        return { message: "uniqToken repeated" };
      }
    } catch (error) {
      console.error(error)
    }
  },
};

export default qrService;
