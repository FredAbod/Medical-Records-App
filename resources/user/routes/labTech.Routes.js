import express from 'express';
import { addLabResult, createLabTech, deleteLabTech, getAllPatientForDay, getLabOrdersByPatientName, loginLabTech, updateLabTech } from '../controllers/labTech.Controller.js';
import { isAuthenticated } from '../../../middleware/isAuthenticated.js';
const router = express.Router();


// Add A Lab Technician
router.post('/addLabTech',isAuthenticated, createLabTech);

// Add A Lab Result
router.post('/addLabResult',isAuthenticated, addLabResult);

// Login A Lab Technician
router.post('/loginLabTech', loginLabTech);

// Update A Lab Tech Details
router.patch('/updateLabTech/:id',isAuthenticated, updateLabTech);

// Delete A Lab Techtor Details
router.delete('/deleteLabTech',isAuthenticated, deleteLabTech);

// Get All Patient For THe Day
router.get('/getPatient',isAuthenticated, getAllPatientForDay);

//Get Lab Order
router.get('/getLabOrder',isAuthenticated, getLabOrdersByPatientName);

export default router;