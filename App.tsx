
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import Collections from './pages/Collections';
import BeautyAnalysis from './pages/BeautyAnalysis';
import AuthFlow from './components/AuthFlow';
import AuthPromptModal from './components/AuthPromptModal';
import ChatInterface from './components/ChatInterface';
import { Gender, Product, BeautyProfile } from './types';

const Header: React.FC<{ 
  isSignedIn: boolean; 
  setIsSignedIn: (v: boolean) => void;
  onSignUpClick: () => void;
}> = ({ isSignedIn, setIsSignedIn, onSignUpClick }) => {
  const navigate = useNavigate();
  
  return (
    <header className="flex items-center px-6 py-5 justify-between sticky top-0 z-[60] bg-white/95 backdrop-blur-md border-b border-black/5">
      <Link to="/" className="flex items-center gap-4 no-underline active:scale-95 transition-transform group">
        <div className="relative size-14 shrink-0">
          <div className="relative size-full overflow-hidden rounded-full border-2 border-soleil-gold bg-white p-0.5">
            <div className="size-full rounded-full overflow-hidden bg-white flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=200&auto=format&fit=crop" 
                alt="Soleil Brand Logo" 
                className="w-full h-full object-cover rounded-full transition-all duration-1000 group-hover:scale-125 group-hover:rotate-[15deg] brightness-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://api.dicebear.com/7.x/initials/svg?seed=S&backgroundColor=FFD700';
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-text-primary text-3xl font-black leading-none tracking-tight animate-shimmer">Soleil</h2>
          <p className="text-soleil-gold-warm text-[8px] font-black tracking-[0.25em] mt-1 uppercase">Your personal beauty AI agent</p>
        </div>
      </Link>
      {isSignedIn ? (
        <div 
          onClick={() => navigate('/profile')}
          className="size-10 rounded-full border-2 border-soleil-gold p-0.5 overflow-hidden active:scale-95 transition-transform cursor-pointer hover:shadow-sun-glow transition-shadow"
        >
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" 
            alt="Profile" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      ) : (
        <button 
          onClick={onSignUpClick}
          className="sun-button-gradient text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 hover:shadow-sun-glow-lg"
        >
          Sign Up
        </button>
      )}
    </header>
  );
};

const AppContent: React.FC = () => {
  const [gender, setGender] = useState<Gender>(Gender.FEMALE);
  const [savedProducts, setSavedProducts] = useState<string[]>(() => {
    const saved = localStorage.getItem('soleil_saved_products');
    return saved ? JSON.parse(saved) : [];
  });
  const [beautyProfile, setBeautyProfile] = useState<BeautyProfile>(() => {
    const saved = localStorage.getItem('soleil_beauty_profile');
    return saved ? JSON.parse(saved) : {
      skinType: 'Not Set',
      skinConcern: 'Not Set',
      hairType: 'Not Set',
      hairConcern: 'Not Set',
      isComplete: false
    };
  });
  const [isSignedIn, setIsSignedIn] = useState(() => {
    return localStorage.getItem('soleil_is_signed_in') === 'true';
  });
  const [showAuth, setShowAuth] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [activeQuery, setActiveQuery] = useState<string | undefined>(undefined);
  const [activeProductContext, setActiveProductContext] = useState<Product | undefined>(undefined);
  const [currentResults, setCurrentResults] = useState<Product[]>([]);
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  useEffect(() => {
    localStorage.setItem('soleil_saved_products', JSON.stringify(savedProducts));
  }, [savedProducts]);

  useEffect(() => {
    localStorage.setItem('soleil_beauty_profile', JSON.stringify(beautyProfile));
  }, [beautyProfile]);

  useEffect(() => {
    localStorage.setItem('soleil_is_signed_in', String(isSignedIn));
  }, [isSignedIn]);
  
  const toggleSave = (productId: string) => {
    if (!isSignedIn) {
      setShowAuthPrompt(true);
      return;
    }
    setSavedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const handleAuthComplete = () => {
    setIsSignedIn(true);
    setShowAuth(false);
    setShowAuthPrompt(false);
  };

  const handleGlobalSearch = (q: string) => {
    setActiveQuery(q);
    setActiveProductContext(undefined);
    setIsChatExpanded(true);
    setTimeout(() => setActiveQuery(undefined), 100);
  };

  const handleProductChat = (product: Product) => {
    setActiveProductContext(product);
    setActiveQuery(`Tell me more about ${product.brand} ${product.name}. Are there different sizes or versions?`);
    setIsChatExpanded(true);
    setTimeout(() => setActiveQuery(undefined), 100);
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-background-dark flex flex-col relative shadow-2xl overflow-hidden">
      <Header 
        isSignedIn={isSignedIn} 
        setIsSignedIn={setIsSignedIn} 
        onSignUpClick={() => setShowAuth(true)}
      />
      <div className="flex-1 overflow-hidden relative flex flex-col">
        <Routes>
          <Route path="/" element={<Home gender={gender} setGender={setGender} onSearch={handleGlobalSearch} />} />
          <Route path="/search" element={
            <SearchResults 
              products={currentResults} 
              query={activeQuery || ''} 
              onAIChat={handleProductChat} 
              toggleSave={toggleSave}
              savedProducts={savedProducts}
              isSignedIn={isSignedIn}
            />
          } />
          <Route path="/product/:id" element={
            <ProductDetails 
              toggleSave={toggleSave} 
              savedProducts={savedProducts} 
              isSignedIn={isSignedIn} 
              onSignUpClick={() => setShowAuth(true)} 
              onAIChat={handleProductChat}
            />
          } />
          <Route path="/profile" element={
            <Profile 
              isSignedIn={isSignedIn} 
              setIsSignedIn={setIsSignedIn} 
              savedProductIds={savedProducts}
              beautyProfile={beautyProfile}
            />
          } />
          <Route path="/collections" element={
            <Collections 
              isSignedIn={isSignedIn}
              savedProductIds={savedProducts}
            />
          } />
          <Route path="/analysis" element={
            <BeautyAnalysis 
              onComplete={(data) => {
                setBeautyProfile({ ...data, isComplete: true });
              }}
            />
          } />
        </Routes>
      </div>

      <ChatInterface 
        gender={gender} 
        initialQuery={activeQuery} 
        productContext={activeProductContext}
        onResultsUpdate={setCurrentResults}
        isOpen={isChatExpanded}
        setIsOpen={setIsChatExpanded}
      />

      {showAuthPrompt && (
        <AuthPromptModal 
          onSignUp={() => {
            setShowAuthPrompt(false);
            setShowAuth(true);
          }} 
          onClose={() => setShowAuthPrompt(false)} 
        />
      )}

      {showAuth && (
        <AuthFlow onComplete={handleAuthComplete} onClose={() => setShowAuth(false)} />
      )}
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
