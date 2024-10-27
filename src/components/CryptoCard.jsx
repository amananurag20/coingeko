import React from "react";
import { useNavigate } from "react-router-dom";

const CryptoCard = ({ crypto, vsCurrency }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer hover:shadow-xl"
      onClick={() => navigate(`/crypto/${crypto.id}`)}
    >
      <img src={crypto.image} alt={crypto.name} className="w-16 h-16 mx-auto mb-4 rounded-full shadow-md" />
      <h2 className="text-2xl font-semibold text-blue-400 text-center">{crypto.name}</h2>
      <p className="text-center text-gray-400 mb-2">Symbol: {crypto.symbol.toUpperCase()}</p>
      <p className="text-center text-gray-300 mb-1">
        Price: {vsCurrency.toUpperCase()} {crypto.current_price.toLocaleString()}
      </p>
      <p className={`text-center ${crypto.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'} mb-1`}>
        24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
      </p>
      <p className="text-center text-gray-400">
        Market Cap: {vsCurrency.toUpperCase()} {crypto.market_cap.toLocaleString()}
      </p>
    </div>
  );
};

export default CryptoCard;
