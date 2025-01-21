// backend/services/stockService.js
const axios = require('axios');
const cheerio = require('cheerio');

class StockService {
  async fetchStockData(symbol) {
    try {
      // For development, return mock data in the correct format
      const mockPriceHistory = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        price: Math.random() * 100 + 100,
        volume: Math.floor(Math.random() * 1000000)
      }));

      const currentPrice = mockPriceHistory[0].price;
      const ma20 = this.calculateMA(mockPriceHistory.slice(0, 20));
      const ma200 = this.calculateMA(mockPriceHistory.slice(0, 30)); // Using 30 for demo

      return {
        symbol,
        currentPrice,
        priceHistory: mockPriceHistory,
        ma20,
        ma200,
        recommendation: this.generateRecommendation(currentPrice, ma20, ma200)
      };
    } catch (error) {
      console.error('Error fetching stock data:', error);
      // Return data structure with default values
      return {
        symbol,
        currentPrice: 0,
        priceHistory: [],
        ma20: 0,
        ma200: 0,
        recommendation: 'Unable to generate recommendation'
      };
    }
  }

  calculateMA(priceData) {
    if (!priceData || priceData.length === 0) return 0;
    const sum = priceData.reduce((acc, curr) => acc + curr.price, 0);
    return Number((sum / priceData.length).toFixed(2));
  }

  generateRecommendation(currentPrice, ma20, ma200) {
    if (!currentPrice || !ma20 || !ma200) return 'Insufficient data';

    if (currentPrice > ma20 && ma20 > ma200) {
      return 'Strong Buy - Upward Trend';
    } else if (currentPrice < ma20 && ma20 < ma200) {
      return 'Consider Selling - Downward Trend';
    } else if (currentPrice > ma20) {
      return 'Hold/Buy - Short-term Strength';
    } else {
      return 'Hold - Monitor Closely';
    }
  }
}

module.exports = new StockService();