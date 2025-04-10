import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config.js';
import jobRoutes from './routes/jobRoutes.js';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Placeholder for authentication middleware (replace with your actual auth)
const authenticate = (req, res, next) => {
  // In a real application, you would verify the user's token here
  // For this example, we'll assume a user is always authenticated
  // and set a dummy user ID for testing purposes.
  req.user = { userId: req.query.userId }; // Replace with actual user ID from auth
  next();
};

// Apply authentication middleware to all routes
app.use(authenticate);

// Routes
app.use('/', jobRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
