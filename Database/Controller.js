import connection from "./Pool.js";
let pool;

pool = await connection();

async function getNotes() {
  const [row] = await pool.query("SELECT * FROM museumQr");
  return row;
}

const notes = await getNotes();
console.log(notes);
export const creatDatabase = async () => {
  const result = await pool.query(`CREATE DATABASE qr`);
};

export const useDatabase = async () => {
  const results = await pool.query(`USE qr;`);
};

useDatabase();

export const createTable = async () => {
  const results = await pool.query(
    `CREATE TABLE museumQr(
      id int AUTO_INCREMENT,
      qr BLOB NOT NULL,
      uniqueId varchar(8) NOT NULL,
      PRIMARY KEY (id)
  )`
  );
};
// createTable()

export const storeQrToDB = async (qr, uniqueId) => {
  console.log("aaa");
  const results = await pool.query(
    `INSERT INTO museumQr(qr,uniqueId) VALUES('${qr}','${uniqueId}')`
  );
};
