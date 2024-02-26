import qrService from "../Service/QrService.js";

const qrController = {
  getQr: async (req, res) => {
    try {
      const qr_generate = await qrService.getQr();
      res.status(200).send(qr_generate);
    } catch (error) {
      console.error(error)
    } // error handling mi moraci
  },
};

export default qrController;
