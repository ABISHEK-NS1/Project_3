const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/users');
const experienceRoutes = require('./routes/experience');
const resumeLogRoutes = require('./routes/resumeLogs');
const authRoutes = require('./routes/auth');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/resume-logs', resumeLogRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Interview Experience Portal API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
