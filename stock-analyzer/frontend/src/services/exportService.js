// src/services/exportService.js
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (stockData) => {
  // Check if stockData exists
  if (!stockData) {
    console.error('No data available to export');
    return;
  }

  try {
    // Ensure we have valid data with default values if properties are missing
    const analysisData = [{
      Symbol: stockData.symbol || 'N/A',
      'Current Price': stockData.currentPrice || 0,
      '20 DMA': stockData.ma20 || 0,
      '200 DMA': stockData.ma200 || 0,
      Recommendation: stockData.recommendation || 'No recommendation available'
    }];

    // Ensure priceHistory is an array
    const priceHistory = Array.isArray(stockData.priceHistory) ? stockData.priceHistory : [];

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Add Analysis sheet
    const analysisWS = XLSX.utils.json_to_sheet(analysisData);
    XLSX.utils.book_append_sheet(wb, analysisWS, 'Analysis');

    // Only add Price History sheet if we have price history data
    if (priceHistory.length > 0) {
      const historyWS = XLSX.utils.json_to_sheet(priceHistory);
      XLSX.utils.book_append_sheet(wb, historyWS, 'Price History');
    }

    // Generate Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save file with formatted date
    const date = new Date().toISOString().split('T')[0];
    const fileName = `stock_analysis_${stockData.symbol || 'unknown'}_${date}.xlsx`;
    saveAs(data, fileName);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    alert('Failed to export data. Please try again.');
  }
};