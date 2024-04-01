import qr from "qrcode";
import { creatDatabase, createTable, pool, storeQrToDB, useDatabase } from "../Database/Controller.js";
import qrController from "../Service/QrService.js";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const qrService = {
  getQr: async (dataObj) => {
    try {
      //     const arr=await  fetch('https://api.example.com/data', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // Add any other headers as needed
      //   },
      //   body: JSON.stringify({
      //     key1: 'value1',
      //     key2: 'value2'
      //     // Add any other data to be sent in the request body
      //   })
      // })
      //   .then(response => {
      //     if (!response.ok) {
      //       throw new Error('Network response was not ok');
      //     }
      //     return response.json();
      //   })
      //   .then(data => {
      //     console.log(data);
      //   })
      //   .catch(error => {
      //     console.error('There was a problem with your fetch operation:', error);
      //   });

      // await creatDatabase()
      await useDatabase()
      // await createTable()
      // const arr = { standart: 2,discount: 3,united:2,product:3,subscription:2};
      const resultObj = {};
     
        
      for (const type in dataObj) {
        const resArray = [];
        for (let i = 0; i < dataObj[type]; i++) {
          const objByType={}
          const data = {
            email: "user@exame.ru",
          };
        
          const result = await pool.query(`SELECT * FROM token;`);

          const unique_token = crypto
            .randomBytes(8)
            .toString("hex")
            .toUpperCase();
          const qr_path = `public/qr_images/${unique_token}.png`;
          const qrfilePath = path.join(
            path.dirname(fileURLToPath(import.meta.url)),
            "..",
            "..",
            "image",
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
          const typeName = type;
          objByType.unique_token = unique_token;
          objByType.qr_path = qr_path;
          
          resArray.push(objByType);
          resultObj[typeName]=resArray
          
          
          const qr_code = qr.toString(
            stJson,
            { type: "terminal" },
            async (err, code) => {
              if (err) {
                console.log(err);
              }
              if (!find_pathdb && !find_uniqueIds) {
                let foregroundColor;
                let backgroundColor;
                if (type === "standart") {
                  foregroundColor = "#000000"; // Black
                  backgroundColor = "#FFFFFF";
                }
                if (type  === "discount") {
                  foregroundColor = "#863827"; // Black
                  backgroundColor = "#FFFFFF";
                }
                if(type === "united"){
                  foregroundColor = "#9E8D89"; // Black
                  backgroundColor = "#FFFFFF";
                }
                if(type === "product"){
                  foregroundColor = "#4BB83A"; // Black
                  backgroundColor = "#FFFFFF";
                }
                if(type === "subscription"){
                  foregroundColor = "#3A71B8"; // Black
                  backgroundColor = "#FFFFFF";
                }

                await qr.toFile(qrfilePath, unique_token, {
                  color: {
                    dark: foregroundColor, // Foreground color
                    light: backgroundColor, // Background color
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
