// backend/controllers/reportController.js
import Report from "../models/Report.js";

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createReport = async (req, res) => {
  try {
    const { title, description, imageUrl, location } = req.body;
    const report = await Report.create({
      title,
      description,
      imageUrl,
      location,
      createdBy: req.body.createdBy || "anonymous"
    });
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
