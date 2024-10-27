# Cryptocurrency Dashboard

This project is a cryptocurrency dashboard built with React and Vite, using the CoinGecko API to display real-time data on various cryptocurrencies. It allows users to browse, paginate, and visualize cryptocurrency data within a responsive and interactive UI.

## Features

1. **Data Fetching from CoinGecko API**
   - Fetches live data on cryptocurrencies using the CoinGecko API.
   - Displays essential information: Name, Symbol, Current Price, 24-hour Change, and Market Cap.
   - Shows historical data visualization for each cryptocurrency.

2. **Pagination**
   - Allows users to navigate through pages of cryptocurrency data.
   - Loads data for the selected page only, optimizing performance.
   - Displays page numbers and highlights the current page for user experience.

3. **Data Caching**
   - Caches API responses for 5 minutes to minimize redundant API calls.
   - Uses `react-query` to manage caching, ensuring efficient and responsive data fetching.

4. **Responsive UI and Charts**
   - Clean and responsive UI, compatible across devices.
   - Uses `react-chartjs-2` to display cryptocurrency metrics (e.g., price, market cap) over time.
   - Provides options to select different metrics for data visualization.

5. **Error Handling and Loading States**
   - Displays loading indicators during data fetching to enhance user experience.
   - User-friendly error messages appear if data retrieval fails.

6. **Optional Enhancements**
   - Users can switch between different currencies (e.g., USD, EUR, GBP) to view data.
   - Sorting by attributes such as market cap or price.
   - Search functionality to filter cryptocurrencies by name.

## Tech Stack

- **Frontend**: React, Vite
- **Data Fetching & Caching**: React Query
- **Charts**: Chart.js, react-chartjs-2
- **Styling**: Tailwind CSS

## Requirements

- **CoinGecko API**
  - Endpoint: `/coins/markets`
  - Parameters:
    - `vs_currency`: Currency code (e.g., USD, EUR)
    - `page`: Page number for pagination
    - `per_page`: Number of results per page
- **React Query** for caching
- **Chart.js** for visualization

## Setup

1. **Clone the repository**:

   ```bash
   git clone <repo-url>
   cd <repo-directory>
