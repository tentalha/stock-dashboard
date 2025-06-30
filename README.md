# Stock Market Dashboard

A React-based stock dashboard with real-time data fetching, interactive charts, and multiple timeframe views.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd stock-dashboard
   ```

2. **Setup Server**

   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Setup Client (in a new terminal)**
   ```bash
   cd client
   npm install
   npm start
   ```

Both applications should now be running:

- **Client:** `http://localhost:3000`
- **Server:** `http://localhost:5000` (or your configured port)

### ⚠️ Important: Real-time Data Configuration

**Toggle the SWITCH in the server's environment variables to control data source:**

- **SWITCH=true** → Returns real-time data from external API
- **SWITCH=false** → Returns static mock data from backend

This is crucial for development and testing. Set the environment variable in your server's `.env` file:

```env
SWITCH=true   # For real-time data
SWITCH=false  # For static/mock data
```

```
GET /stocks/realtime/{symbol}
```

## 📁 Project Structure

```
stock-dashboard/
├── server/                 # Backend API server
│   ├── package.json
│   └── ...
└── client/                 # React frontend
    ├── src/
    │   ├── components/     # React components
    │   ├── styles/         # CSS files
    │   ├── axios/          # API configuration
    │   └── App.js
    ├── package.json
    └── ...
```

## 🛠 Tech Stack

**Frontend:**

- React with Hooks (useState, useReducer)
- React Query (@tanstack/react-query) for API state management
- Recharts for data visualization
- Axios for HTTP requests
- Plain CSS for styling

**Key Features:**

- Real-time stock data fetching
- Interactive charts with multiple timeframes (1W, 1M, 3M, 1Y)
- Smart caching and background updates
- Error handling with retry logic
- State management with useReducer

## 📊 Supported Stocks

- **AAPL** - Apple Inc.
- **MSFT** - Microsoft Corp.
- **GOOG** - Alphabet Inc.

## 🔧 Configuration

### Axios Setup

Update `client/src/axios/axios.instance.js` with your API base URL:

```javascript
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Update with your server URL
  timeout: 10000,
});
```

### React Query Setup

The app uses React Query for data fetching. Make sure to wrap your app with QueryClient provider.

## 🎯 Usage

1. Start both server and client applications
2. Open browser to `http://localhost:3000`
3. Select a stock from the dropdown
4. Choose timeframe (1W, 1M, 3M, 1Y)
5. View interactive charts with real-time data

## 📡 API Endpoint

The client expects this API endpoint structure:

```
GET /stocks/realtime/{symbol}
```

## 🔍 Key Components

- **StockChartPage** - Main dashboard with useReducer state management
- **React Query** - Handles API calls with caching and retry logic
- **Recharts** - Renders interactive line charts
