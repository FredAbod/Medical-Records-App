import express from 'express';
import { isAuthenticated } from '../../../middleware/isAuthenticated.js';
import { createPatient, createRegistrar, deleteRegistrar, getAllPatient, getAllPatientForDay, getAllRegistrars, getMedicalHistoryByPatientId, getPatientById, getPatientByMatric, getRegistrarByName, loginRegistrar, updateRegistrar } from '../controllers/registrars.Controllers.js';
import { activatePatientsStatus, getAllActivePatients, updatePatient } from '../controllers/admin.Controller.js';
const router = express.Router();

// Add A Registrar
router.post('/addRegistrar', createRegistrar);

// Login A Registrar
router.post('/login', loginRegistrar);

// Update A Registrar Details
router.patch('/updateRegistrar/:id',isAuthenticated, updateRegistrar);

// Delete A Doctor Details
router.patch('/deleteRegistrar',isAuthenticated, deleteRegistrar);

// Get All Registrars
router.get('/get',isAuthenticated, getAllRegistrars);

// Get Registrars By Name
router.get('/getByName/:name',isAuthenticated, getRegistrarByName);

// Get Patients By Matric
router.get('/getByMatric/:matric',isAuthenticated, getPatientByMatric);

// Get Patient
router.get('/getPatient',isAuthenticated, getAllPatientForDay);

// Get All Active Patients
router.get("/getActivePatients", getAllActivePatients);

// Get Patient
router.get('/getAllPatient',isAuthenticated, getAllPatient);

// Get Patient
router.get('/getAllPatientById/:patientId',isAuthenticated, getPatientById);

// Get Medical History
router.get('/getPatientMedicalHistory/:patientId',isAuthenticated, getMedicalHistoryByPatientId);

// Create Patient
router.post('/createPatient',isAuthenticated, createPatient);

// Update Patient
router.post('/updatePatient/:patientId',isAuthenticated, updatePatient);

// Activate Patient Status
router.post("/activate/:patientId", activatePatientsStatus);

export default router;