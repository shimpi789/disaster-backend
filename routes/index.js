import express from 'express';
import userRoutes from './userRoutes.js'; // Import userRoutes
import weatherRoutes from './weatherRoutes.js'; // Import other routes if any
import newsRoutes from './newsRoutes.js'; // Import other routes if any

const router = express.Router();

// Use routes
router.use('/', userRoutes); // Apply no prefix to userRoutes
router.use('/weather', weatherRoutes); // Apply /weather prefix to weatherRoutes
router.use('/news', newsRoutes); // Apply /news prefix to newsRoutes

export default router;
