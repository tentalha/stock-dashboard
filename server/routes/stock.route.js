const catchAsync = require("../common/catchAsync");
const StockController = require("../controllers/stock.controller");

const router = require("express").Router();

router.get("/realtime/:symbol", catchAsync(StockController.getStockData));

router.get("/historical/:symbol", catchAsync(StockController.getHistoricData));

module.exports = router;
