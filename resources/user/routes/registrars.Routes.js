import express from 'express';
import { isAuthenticated } from '../../../middleware/isAuthenticated';
import { createRegistrar, deleteRegistrar, getAllRegistrars, getRegistrarByName, loginRegistrar, updateRegistrar } from '../controllers/registrars.Controllers';
const router = express.Router();

// Add A Registrar
router.post('/addRegistrar',isAuthenticated, createRegistrar);

// Login A Registrar
router.post('/addRegistrar', loginRegistrar);

// Update A Registrar Details
router.patch('/updateRegistrar',isAuthenticated, updateRegistrar);

// Delete A Doctor Details
router.patch('/deleteRegistrar',isAuthenticated, deleteRegistrar);

// Get All Registrars
router.get('/get',isAuthenticated, getAllRegistrars);

// Get Registrars By Name
router.get('/get',isAuthenticated, getRegistrarByName);

export default router;