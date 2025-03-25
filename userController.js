// controllers/userController.js
import pool from '../db/db.js';

// Fetch all users
export const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users.' });
    }
};

// Add a new user
export const addUser = async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
            [name, email, phone]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Failed to add user.' });
    }
};

// Fetch emergency contacts for a user
export const getEmergencyContacts = async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM emergency_contacts WHERE user_id = $1',
            [userId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching emergency contacts:', error);
        res.status(500).json({ message: 'Failed to fetch emergency contacts.' });
    }
};

// Add an emergency contact for a user
export const addEmergencyContact = async (req, res) => {
    const { userId, name, phone, relationship } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO emergency_contacts (user_id, name, phone, relationship) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, name, phone, relationship]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error adding emergency contact:', error);
        res.status(500).json({ message: 'Failed to add emergency contact.' });
    }
};