const axios = require("axios");

const vantageInstance = axios.create({
  baseURL: process.env.VANTAGE_API_BASE_URL,
});

module.exports = vantageInstance;
