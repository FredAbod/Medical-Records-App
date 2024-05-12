import express from 'express';
import { createDoctor, deleteDoctor, updateDoctor } from '../controllers/doctors.Controller';
import { addLabResult, createLabTech, deleteLabTech, loginLabTech, updateLabTech } from '../controllers/labTech.Controller';
const router = express.Router();


// Add A Lab Technician
router.post('/addLabTech',isAuthenticated, createLabTech);

// Add A Lab Result
router.post('/addLabResult',isAuthenticated, addLabResult);

// Login A Lab Technician
router.post('/loginLabTech', loginLabTech);

// Update A Lab Tech Details
router.patch('/updateLabTech',isAuthenticated, updateLabTech);

// Delete A Lab Techtor Details
router.delete('/deleteLabTech',isAuthenticated, deleteLabTech);

export default router;