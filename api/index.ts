import express from 'express';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import sequelize from './config/database';
import adminRoutes from './routes/adminRoutes';
import superadminRoutes from './routes/superadminRoutes';
// import { authMiddleware } from './middlewares/authMiddleware'; // Uncomment if used
// import bodyParser from 'body-parser'; // Optional, see note below
import path from 'path';
// import cors from 'cors'; // Uncomment if used

dotenv.config(); // Correct way to configure dotenv

const PORT = process.env.PORT || 3000;

const app = express();
// app.use(cors()); // Uncomment if you want to use CORS
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json()); // Middleware to parse JSON
// app.use(bodyParser.json()); // Not needed if using express.json()

app.get('/api', (req, res) => {
  res.send('Hello from Express server on Vercel!');
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/superadmin', superadminRoutes);

// Sync database
sequelize.sync({ force: false }) // Be cautious with force: true
  .then(() => {
    console.log('Database & tables synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; // Prefer this for ES module export
