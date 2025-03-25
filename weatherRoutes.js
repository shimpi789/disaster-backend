// routes/weatherRoutes.js
import express from 'express';
import {
    getWeather,
    getWeatherHistory,
} from '../controllers/weatherController.js';

const router = express.Router();

// Define routes
router.get('/', getWeather); // Fetch current weather data
router.get('/weatherHistory', getWeatherHistory); // Fetch weather history

export default router;