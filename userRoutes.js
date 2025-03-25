// routes/userRoutes.js
import express from 'express';
import {
    getUsers,
    addUser,
    getEmergencyContacts,
    addEmergencyContact,
} from '../controllers/userController.js';

const router = express.Router();

// Define routes
router.get('/users', getUsers); // Fetch all users
router.post('/users', addUser); // Add a new user
router.get('/users/:userId/contacts', getEmergencyContacts); // Fetch emergency contacts for a user
router.post('/users/contacts', addEmergencyContact); // Add an emergency contact for a user

export default router;