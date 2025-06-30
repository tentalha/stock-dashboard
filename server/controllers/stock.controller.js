const { succcesResponse } = require("../responses");
const StockService = require("../services/stock.service");
const { realTimeData, historicData } = require("../static/data");
const { parseBoolean } = require("../utils");

const StockController = {
  async getStockData(req, res) {
    const symbol = req.params.symbol;
    const vantageSwitch = parseBoolean(process.env.SWITCH);
    const stock = vantageSwitch
      ? await StockService.getStockData(symbol)
      : realTimeData["Time Series (5min)"];
    return succcesResponse(res, 200, stock);
  },

  async getHistoricData(req, res) {
    const symbol = req.params.symbol;
    const range = req.query.range || "1M";
    const vantageSwitch = parseBoolean(process.env.SWITCH);
    const stock = vantageSwitch
      ? await StockService.getHistoricData(symbol)
      : historicData["Time Series (Daily)"];

    let toDays;
    if (range == "1M") {
      toDays = 30;
    } else if (range == "3M") {
      toDays = 90;
    } else {
      toDays = 7;
    }

    const sortedDates = Object.keys(stock)
      .sort((a, b) => new Date(b) - new Date(a))
      .slice(0, toDays);

    const finalStockData = {};
    sortedDates.forEach((date) => {
      finalStockData[date] = stock[date];
    });

    return succcesResponse(res, 200, finalStockData);
  },
};

module.exports = StockController;
