import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './pages/HomePage';
import CryptoDetailPage from './pages/CryptoDetailPage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crypto/:id" element={<CryptoDetailPage />} /> 
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
