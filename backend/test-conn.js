import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Connected to MongoDB Atlas!");
    await mongoose.connection.close();
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
})();
