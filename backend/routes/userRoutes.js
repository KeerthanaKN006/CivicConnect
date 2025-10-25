import express from "express";
import { createUser, makeAdmin, getUserRole } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.post("/make-admin", makeAdmin);
router.get("/role/:email", getUserRole);

export default router;
