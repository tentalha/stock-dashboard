import { axiosInstance } from "../services/http.service";

export interface StockPrice {
  symbol: string;
  price: number;
  dailyHigh: number;
  dailyLow: number;
  openingPrice: number;
}

export interface StockHistoryPoint {
  date: string;
  close: number;
}

export interface StockHistory {
  symbol: string;
  data: StockHistoryPoint[];
}

export const fetchCurrentStockPrice = async (
  symbol: string
): Promise<StockPrice> => {
  try {
    const { data } = await axiosInstance.get(`/stocks/realtime/${symbol}`);
    const timeSeries = data.data;

    const latestTimestamp = Object.keys(timeSeries).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    )[0];

    const {
      "1. open": open,
      "2. high": high,
      "3. low": low,
      "4. close": close,
    } = timeSeries[latestTimestamp];

    return {
      symbol,
      price: Number(close),
      dailyHigh: Number(high),
      dailyLow: Number(low),
      openingPrice: Number(open),
    };
  } catch (error) {
    console.error("Error fetching stock price:", error);
    throw error;
  }
};

export const fetchStockHistory = async (
  symbol: string,
  selectedRange: string = "1M"
): Promise<StockHistory> => {
  try {
    const { data } = await axiosInstance.get(
      `/stocks/historical/${symbol}?range=${selectedRange}`
    );
    const history = data.data;

    const graphData: StockHistoryPoint[] = Object.entries(history).map(
      ([date, values]) => ({
        date,
        close: Number(values["4. close"]),
      })
    );

    graphData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return {
      symbol,
      data: graphData,
    };
  } catch (error) {
    console.error(`Error fetching stock history for ${symbol}:`, error);
    throw error; // Rethrow or return a fallback if needed
  }
};
