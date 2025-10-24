import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: String,
  role: { type: String, enum: ["citizen","admin"], default: "citizen" },
});

export default mongoose.model("User", userSchema);
