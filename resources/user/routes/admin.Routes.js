import express from "express";
import {
  activatePatientsStatus,
  createAdmin,
  createPatient,
  deActivatePatientsStatus,
  deletePatient,
  getAllActivePatients,
  getAllPatient,
  getPatientById,
  loginAdmin,
  updateDoctor,
  updatePatient,
} from "../controllers/admin.Controller.js";
import { isAuthenticated } from "../../../middleware/isAuthenticated.js";
import { deleteDoctor } from "../controllers/doctors.Controller.js";
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

// Get All Active Patients
router.get("/getActivePatients", getAllActivePatients);

// Get All PatientsById
router.get("/get/:patientId", getPatientById);

// Add A Patient
router.post("/addPatient", isAuthenticated, createPatient);

// Update A Patient
router.post("/updatePatient/:patientId", isAuthenticated, updatePatient);

// Delete A Patient
router.delete("/deletePatient/:patientId", isAuthenticated, deletePatient);

// Update A Doctor Details
router.put('/updateDoctor/:id',isAuthenticated, updateDoctor);

// Delete A Doctor Details
router.delete('/deleteDoctor/:id',isAuthenticated, deleteDoctor);

export default router;
