// controllers/newsController.js
import pool from '../db/db.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Fetch and store news data from NewsAPI
export const fetchAndStoreNews = async () => {
    try {
        const newsResponse = await axios.get(
            `https://newsapi.org/v2/everything?q=disaster&apiKey=${NEWS_API_KEY}`
        );
        const newsData = newsResponse.data.articles;

        // Store news data in PostgreSQL
        for (const article of newsData) {
            await pool.query(
                'INSERT INTO news_data (source, title, description, url, published_at) VALUES ($1, $2, $3, $4, $5)',
                [article.source.name, article.title, article.description, article.url, article.publishedAt]
            );
        }

        console.log('News data stored in PostgreSQL.');
    } catch (error) {
        console.error('Error fetching or storing news data:', error);
    }
};

// Fetch all news data from the database
export const getNews = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM news_data ORDER BY published_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching news data:', error);
        res.status(500).json({ message: 'Failed to fetch news data.' });
    }
};

// Fetch news data periodically (every 5 minutes)
setInterval(fetchAndStoreNews, 5 * 60 * 1000);
