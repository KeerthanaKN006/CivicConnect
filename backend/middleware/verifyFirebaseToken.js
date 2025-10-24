import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

// initialize firebase admin if not already
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    fs.readFileSync("./config/serviceAccountKey.json", "utf8")
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const idToken = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    req.user = decodedToken; // store user info for later use
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ message: "Unauthorized or invalid token" });
  }
};
