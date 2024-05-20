import express from 'express';
import { isAuthenticated } from '../../../middleware/isAuthenticated.js';
import { addDiagnosis, addLabOrder, addPrescription, createDoctor, deleteDoctor, getAllDoctors, getAllPatientForDay, getDoctorById,  getLabResultByPatientId,  getMedicalHistoryByPatientId, getPatientDiagnosis, loginDoctor, updateDoctor } from '../controllers/doctors.Controller.js';
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

// Get Doctor By Id
router.get('/getById/:id', getDoctorById);

// Get All Paient For The Day
router.get('/patient',isAuthenticated, getAllPatientForDay);

// Get All Paient For The Day
router.get('/diagnosis', getPatientDiagnosis);

// Get Medical History
router.get('/getPatientMedicalHistory/:patientId',isAuthenticated, getMedicalHistoryByPatientId);

// Get Lab Result
router.get('/getPatienLabResult/:patientId',isAuthenticated, getLabResultByPatientId);

export default router;