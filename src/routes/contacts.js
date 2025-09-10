import { Router } from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const docs = await getDB().collection("contacts").find({}).toArray();
    res.status(200).json(docs);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid id" });
    const doc = await getDB().collection("contacts").findOne({ _id: new ObjectId(id) });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.status(200).json(doc);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
