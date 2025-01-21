// backend/services/newsService.js
const axios = require('axios');
const cheerio = require('cheerio');

class NewsService {
  async fetchStockNews(symbol) {
    try {
      // This is a placeholder URL - replace with actual news API endpoint
      const response = await axios.get(`https://api.example.com/news?symbol=${symbol}`);

      // For development, return mock data
      return [
        {
          title: "Market Update: Tech Stocks Rally",
          summary: "Major technology stocks showed strong gains amid positive earnings reports...",
          source: "Financial Times",
          publishedAt: new Date().toLocaleDateString(),
          url: "https://example.com/news/1"
        },
        {
          title: "Global Markets: Asian Shares Rise",
          summary: "Asian markets showed positive momentum following strong US economic data...",
          source: "Reuters",
          publishedAt: new Date().toLocaleDateString(),
          url: "https://example.com/news/2"
        },
        // Add more mock news items as needed
      ];
    } catch (error) {
      throw new Error(`Failed to fetch news: ${error.message}`);
    }
  }
}

module.exports = new NewsService();