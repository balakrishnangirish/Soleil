
import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface ProductDetailsProps {
  toggleSave: (id: string) => void;
  savedProducts: string[];
  isSignedIn: boolean;
  onSignUpClick: () => void;
  onAIChat?: (product: Product) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ toggleSave, savedProducts, isSignedIn, onSignUpClick, onAIChat }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product as Product;
  
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [collections, setCollections] = useState(['Wishlist', 'Skincare Routine', 'Holy Grails']);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('Wishlist');

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background-dark text-text-primary p-10 text-center">
        <p className="mb-6 opacity-60 font-medium text-sm">Product niet gevonden.</p>
        <button onClick={() => navigate('/')} className="sun-button-gradient text-white px-10 py-3 rounded-full font-black uppercase tracking-widest text-[10px] hover:shadow-sun-glow transition-shadow">Ga Terug</button>
      </div>
    );
  }

  const isSaved = savedProducts.includes(product.id);

  const handleSaveClick = () => {
    if (isSignedIn) {
      setIsCollectionModalOpen(true);
    } else {
      toggleSave(product.id);
    }
  };

  const handleChatClick = () => {
    if (onAIChat) {
      onAIChat(product);
    }
  };

  const handleAddToCollection = () => {
    if (!isSaved) toggleSave(product.id);
    setIsCollectionModalOpen(false);
  };

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    setCollections([...collections, newCollectionName.trim()]);
    setSelectedCollection(newCollectionName.trim());
    setNewCollectionName('');
  };

  const buyUrl = (product.productUrl && product.productUrl.startsWith('http')) 
    ? product.productUrl 
    : `https://www.iciparisxl.nl/nl/search?text=${encodeURIComponent(product.brand + ' ' + product.name)}`;

  return (
    <div className="flex-1 flex flex-col bg-background-dark overflow-y-auto pb-32 no-scrollbar relative">
      <div className="sticky top-0 left-0 w-full z-40 p-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-black/5">
        <button
          onClick={() => navigate(-1)}
          className="size-10 flex items-center justify-center rounded-full bg-white border border-black/5 text-text-primary active:scale-95 transition-all shadow-sm hover:shadow-sun-glow"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <div className="flex-1 text-center px-4">
           <p className="text-soleil-gold-warm text-[9px] font-black uppercase tracking-widest">Product Detail</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleChatClick}
            className="size-10 flex items-center justify-center rounded-full bg-white border border-soleil-gold/30 text-soleil-gold-warm active:scale-95 transition-all shadow-sm hover:shadow-sun-glow"
          >
            <span className="material-symbols-outlined text-xl font-filled">auto_awesome</span>
          </button>
          <button
            onClick={handleSaveClick}
            className={`size-10 flex items-center justify-center rounded-full bg-white border border-black/5 active:scale-95 transition-all shadow-sm ${isSaved ? 'text-rose-500 border-rose-100 shadow-rose-100' : 'text-text-primary hover:shadow-sun-glow'}`}
          >
            <span className={`material-symbols-outlined text-xl ${isSaved ? 'font-filled' : ''}`}>
              favorite
            </span>
          </button>
        </div>
      </div>

      <div className="relative w-full aspect-square bg-white flex items-center justify-center p-12 overflow-hidden shadow-inner">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="max-w-full max-h-full object-contain relative z-10 transition-opacity duration-500 opacity-0"
          onLoad={(e) => {
            (e.currentTarget as HTMLImageElement).classList.remove('opacity-0');
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=800&auto=format&fit=crop";
            (e.currentTarget as HTMLImageElement).classList.remove('opacity-0');
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent pointer-events-none"></div>
      </div>

      <main className="px-6 -mt-8 relative z-10 space-y-8 bg-white rounded-t-[2.5rem] pt-8 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] min-h-[50vh]">
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-soleil-gold-warm text-[10px] font-black uppercase tracking-[0.2em]">{product.brand}</p>
            <h1 className="text-xl font-bold text-text-primary leading-tight tracking-tight">{product.name}</h1>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`material-symbols-outlined text-sm ${i < Math.floor(product.rating || 0) ? 'text-soleil-gold font-filled' : 'text-black/10'}`}>star</span>
                ))}
                <span className="text-[11px] font-black text-text-primary ml-1">{product.rating}</span>
             </div>
             <div className="h-4 w-px bg-black/5"></div>
             <p className="text-[10px] font-bold text-text-secondary underline decoration-soleil-gold/30 underline-offset-4">{product.reviewCount?.toLocaleString()} reviews</p>
          </div>

          <div className="flex items-center justify-between pt-4 pb-2 border-b border-black/5">
            <span className="text-2xl font-black text-text-primary">{product.price}</span>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest bg-background-dark px-4 py-1.5 rounded-full border border-black/5">
                {product.category}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-[2px] sun-button-gradient"></span>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Informatie</h3>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed font-medium">
            {product.description}
          </p>
        </div>

        <div className="border-t border-black/5 pt-6 pb-4">
          <button 
            onClick={() => setIngredientsOpen(!ingredientsOpen)}
            className="w-full flex items-center justify-between text-text-primary group"
          >
            <div className="flex items-center gap-2">
                <span className="w-4 h-[1px] bg-black/5"></span>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Ingrediënten</h3>
            </div>
            <span className={`material-symbols-outlined transition-transform duration-300 text-text-secondary group-hover:text-soleil-gold ${ingredientsOpen ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          
          <div className={`overflow-hidden transition-all duration-500 ${ingredientsOpen ? 'max-h-96 mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing, i) => (
                <span key={i} className="text-[9px] font-bold text-text-secondary bg-background-dark px-3 py-1.5 rounded-lg border border-black/5 uppercase tracking-wider">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full px-4 py-6 bg-white/80 backdrop-blur-xl border-t border-black/5 z-50">
        <a 
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-14 sun-button-gradient active:scale-[0.97] transition-all rounded-2xl flex items-center justify-center gap-3 hover:shadow-sun-glow-lg no-underline"
        >
          <span className="text-white font-black uppercase tracking-[0.1em] text-xs">Nu Kopen</span>
          <span className="material-symbols-outlined text-white text-lg">shopping_bag</span>
        </a>
      </div>

      {isCollectionModalOpen && (
        <div className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="px-6 py-5 border-b border-black/5 flex items-center justify-between">
              <h3 className="text-text-primary font-black uppercase tracking-widest text-[11px]">Add to Collection</h3>
              <button onClick={() => setIsCollectionModalOpen(false)} className="size-8 rounded-full bg-black/5 flex items-center justify-center text-text-secondary">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                {collections.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedCollection(col)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all ${selectedCollection === col ? 'bg-soleil-gold/10 border-soleil-gold text-text-primary' : 'bg-background-dark border-black/5 text-text-secondary'}`}
                  >
                    <span className="text-xs font-bold">{col}</span>
                    {selectedCollection === col && (
                      <span className="material-symbols-outlined text-soleil-gold text-lg font-filled">check_circle</span>
                    )}
                  </button>
                ))}
              </div>

              <form onSubmit={handleCreateCollection} className="relative flex items-center gap-2">
                <input
                  type="text"
                  placeholder="New collection name..."
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  className="flex-1 bg-background-dark border border-black/5 rounded-xl px-4 py-3 text-[11px] font-bold focus:ring-2 focus:ring-soleil-gold focus:border-soleil-gold transition-all"
                />
                <button type="submit" className="size-11 sun-button-gradient rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm active:scale-90">
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
              </form>

              <button 
                onClick={handleAddToCollection}
                className="w-full bg-text-primary text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:shadow-sun-glow transition-all active:scale-95"
              >
                Save Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
