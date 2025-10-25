import express from "express";
import { createUser, makeAdmin } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.post("/make-admin", makeAdmin);

export default router;
