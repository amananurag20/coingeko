import React from "react";
import CryptoCard from "./CryptoCard";
import Shimmer from "./Shimmer";

const CryptoList = ({ cryptos, vsCurrency, isLoading, isError, error }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {[...Array(10)].map((_, index) => (
          <Shimmer key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-red-500 font-semibold">Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
      {cryptos.map((crypto) => (
        <CryptoCard key={crypto.id} crypto={crypto} vsCurrency={vsCurrency} />
      ))}
    </div>
  );
};

export default CryptoList;
