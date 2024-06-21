import express from 'express';
import { isAuthenticated } from '../../../middleware/isAuthenticated.js';
import { addMedicalHistory, createPharmacist, deletePharmacist, getAllActivePatients, getAllPharmacists, getMedicationHistory, getPatientsPrescription, getPharmacistByName, loginPharmacist, updatePharmacist } from '../controllers/pharmacists.Controller.js';
const router = express.Router();


// Add A Pharmacist
router.post('/addPharmacist', createPharmacist);

// Add Medical History
router.post('/addMedicalHistory',isAuthenticated, addMedicalHistory);

// Login A Pharmacist
router.post('/loginPharmacist', loginPharmacist);

// Update A Doctor Details
router.patch('/updatePharmacist/:id',isAuthenticated, updatePharmacist);

// Delete A Doctor Details
router.delete('/deleteDoctor',isAuthenticated, deletePharmacist);

// Get All Doctors
router.get('/get',isAuthenticated, getAllPharmacists);

// Get Medical History
router.get('/getMedicationHistory/:patientId',isAuthenticated, getMedicationHistory);

// Get Doctor By Name
router.get('/get',isAuthenticated, getPharmacistByName);

// Get Doctor By Name
router.get('/getActivePatients', getAllActivePatients);

// Get Patients Preescription
router.get('/prescription/:patientId', getPatientsPrescription);

export default router;