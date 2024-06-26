import express from 'express';
import { isAuthenticated } from '../../../middleware/isAuthenticated.js';
import { addVitals, admitPatient, assignRoom, createNurse, deleteNurse, getAllNurses, getAllPatientForDay, getMedicalHistoryByPatientId, getNurseByName, getPatientById, loginNurse, updateNurse } from '../controllers/nurse.Controller.js';
const router = express.Router();


// Add A Nurse
router.post('/addNurse', createNurse);

// Add Vitals
router.post('/addVitals',isAuthenticated, addVitals);

// Assign Room
router.post('/assignRoom',isAuthenticated, assignRoom);

// Admit Patient
router.post('/admitPatient/:patientId',isAuthenticated, admitPatient);

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
router.get('/getPatientById/:patientId',isAuthenticated, getPatientById);

// Get Pateint
router.get('/med/:patienId', getMedicalHistoryByPatientId);

export default router;