
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductDetails from './pages/ProductDetails';
import { Gender, Product } from './types';

const AppContent: React.FC = () => {
  const [gender, setGender] = useState<Gender>(Gender.FEMALE);
  const [savedProducts, setSavedProducts] = useState<string[]>([]);
  
  const toggleSave = (productId: string) => {
    setSavedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-background-dark flex flex-col relative shadow-2xl overflow-hidden">
      <Routes>
        <Route path="/" element={<Home gender={gender} setGender={setGender} />} />
        <Route path="/search" element={<SearchResults gender={gender} toggleSave={toggleSave} savedProducts={savedProducts} />} />
        <Route path="/product/:id" element={<ProductDetails toggleSave={toggleSave} savedProducts={savedProducts} />} />
      </Routes>
      <BottomNav />
    </div>
  );
};

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('home');

  const navItems = [
    { id: 'home', icon: 'home', label: 'Home', path: '/' },
    { id: 'search', icon: 'search', label: 'Search', path: '/search' },
    { id: 'saved', icon: 'favorite', label: 'Saved', path: '/' },
    { id: 'profile', icon: 'person', label: 'Profile', path: '/' },
  ];

  return (
    <div className="absolute bottom-0 left-0 w-full bg-background-dark/95 backdrop-blur-md border-t border-white/10 pb-6 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { setActive(item.id); navigate(item.path); }}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors gap-1 ${
              active === item.id ? 'text-primary' : 'text-slate-400'
            }`}
          >
            <span className={`material-symbols-outlined text-[24px] ${active === item.id ? 'font-filled' : ''}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
