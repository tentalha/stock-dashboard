import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StockHistory } from "../../utils/api";

interface StockChartProps {
  stockHistory: StockHistory | undefined;
  isLoading: boolean;
  error: Error | null;
  timeRange: string;
}

const StockChart: React.FC<StockChartProps> = ({
  stockHistory = [],
  error,
  timeRange,
}) => {
  if (error || !stockHistory) {
    console.log(error);
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-red-500 h-80 flex items-center justify-center">
          <p>
            {error?.response?.data?.message || "Some unexpected error occurred"}
          </p>
        </div>
      </div>
    );
  }

  const formatXAxisTick = (value: string) => {
    const date = new Date(value);
    if (timeRange === "1W") {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else if (timeRange === "1M") {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatTooltipLabel = (value: string) => {
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {stockHistory?.symbol} - Closing Price ({timeRange})
        </h3>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={stockHistory.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxisTick}
            stroke="#666"
            fontSize={12}
          />
          <YAxis
            domain={["dataMin - 5", "dataMax + 5"]}
            tickFormatter={(value) => `${value.toFixed(0)}`}
            stroke="#666"
            fontSize={12}
          />
          <Tooltip
            labelFormatter={formatTooltipLabel}
            formatter={(value: number) => [
              `${value.toFixed(2)}`,
              "Close Price",
            ]}
            contentStyle={{
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              stroke: "#3b82f6",
              strokeWidth: 2,
              fill: "#fff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
