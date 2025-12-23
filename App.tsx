
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductDetails from './pages/ProductDetails';
import { Gender, Product } from './types';

const Header: React.FC<{ isSignedIn: boolean }> = ({ isSignedIn }) => {
  return (
    <header className="flex items-center px-6 py-5 justify-between sticky top-0 z-[60] bg-background-dark/95 backdrop-blur-md border-b border-white/5">
      <Link to="/" className="flex items-center gap-3 no-underline active:scale-95 transition-transform group">
        <div className="size-11 overflow-hidden rounded-full shadow-lg shadow-soleil-gold/20 border border-soleil-gold/40 bg-gradient-to-br from-soleil-gold/30 to-background-dark p-0.5">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=200&auto=format&fit=crop" 
            alt="Soleil Logo" 
            className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://api.dicebear.com/7.x/initials/svg?seed=Soleil&backgroundColor=FFD700';
            }}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-white text-2xl font-black leading-none tracking-tight">Soleil</h2>
          <p className="text-text-secondary text-[9px] font-black tracking-[0.2em] mt-1 uppercase">Your personal AI beauty agent</p>
        </div>
      </Link>
      {isSignedIn ? (
        <div className="size-10 rounded-full border-2 border-primary p-0.5 overflow-hidden active:scale-95 transition-transform cursor-pointer shadow-lg shadow-primary/20">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" 
            alt="Profile" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      ) : (
        <button className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all active:scale-95">
          Sign Up
        </button>
      )}
    </header>
  );
};

const AppContent: React.FC = () => {
  const [gender, setGender] = useState<Gender>(Gender.FEMALE);
  const [savedProducts, setSavedProducts] = useState<string[]>([]);
  // Simulated sign-in state
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  const toggleSave = (productId: string) => {
    setSavedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-background-dark flex flex-col relative shadow-2xl overflow-hidden">
      <Header isSignedIn={isSignedIn} />
      <div className="flex-1 overflow-hidden relative flex flex-col">
        <Routes>
          <Route path="/" element={<Home gender={gender} setGender={setGender} />} />
          <Route path="/search" element={<SearchResults gender={gender} toggleSave={toggleSave} savedProducts={savedProducts} />} />
          <Route path="/product/:id" element={<ProductDetails toggleSave={toggleSave} savedProducts={savedProducts} />} />
        </Routes>
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
