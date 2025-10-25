import express from "express";
import { getAllReports, updateReportStatus } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { checkAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// All admin routes require authentication + admin role
router.get("/reports", verifyToken, checkAdmin, getAllReports);
router.put("/reports/:id", verifyToken, checkAdmin, updateReportStatus);

export default router;
