import express from 'express';
import { isAuthenticated } from '../../../middleware/isAuthenticated';
import { createPharmacist, deletePharmacist, getAllPharmacists, getPharmacistByName, updatePharmacist } from '../controllers/pharmacists.Controller';
const router = express.Router();


// Add A Pharmacist
router.post('/addPharmacist',isAuthenticated, createPharmacist);

// Update A Doctor Details
router.patch('/updateDoctor',isAuthenticated, updatePharmacist);

// Delete A Doctor Details
router.delete('/deleteDoctor',isAuthenticated, deletePharmacist);

// Get All Doctors
router.get('/get',isAuthenticated, getAllPharmacists);

// Get Doctor By Name
router.get('/get',isAuthenticated, getPharmacistByName);

export default router;