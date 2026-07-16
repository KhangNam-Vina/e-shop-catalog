import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Giả lập thời gian load trang (1.5 giây)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Nếu đang loading thì hiển thị màn hình chờ
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <Footer />
        <BackToTop />
      </div>
    </BrowserRouter>
  );
}