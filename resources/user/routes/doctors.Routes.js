import express from 'express';
import { isAuthenticated } from '../../../middleware/isAuthenticated.js';
import { addDiagnosis, addLabOrder, addPrescription, createDoctor, deleteDoctor, getAllDoctors, getDoctorByName, loginDoctor, updateDoctor } from '../controllers/doctors.Controller.js';
const router = express.Router();

// Add A Doctor
router.post('/addDoctor',isAuthenticated, createDoctor);

// Login A Doctor
router.post('/login', loginDoctor);

// Add Diagnosis
router.post('/diagnosis',isAuthenticated, addDiagnosis);

// Add Prescription
router.post('/addPrescription',isAuthenticated, addPrescription);

// Create A Lab Order
router.post('/labOrder',isAuthenticated, addLabOrder);

// Update A Doctor Details
router.patch('/updateDoctor',isAuthenticated, updateDoctor);

// Delete A Doctor Details
router.delete('/deleteDoctor',isAuthenticated, deleteDoctor);

// Get All Doctors
router.get('/get',isAuthenticated, getAllDoctors);

// Get Doctor By Name
router.get('/get',isAuthenticated, getDoctorByName);


export default router;