import { createSlice } from "@reduxjs/toolkit";

interface StockState {
  selectedSymbol: string;
  selectedTimeRange: string;
}

const initialState: StockState = {
  selectedSymbol: "AAPL",
  selectedTimeRange: "1M",
};

// Define the action type inline instead of importing PayloadAction
const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setSelectedSymbol: (state, action: { payload: string }) => {
      state.selectedSymbol = action.payload;
    },
    setSelectedTimeRange: (state, action: { payload: string }) => {
      state.selectedTimeRange = action.payload;
    },
  },
});

export const { setSelectedSymbol, setSelectedTimeRange } = stockSlice.actions;
export default stockSlice.reducer;
