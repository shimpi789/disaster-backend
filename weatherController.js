// controllers/weatherController.js
import pool from '../db/db.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
console.log('Weather API Key:', OPENWEATHERMAP_API_KEY ? 'Loaded' : 'Missing!');

// Fetch and store weather data from OpenWeatherMap API
export const fetchAndStoreWeather = async (lat, lon) => {
    console.log(`[fetchAndStoreWeather] Starting with lat: ${lat}, lon: ${lon}`);
    
    try {
        console.log('Making API call to OpenWeatherMap...');
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}`
        );
        console.log('API Response Status:', weatherResponse.status);
        
        const weatherData = weatherResponse.data;
        console.log('Received weather data:', {
            city: weatherData.name,
            temp: weatherData.main?.temp,
            weather: weatherData.weather?.[0]?.main
        });

        console.log('Attempting to store in database...');
        const dbResult = await pool.query(
            'INSERT INTO weather_data (lat, lon, data) VALUES ($1, $2, $3) RETURNING id',
            [lat, lon, weatherData]
        );
        
        console.log('Database storage successful. Record ID:', dbResult.rows[0].id);
        return true;
    } catch (error) {
        console.error('Error in fetchAndStoreWeather:');
        console.error('- API Error:', error.response?.data || 'No API response');
        console.error('- DB Error:', error.message);
        console.error('- Full Error:', error);
        return false;
    }
};

// Fetch weather data for a specific location
export const getWeather = async (req, res) => {
    console.log('\n[getWeather] New Request Received');
    console.log('Query Parameters:', req.query);
    
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        console.log('Validation failed - missing lat/lon');
        return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    try {
        console.log('Fetching weather data from API...');
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}`
        );
        const weatherData = weatherResponse.data;
        console.log('API Data Received:', {
            city: weatherData.name,
            coordinates: `${weatherData.coord.lat},${weatherData.coord.lon}`
        });

        console.log('Attempting to store data...');
        const storageSuccess = await fetchAndStoreWeather(lat, lon);
        
        if (!storageSuccess) {
            console.log('Storage failed but continuing with API response');
        }

        res.json({
            ...weatherData,
            storedInDB: storageSuccess
        });
    } catch (error) {
        console.error('Error in getWeather:');
        console.error('- API Error:', error.response?.data || error.message);
        console.error('- Stack Trace:', error.stack);
        
        res.status(500).json({ 
            message: 'Failed to fetch weather data',
            error: error.message 
        });
    }
};

// Fetch weather history from the database
export const getWeatherHistory = async (req, res) => {
    console.log('\n[getWeatherHistory] Fetching history');
    
    try {
        console.log('Executing database query...');
        const result = await pool.query('SELECT id, lat, lon, timestamp FROM weather_data ORDER BY timestamp DESC');
        console.log(`Found ${result.rowCount} records`);
        
        res.json(result.rows);
    } catch (error) {
        console.error('Database query failed:');
        console.error('- Error:', error.message);
        console.error('- Query:', error.query);
        
        res.status(500).json({ 
            message: 'Failed to fetch weather history',
            error: error.message 
        });
    }
};