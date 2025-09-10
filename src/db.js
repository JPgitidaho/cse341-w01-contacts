import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

let client;
let db;

export async function connectDB() {
  if (db) return db;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(process.env.DB_NAME || "cse341");
  return db;
}

export function getDB() {
  if (!db) throw new Error("DB not initialized");
  return db;
}
