
import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface ProductDetailsProps {
  toggleSave: (id: string) => void;
  savedProducts: string[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ toggleSave, savedProducts }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product as Product;
  const [ingredientsOpen, setIngredientsOpen] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background-dark text-white p-10 text-center">
        <p className="mb-6 opacity-60 font-medium">Product niet gevonden.</p>
        <button onClick={() => navigate('/')} className="bg-primary text-background-dark px-10 py-3 rounded-full font-black uppercase tracking-widest text-xs">Ga Terug</button>
      </div>
    );
  }

  const isSaved = savedProducts.includes(product.id);

  const handleBuyNow = () => {
    // Priority 1: Direct URL from AI
    // Priority 2: Direct Search on ICI Paris XL Website (nl version)
    const directUrl = product.productUrl;
    if (directUrl && directUrl.startsWith('http') && directUrl.includes('iciparisxl')) {
      window.open(directUrl, '_blank');
    } else {
      const fallbackSearch = `https://www.iciparisxl.nl/nl/search?text=${encodeURIComponent(product.brand + ' ' + product.name)}`;
      window.open(fallbackSearch, '_blank');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background-dark overflow-y-auto pb-40 no-scrollbar">
      {/* Absolute Header Navigation */}
      <div className="fixed top-0 left-0 w-full z-50 p-4 flex items-center justify-between pointer-events-none">
        <button
          onClick={() => navigate(-1)}
          className="size-11 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white pointer-events-auto active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <button
          onClick={() => toggleSave(product.id)}
          className={`size-11 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/10 pointer-events-auto active:scale-95 transition-all ${isSaved ? 'text-primary' : 'text-white'}`}
        >
          <span className={`material-symbols-outlined ${isSaved ? 'font-filled' : ''}`}>favorite</span>
        </button>
      </div>

      {/* High-Impact Hero Container */}
      <div className="relative w-full aspect-square bg-white flex items-center justify-center p-12 overflow-hidden shadow-inner">
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-w-full max-h-full object-contain relative z-10"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=800&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Main Content Area */}
      <main className="px-6 -mt-12 relative z-10 space-y-8 bg-background-dark rounded-t-[2.5rem] pt-8">
        <div className="space-y-1">
          <p className="text-primary text-xs font-black uppercase tracking-[0.2em]">{product.brand}</p>
          <h1 className="text-2xl font-bold text-white leading-tight tracking-tight">{product.name}</h1>
          <div className="flex items-center justify-between pt-4">
            <span className="text-3xl font-black text-white">{product.price}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                {product.category}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-4 h-[1px] bg-primary"></span>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">Informatie</h3>
          </div>
          <p className="text-neutral-300 text-sm leading-relaxed font-medium">
            {product.description}
          </p>
        </div>

        {/* Collapsible Ingredients Section - Hidden by default */}
        <div className="border-t border-white/5 pt-6">
          <button 
            onClick={() => setIngredientsOpen(!ingredientsOpen)}
            className="w-full flex items-center justify-between text-white group"
          >
            <div className="flex items-center gap-2">
                <span className="w-4 h-[1px] bg-neutral-700"></span>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">Ingrediënten</h3>
            </div>
            <span className={`material-symbols-outlined transition-transform duration-300 text-neutral-500 group-hover:text-primary ${ingredientsOpen ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          
          <div className={`overflow-hidden transition-all duration-500 ${ingredientsOpen ? 'max-h-96 mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing, i) => (
                <span key={i} className="text-[10px] font-bold text-neutral-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 uppercase tracking-wider">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Bar (Responsive Buy Button) */}
      <div className="fixed bottom-0 left-0 w-full px-4 py-6 bg-background-dark/80 backdrop-blur-2xl border-t border-white/5 z-50 pb-12">
        <button 
          onClick={handleBuyNow}
          className="w-full h-16 bg-primary hover:bg-[#4ff592] active:scale-[0.97] transition-all rounded-2xl flex items-center justify-center gap-4 shadow-2xl shadow-primary/20"
        >
          <span className="text-background-dark font-black uppercase tracking-[0.1em] text-sm">Nu Kopen bij ICI Paris XL</span>
          <span className="material-symbols-outlined text-background-dark text-xl">shopping_bag</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
