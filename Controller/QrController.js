import qrService from "../Service/QrService.js";

const qrController = {
  getQr: async (req, res) => {
    try {
      const qr_generate = await qrService.getQr();
      console.log("qr_generate? UNIQUESLICE =>", qr_generate);
      res.status(200).send(qr_generate);
    } catch (error) {
      console.error(error);
    }
  },
};

export default qrController;
