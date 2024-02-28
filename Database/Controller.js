import connection from "./Pool.js";
let pool;

(async () => {
  pool = await connection();
})();

export const createDatabase=async()=>{
    const results=await pool.query(
        `CREATE DATABASE museumQr;`
    )
}
export const useDatabase=async()=>{
    const results=await pool.query(
        `USE museumQr;`
    )
}

export const createTable = async () => {
  const results = await pool.query(
    `CREATE TABLE museumQr(
            id int AUTO_INCREMENT,
            qr varchar(500000) NOT NULL,
            uniqueId varchar(8) NOT NULL
        ) `
  );
};

export const storeQrToDB = async (qr, uniqueId) => {
  const results = await pool.query(
    `INSERT INTO museumQr(qr,uniqueId) VALUES('${qr}','${uniqueId}')`
  );
};

