import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import SearchAndFilter from "../components/SearchAndFilter";
import CryptoList from "../components/CryptoList";
import Pagination from "../components/Pagination";
; 
const HomePage = () => {
  const [page, setPage] = useState(1);
  const [vsCurrency, setVsCurrency] = useState("usd");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("market_cap");

const fetchCryptos = async (page, vsCurrency) => {
  const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
    params: {
      vs_currency: vsCurrency,
      page,
      per_page: 10,
    },
  });
  return data;
};
  const { data, error, isLoading, isError } = useQuery(
    ["cryptos", page, vsCurrency],
    () => fetchCryptos(page, vsCurrency),
    {
      keepPreviousData: true,
      staleTime: 300000,
    }
  );

  const filteredData = data?.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm)
  );

  const sortedData = filteredData?.sort((a, b) => {
    if (sortOption === "market_cap") {
      return b.market_cap - a.market_cap;
    } else if (sortOption === "price") {
      return b.current_price - a.current_price;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 py-10">
      <h1 className="text-5xl font-bold text-center text-white mb-8">Cryptocurrency List</h1>
      
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
        vsCurrency={vsCurrency}
        setVsCurrency={setVsCurrency}
      />
      
      <CryptoList
        cryptos={sortedData || []}
        vsCurrency={vsCurrency}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      
      <Pagination
        page={page}
        setPage={setPage}
        hasNextPage={!data || data.length >= 10}
      />
    </div>
  );
};

export default HomePage;
