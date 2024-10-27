import React from "react";

const SearchAndFilter = ({ searchTerm, setSearchTerm, sortOption, setSortOption, vsCurrency, setVsCurrency }) => (
  <div className="flex justify-center mb-8 space-x-4">
    <input
      type="text"
      placeholder="Search by name..."
      className="px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
    />
    <select
      className="px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="market_cap">Sort by Market Cap</option>
      <option value="price">Sort by Price</option>
    </select>
    <select
      className="px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      value={vsCurrency}
      onChange={(e) => setVsCurrency(e.target.value)}
    >
      <option value="usd">USD</option>
      <option value="eur">EUR</option>
      <option value="gbp">GBP</option>
      <option value="jpy">JPY</option>
    </select>
  </div>
);

export default SearchAndFilter;
