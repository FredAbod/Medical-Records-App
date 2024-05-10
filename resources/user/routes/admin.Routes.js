import express from 'express';
import { createAdmin, createDoctor, createLabTech, createNurse, createPatient, createPharmacist, createRegistrar, loginAdmin } from '../controllers/admin.Controller.js';
import { isAuthenticated } from '../../../middleware/isAuthenticated.js';
const router = express.Router();


// Create admin route
router.post('/create', createAdmin);

// Login admin route
router.post('/login', loginAdmin);

// Add A Doctor
router.post('/addDoctor',isAuthenticated, createDoctor);

// Add A Registrar
router.post('/addRegistrar',isAuthenticated, createRegistrar);

// Add A Pharmacist
router.post('/addPharmacist',isAuthenticated, createPharmacist);

// Add A Nurse
router.post('/addNurse',isAuthenticated, createNurse);

// Add A Lab Technician
router.post('/addLabTech',isAuthenticated, createLabTech);

// Add A Patient
router.post('/addPatient',isAuthenticated, createPatient);

export default router;