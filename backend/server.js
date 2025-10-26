const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic test route
app.get('/', (req, res) => {
  return res.status(200).json({ ok: true, message: 'Expense Tracker API is running' });
});

// Routes
const categoryRoutes = require('./routes/categories');
const expenseRoutes = require('./routes/expenses');

app.use('/api/categories', categoryRoutes);
app.use('/api/expenses', expenseRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});