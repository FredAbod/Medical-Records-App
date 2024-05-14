import express from 'express';
import { isAuthenticated } from '../../../middleware/isAuthenticated.js';
import { createRegistrar, deleteRegistrar, getAllPatient, getAllPatientForDay, getAllRegistrars, getMedicalHistoryByPatientId, getMedicalHistoryByPatientName, getPatientById, getRegistrarByName, loginRegistrar, updateRegistrar } from '../controllers/registrars.Controllers.js';
const router = express.Router();

// Add A Registrar
router.post('/addRegistrar',isAuthenticated, createRegistrar);

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

// Get Patient
router.get('/getPatient',isAuthenticated, getAllPatientForDay);

// Get Patient
router.get('/getAllPatient',isAuthenticated, getAllPatient);

// Get Patient
router.get('/getAllPatientById/:patientId',isAuthenticated, getPatientById);

// Get Medical History
router.get('/getPatientMedicalHistory/:patientId',isAuthenticated, getMedicalHistoryByPatientId);

export default router;