import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { ClipLoader } from "react-spinners"; 
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
} from 'chart.js';
import { useState } from "react";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale
);

const fetchCryptoDetails = async (id) => {
  const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
  return data;
};

const fetchCryptoHistory = async (id) => {
  const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: '30',
      interval: 'daily',
    },
  });
  return data;
};

const CryptoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: cryptoData, error: cryptoError, isLoading: cryptoLoading, isError: cryptoIsError } = useQuery(
    ["cryptoDetail", id],
    () => fetchCryptoDetails(id)
  );

  const { data: historyData, error: historyError, isLoading: historyLoading, isError: historyIsError } = useQuery(
    ["cryptoHistory", id],
    () => fetchCryptoHistory(id)
  );
  const [selectedMetric, setSelectedMetric] = useState('price'); 

  if (cryptoLoading || historyLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#3b82f6" loading={true} size={50} />
      </div>
    );
  }
  if (cryptoIsError) return <div>Error: {cryptoError.message}</div>;
  if (historyIsError) return <div>Error: {historyError.message}</div>;

  const chartData = {
    labels: historyData.prices.map(price => {
      const date = new Date(price[0]);
      return date.toLocaleDateString();
    }),
    datasets: [
      {
        label: selectedMetric === 'price' ? `${cryptoData.name} Price (Last 30 Days)` : `${cryptoData.name} Market Cap (Last 30 Days)`,
        data: selectedMetric === 'price' ? historyData.prices.map(price => price[1]) : historyData.market_caps.map(cap => cap[1]),
        borderColor: selectedMetric === 'price' ? 'rgba(144, 202, 249, 1)' : 'rgba(255, 99, 132, 1)',
        backgroundColor: selectedMetric === 'price' ? 'rgba(144, 202, 249, 0.2)' : 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen py-8 bg-black text-gray-300">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-400">Back</button>
      <h1 className="text-4xl font-bold text-center mb-6">{cryptoData.name} Details</h1>
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg bg-gray-800">
        <h2 className="text-2xl font-semibold">{cryptoData.symbol.toUpperCase()}</h2>
        <p>Current Price: ${cryptoData.market_data.current_price.usd}</p>
        <p>Market Cap: ${cryptoData.market_data.market_cap.usd}</p>
        <p className={`font-semibold ${cryptoData.market_data.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
          24h Change: {cryptoData.market_data.price_change_percentage_24h}%
        </p>
        <h3 className="text-xl font-semibold mt-4">Description</h3>
        <p dangerouslySetInnerHTML={{ __html: cryptoData.description.en }}></p>

        <div className="mt-4">
          <label htmlFor="metric" className="text-lg font-semibold mr-2">Select Metric:</label>
          <select
            id="metric"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-gray-700 text-gray-300 border border-gray-600 rounded p-2"
          >
            <option value="price">Price</option>
            <option value="market_cap">Market Cap</option>
          </select>
        </div>

        <div className="mt-8" style={{ minHeight: '400px' }}>
          <h3 className="text-xl font-semibold mb-4">{selectedMetric === 'price' ? 'Price' : 'Market Cap'} History</h3>
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                x: { ticks: { color: '#e5e7eb' } },
                y: { ticks: { color: '#e5e7eb' } },
              },
              plugins: {
                legend: { labels: { color: '#e5e7eb' } },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CryptoDetailPage;
