// routes/newsRoutes.js
import express from 'express';
import { getNews } from '../controllers/newsController.js';

const router = express.Router();

// Define routes
router.get('/news', getNews); // Fetch all news data

export default router;