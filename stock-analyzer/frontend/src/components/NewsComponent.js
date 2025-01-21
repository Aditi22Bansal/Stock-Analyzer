import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

const NewsComponent = ({ symbol }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (symbol) {
      fetchNews(symbol);
    }
  }, [symbol]);

  const fetchNews = async (stockSymbol) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/news/${stockSymbol}`);
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading news...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Latest Market News</h3>
      <div className="space-y-4">
        {news.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-lg">{item.title}</h4>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            <p className="text-gray-600 text-sm mt-1">{item.summary}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">{item.source}</span>
              <span className="text-sm text-gray-500">{item.publishedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsComponent;