// lib/db.js
import mysql from "mysql2/promise";

const config = {
  host: "lldn637.servidoresdns.net",
  user: "qakw743",
  password: "Gmief2024!",
  database: "qakw743",
  port: 3306,
};

export async function getConnection() {
  try {
    const connection = await mysql.createConnection(config);
    return connection;
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    throw error;
  }
}
