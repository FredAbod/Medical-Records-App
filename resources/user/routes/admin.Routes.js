import express from "express";
import {
  createAdmin,
  createPatient,
  loginAdmin,
} from "../controllers/admin.Controller.js";
import { isAuthenticated } from "../../../middleware/isAuthenticated.js";
const router = express.Router();

// Create admin route
router.post("/create", createAdmin);

// Login admin route
router.post("/login", loginAdmin);

// Add A Patient
router.post("/addPatient", isAuthenticated, createPatient);

export default router;
