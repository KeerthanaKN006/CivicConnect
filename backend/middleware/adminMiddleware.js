import User from "../models/User.js";

export const checkAdmin = async (req, res, next) => {
  try {
    const userEmail = req.user.email; // From verifyToken middleware
    const user = await User.findOne({ email: userEmail });

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
