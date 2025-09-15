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

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newContact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await getDB().collection("contacts").insertOne(newContact);
    res.status(201).json({ id: result.insertedId });
  } catch {
    res.status(500).json({ error: "Failed to create contact" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid id" });
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const result = await getDB().collection("contacts").updateOne(
      { _id: new ObjectId(id) },
      { $set: { firstName, lastName, email, favoriteColor, birthday } }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to update contact" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid id" });
    const result = await getDB().collection("contacts").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

export default router;
