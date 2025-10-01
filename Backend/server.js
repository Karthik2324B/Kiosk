
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import surveyRoutes from './routes/survey.routes.js';

// --- 2. INITIALIZATION ---
const app = express();
const PORT = 4000;

// --- 3. MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- 4. DATABASE CONNECTION ---
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log(' Successfully connected to MongoDB Atlas!'))
  .catch(err => console.error(' Error connecting to MongoDB:', err));

// Routes
app.use('/api', surveyRoutes);


app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});