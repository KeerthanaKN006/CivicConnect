// backend/models/Report.js
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
  location: { lat: Number, lng: Number, address: String },
  status: { type: String, default: "Pending" },
  createdBy: { type: String }, 
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Report", reportSchema);
