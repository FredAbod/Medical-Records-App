import express from "express";
import {
  createAdmin,
  createPatient,
  getAllPatient,
  getPatientById,
  loginAdmin,
} from "../controllers/admin.Controller.js";
import { isAuthenticated } from "../../../middleware/isAuthenticated.js";
const router = express.Router();

// Create admin route
router.post("/create", createAdmin);

// Login admin route
router.post("/login", loginAdmin);

// Get All Patients
router.get("/get", getAllPatient);

// Get All PatientsById
router.get("/get/:patientId", getPatientById);

// Add A Patient
router.post("/addPatient", isAuthenticated, createPatient);

export default router;
