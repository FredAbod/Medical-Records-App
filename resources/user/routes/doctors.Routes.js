import express from 'express';
import { isAuthenticated } from '../../../middleware/isAuthenticated';
import { createDoctor, deleteDoctor, getAllDoctors, getDoctorByName, updateDoctor } from '../controllers/doctors.Controller';
const router = express.Router();

// Add A Doctor
router.post('/addDoctor',isAuthenticated, createDoctor);

// Update A Doctor Details
router.patch('/updateDoctor',isAuthenticated, updateDoctor);

// Delete A Doctor Details
router.delete('/deleteDoctor',isAuthenticated, deleteDoctor);

// Get All Doctors
router.get('/get',isAuthenticated, getAllDoctors);

// Get Doctor By Name
router.get('/get',isAuthenticated, getDoctorByName);


export default router;