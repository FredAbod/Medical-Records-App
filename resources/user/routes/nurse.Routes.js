import express from 'express';
import { isAuthenticated } from '../../../middleware/isAuthenticated.js';
import { addVitals, admitPatient, assignRoom, createNurse, deleteNurse, getAllNurses, getNurseByName, loginNurse, updateNurse } from '../controllers/nurse.Controller.js';
const router = express.Router();


// Add A Nurse
router.post('/addNurse',isAuthenticated, createNurse);

// Add Vitals
router.post('/addVitals',isAuthenticated, addVitals);

// Assign Room
router.post('/assignRoom',isAuthenticated, assignRoom);

// Admit Patient
router.post('/admitPatient',isAuthenticated, admitPatient);

// Add A Nurse
router.post('/loginNurse', loginNurse);

// Update A Nurse
router.post('/updateNurse',isAuthenticated, updateNurse);

// Delete A Nurse
router.post('/deleteNurse',isAuthenticated, deleteNurse);

// Get All Nurses
router.get('/get',isAuthenticated, getAllNurses);

// Get Nurse By Name
router.get('/get',isAuthenticated, getNurseByName);

export default router;