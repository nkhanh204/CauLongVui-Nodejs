const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/index');
const errorMiddleware = require('./middlewares/error.middleware');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CauLongVui API' });
});

app.use('/api/v1', routes);

// Error Handling
app.use(errorMiddleware);

module.exports = app;
