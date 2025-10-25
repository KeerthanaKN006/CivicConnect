import express from "express";
import Report from "../models/Report.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Secure this route
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, location, imageUrl } = req.body;
    const newReport = new Report({
      title,
      description,
      location,
      imageUrl: imageUrl || "",
      createdBy: req.user.email || "anonymous"
    });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
