// backend/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();
// In backend/server.js, add:
const stockService = require('./services/stockService');
// In backend/server.js, add:
const newsService = require('./services/newsService');

app.get('/api/news/:symbol', async (req, res) => {
  try {
    const news = await newsService.fetchStockNews(req.params.symbol);
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/stock/:symbol', async (req, res) => {
  try {
    const data = await stockService.fetchStockData(req.params.symbol);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Stock data fetching endpoint
app.get('/api/stock/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    // TODO: Implement stock data fetching logic
    res.json({ message: 'Stock data endpoint placeholder' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});