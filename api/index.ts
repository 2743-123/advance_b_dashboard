import express from 'express';
import authRoutes from "./routes/authRoutes" 
import dotenv from 'dotenv';
// import Users from './models/User';
import sequelize from './config/database';
import adminRoutes from './routes/adminRoutes'
import superadminRoutes from './routes/superadminRoutes'
// import { authMiddleware } from './middlewares/authMiddleware';
import bodyParser from 'body-parser';
// import cors from 'cors';
import path from 'path';

require('dotenv').config();


const app = express();
// app.use(cors());
app.use(express.static(path.join(__dirname, '../public')))


app.use(express.json()); // Middleware to parse JSON
app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.send('Hello from Express server on Vercel!');
});

app.use('/api/auth', authRoutes); // Use auth routes
app.use('/api/admin',adminRoutes)
app.use('/api/superadmin',superadminRoutes)


const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }) // Set force: true to recreate tables (caution: this will drop existing data)
  .then(() => {
    console.log('Database & tables synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
