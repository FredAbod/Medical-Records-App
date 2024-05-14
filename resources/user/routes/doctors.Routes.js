import express from 'express';
import { isAuthenticated } from '../../../middleware/isAuthenticated.js';
import { addDiagnosis, addLabOrder, addPrescription, createDoctor, deleteDoctor, getAllDoctors, getAllPatientForDay, getDoctorByName, getLabResultByPatientId,  getMedicalHistoryByPatientId, loginDoctor, updateDoctor } from '../controllers/doctors.Controller.js';
const router = express.Router();

// Add A Doctor
router.post('/addDoctor', createDoctor);

// Login A Doctor
router.post('/login', loginDoctor);

// Add Diagnosis
router.post('/diagnosis/:id',isAuthenticated, addDiagnosis);

// Add Prescription
router.post('/addPrescription/:patientId',isAuthenticated, addPrescription);

// Create A Lab Order
router.post('/labOrder/:patientId',isAuthenticated, addLabOrder);

// Update A Doctor Details
router.patch('/updateDoctor/:id',isAuthenticated, updateDoctor);

// Delete A Doctor Details
router.delete('/deleteDoctor',isAuthenticated, deleteDoctor);

// Get All Doctors
router.get('/get',isAuthenticated, getAllDoctors);

// Get Doctor By Name
router.get('/getByName/:name',isAuthenticated, getDoctorByName);

// Get All Paient For The Day
router.get('/patient',isAuthenticated, getAllPatientForDay);

// Get Medical History
router.get('/getPatientMedicalHistory/:patientId',isAuthenticated, getMedicalHistoryByPatientId);

// Get Lab Result
router.get('/getPatienLabResult/:patientId',isAuthenticated, getLabResultByPatientId);

export default router;