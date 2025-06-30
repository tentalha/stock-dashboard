const vantageInstance = require("../API");
const axios = require("axios");

const StockService = {
  getStockData: async (symbol) => {
    const response = await axios.get(
      `${process.env.VANTAGE_API_BASE_URL}/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.VANTAGE_API_KEY}`
    );
    if (response.data["Information"])
      throw new Error(
        "API rate limit exceeded. Please upgrade your plan at https://www.alphavantage.co/premium/"
      );

    return response.data["Time Series (5min)"];
  },
  getHistoricData: async (symbol) => {
    const response = await axios.get(
      `${process.env.VANTAGE_API_BASE_URL}/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.VANTAGE_API_KEY}`
    );
    if (response.data["Information"])
      throw new Error(
        "API rate limit exceeded. Please upgrade your plan at https://www.alphavantage.co/premium/"
      );

    return response.data["Time Series (Daily)"];
  },
};

module.exports = StockService;
