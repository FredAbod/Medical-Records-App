import express from 'express';
import { isAuthenticated } from '../../../middleware/isAuthenticated.js';
import { addVitals, admitPatient, assignRoom, createNurse, deleteNurse, getAllNurses, getAllPatientForDay, getMedicalHistoryByPatientName, getNurseByName, loginNurse, updateNurse } from '../controllers/nurse.Controller.js';
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
router.patch('/updateNurse/:id',isAuthenticated, updateNurse);

// Delete A Nurse
router.post('/deleteNurse',isAuthenticated, deleteNurse);

// Get All Nurses
router.get('/get',isAuthenticated, getAllNurses);

// Get Nurse By Name
router.get('/getNurseByName/:name',isAuthenticated, getNurseByName);

// Get Pateint
router.get('/getPatient',isAuthenticated, getAllPatientForDay);

// Get Pateint
router.get('/med',isAuthenticated, getMedicalHistoryByPatientName);

export default router;