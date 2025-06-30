import React from "react";
import { StockPrice } from "../../utils/api";

interface StockWidgetProps {
  stockData?: StockPrice | undefined;
  isLoading: boolean;
  error: Error | null;
}

const StockWidget: React.FC<StockWidgetProps> = ({ stockData, error }) => {
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-red-500">
          <p>
            {" "}
            {error?.response?.data?.message || "Some unexpected error occurred"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          {stockData?.symbol}
        </h2>
        <div className="flex items-center justify-center space-x-2 mt-2">
          <span className="text-4xl font-bold text-gray-900">
            ${stockData?.price?.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-500">Daily High</p>
          <p className="text-xl font-bold text-gray-900">
            ${stockData?.dailyHigh?.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-500">Daily Low</p>
          <p className="text-xl font-bold text-gray-900">
            ${stockData?.dailyLow?.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-500">Opening Price</p>
          <p className="text-xl font-bold text-gray-900">
            ${stockData?.openingPrice?.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-500">Current Price</p>
          <p className="text-xl font-bold text-gray-900">
            ${stockData?.price?.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockWidget;
