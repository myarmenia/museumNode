import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = async () => {
  const pool = mysql
    .createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      // ssl: true,
    })
    .promise();

  try {
    return pool;
  } catch (error) {
    console.error(error);
  }
};

export default connection;
