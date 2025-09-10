import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import contacts from "./routes/contacts.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Contacts service");
});

app.use("/contacts", contacts);

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err?.message || err);
    process.exit(1);
  });
