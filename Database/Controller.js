import connection from "./Pool.js";
let pool;


  pool = await connection();


export const creatDatabase=async()=>{
  const result = await pool.query(`CREATE DATABASE map`)
}


export const useDatabase = async () => {
  const results = await pool.query(`USE qr;`);
};



export const createTable = async () => {
  const results = await pool.query(
    `CREATE TABLE museumQr(
      id int AUTO_INCREMENT,
      qr BLOB NOT NULL,
      uniqueId varchar(8) NOT NULL,
      PRIMARY KEY (id)
  )`);
};

export const storeQrToDB = async (qr, uniqueId) => {
  const results = await pool.query(
    `INSERT INTO museumQr(qr,uniqueId) VALUES('${qr}','${uniqueId}')`
  );
};
