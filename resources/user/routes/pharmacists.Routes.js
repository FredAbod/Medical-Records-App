import express from 'express';
import { isAuthenticated } from '../../../middleware/isAuthenticated.js';
import { addMedicalHistory, createPharmacist, deletePharmacist, getAllPharmacists, getMedicationHistory, getPharmacistByName, loginPharmacist, updatePharmacist } from '../controllers/pharmacists.Controller.js';
const router = express.Router();


// Add A Pharmacist
router.post('/addPharmacist',isAuthenticated, createPharmacist);

// Add Medical History
router.post('/addMedicalHistory',isAuthenticated, addMedicalHistory);

// Login A Pharmacist
router.post('/loginPharmacist', loginPharmacist);

// Update A Doctor Details
router.patch('/updateDoctor',isAuthenticated, updatePharmacist);

// Delete A Doctor Details
router.delete('/deleteDoctor',isAuthenticated, deletePharmacist);

// Get All Doctors
router.get('/get',isAuthenticated, getAllPharmacists);

// Get Medical History
router.get('/getMedicationHistory',isAuthenticated, getMedicationHistory);

// Get Doctor By Name
router.get('/get',isAuthenticated, getPharmacistByName);

export default router;