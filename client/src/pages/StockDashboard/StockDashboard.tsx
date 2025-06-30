import { lazy, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  setSelectedSymbol,
  setSelectedTimeRange,
} from "../../store/slices/stockSlice";
import { fetchCurrentStockPrice, fetchStockHistory } from "../../utils/api";
import StockWidgetSkeleton from "../../components/skeletons/StockWidgetSkeleton";
import StockChartSkeletion from "../../components/skeletons/StockChartSkeletion";

//Lozily loading components to improve performance
const StockWidget = lazy(
  () => import("../../components/StockWidget/StockWidget")
);
const StockChart = lazy(() => import("../../components/StockChart/StockChart"));

const StockDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedSymbol, selectedTimeRange } = useAppSelector(
    (state) => state.stock
  );
  const stockOptions = [
    { value: "AAPL", label: "Apple Inc. (AAPL)" },
    { value: "MSFT", label: "Microsoft Corporation (MSFT)" },
    { value: "GOOGL", label: "Alphabet Inc. (GOOGL)" },
  ];

  const timeRangeOptions = [
    { value: "1W", label: "1 Week" },
    { value: "1M", label: "1 Month" },
    { value: "3M", label: "3 Months" },
  ];

  // Fetch current stock price
  const {
    data: currentPrice,
    isLoading: isPriceLoading,
    error: priceError,
    isFetching: isPriceFetching,
    refetch: refetchPrice,
  } = useQuery({
    queryKey: ["stockPrice", selectedSymbol],
    queryFn: () => fetchCurrentStockPrice(selectedSymbol),
    refetchInterval: 300000, // Refetch every 5 minutes
  });
  // Fetch stock history
  const {
    data: stockHistory,
    isLoading: isHistoryLoading,
    error: historyError,
    isFetching: isHistoryFetching,
    refetch: refetchHistory,
  } = useQuery({
    queryKey: ["stockHistory", selectedSymbol, selectedTimeRange],
    queryFn: () => fetchStockHistory(selectedSymbol, selectedTimeRange),
  });

  const handleSymbolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedSymbol(event.target.value));
  };

  const handleTimeRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setSelectedTimeRange(event.target.value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Talha's Stock
          </h1>
          <p className="text-lg text-gray-600">
            Real-time stock prices and historical data
          </p>
        </div>

        {/* Stock Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Stock
            </label>
            <select
              value={selectedSymbol}
              onChange={handleSymbolChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
            >
              {stockOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className={`bg-blue-800 p-3 mb-2 rounded-xl text-white hover:cursor-pointer ${
            (isPriceFetching || isHistoryFetching) && "bg-gray-400"
          }`}
          onClick={() => {
            refetchPrice();
            refetchHistory();
          }}
          disabled={isHistoryFetching || isPriceFetching}
        >
          {isHistoryFetching || isPriceFetching ? "Fethching..." : "Refresh"}
        </button>
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stock Widget */}
          <div className="lg:col-span-1">
            <Suspense fallback={<StockWidgetSkeleton />}>
              <StockWidget
                stockData={currentPrice}
                isLoading={isPriceLoading}
                error={priceError}
              />
            </Suspense>
          </div>
          {/* Time Range Selector */}
          <div className="lg:col-span-1 flex items-start">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Range
              </label>
              <select
                value={selectedTimeRange}
                onChange={handleTimeRangeChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
              >
                {timeRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Quick Stats
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Symbol:</span>
                    <span className="font-medium">{selectedSymbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Range:</span>
                    <span className="font-medium">
                      {
                        timeRangeOptions.find(
                          (opt) => opt.value === selectedTimeRange
                        )?.label
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated:</span>
                    <span className="font-medium">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Chart */}
        <div className="mt-8">
          <Suspense fallback={<StockChartSkeletion />}>
            <StockChart
              stockHistory={stockHistory}
              isLoading={isHistoryLoading}
              error={historyError}
              timeRange={selectedTimeRange}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default StockDashboard;
