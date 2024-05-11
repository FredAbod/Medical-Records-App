import express from 'express';
import { isAuthenticated } from '../../../middleware/isAuthenticated.js';
import { createNurse, deleteNurse, getAllNurses, getNurseByName, updateNurse } from '../controllers/nurse.Controller.js';
const router = express.Router();


// Add A Nurse
router.post('/addNurse',isAuthenticated, createNurse);

// Update A Nurse
router.post('/updateNurse',isAuthenticated, updateNurse);

// Delete A Nurse
router.post('/deleteNurse',isAuthenticated, deleteNurse);

// Get All Nurses
router.get('/get',isAuthenticated, getAllNurses);

// Get Nurse By Name
router.get('/get',isAuthenticated, getNurseByName);

export default router;