import mysql from "mysql2";

const connection = async () => {
  const connection = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name,
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
    throw error;
  }
};

export default connection;
