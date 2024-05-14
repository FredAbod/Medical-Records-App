import express from "express";
import {
  activatePatientsStatus,
  createAdmin,
  createPatient,
  deActivatePatientsStatus,
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

// Activate Patient Status
router.post("/activate/:patientId", activatePatientsStatus);

// Deactivate Patient Status
router.post("/deactivate/:patientId", deActivatePatientsStatus);

// Get All Patients
router.get("/get", getAllPatient);

// Get All PatientsById
router.get("/get/:patientId", getPatientById);

// Add A Patient
router.post("/addPatient", isAuthenticated, createPatient);

export default router;
