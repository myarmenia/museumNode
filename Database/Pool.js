import mysql from "mysql2";

const connection = async () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    // ssl: true,
  });

  try {
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.log("Error connection to DB", err.message);
          reject(err);
        } else {
          console.log("CONNECTED TO DB");
          resolve();
        }
      });
    });
    return connection;
  } catch (error) {
    console.error(error);
  }
};

export default connection;
