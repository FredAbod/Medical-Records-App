import express from 'express';
import { addLabResult, createLabTech, deleteLabTech, loginLabTech, updateLabTech } from '../controllers/labTech.Controller.js';
import { isAuthenticated } from '../../../middleware/isAuthenticated.js';
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