
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gender } from '../types';

interface HomeProps {
  gender: Gender;
  setGender: (g: Gender) => void;
  onSearch?: (q: string) => void;
}

const Home: React.FC<HomeProps> = ({ gender, setGender, onSearch }) => {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const navigate = useNavigate();

  const placeholders = [
    "A long-wear red lipstick for date night",
    "Daily SPF for sensitive skin",
    "Serum for my fine lines",
    "Which lip tint looks better with my makeup",
    "How to get the smoky eye with glitter "
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;
    if (onSearch) {
      onSearch(query);
      setQuery('');
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const trending = [
    { title: "Glass skin for my date", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC80BaI6vlLb2IEp6Zupf_URddWPPGdbSu0FXXW8bu86O4Wk50OR5y1TLMi39Yg3v12t3ooZQBuiQWOXRiPKlkU4qlpZRWI9qQtXr-K5OK4BDBf-QIDl5_k5ou_hOPOg2tqNAWYrSFta5vUh4viYaXNpYLtr-X6Iai5TlZxZf1RM3T_0WGrD3UzORZDtsG0cPK7OwhcLDNJkkHhSM-Y08QT1TU_fdRiX79JKskwTsk6EvtSTz4hlmd5XNIbBrOl0xKVuZmst8zXuMs" },
    { title: "Sunscreen for my holiday", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAf571NTbi7bPVrwOcjrIhvt_o_-wPxMOhgVcamsaVxX7gHeXnnrRK92Rm6HL76jlUh4XUqQiQ-_DN4qwhYYz7i6fuJwZxnZzkFE1uEzC9JqGfdeMBGWt_7WhYePttu9yN5p84IdTwVkEl65uELE7eyGy2Kx25hdJ-weg_9gFuwFKAOBcG2yJnMWSQcTInPHrcKliPGAdHaRiQvnqGdYfviL1xPpmjwpRxmNsoJcqXYEFTUGPfEUb3aB9Zmm8xnEJTxVz0SwXiTJCU" },
    { title: "How to minimise pores", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAA2fPCJiCdIauch5JN8RP5AbWpOny070efogwCS-4tJoRguGFtuNqYF_lJiKvlyoa9f3nh--eemTcrgMh-6NrnHjnoA1stnaB8IG5aOx45ynA-I9n3-zFx8i-Qy8FFNmRRWNIatTlAABw8h8VPWml2erOS_bpGTpZ0MPDaGWMry7y834BjRpBGCpx7-8EPIwTIxHNLmX0n44I0Wu8ZmnBR_8jW5DKtQhja1T3u2thXdW6V1ggjzArTDBrVWDt8HeewMuXL1jOd2So" },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-y-auto pb-12 px-4 pt-6 no-scrollbar bg-background-dark">
      <main className="flex-1 space-y-12">
        <div className="flex flex-col gap-10">
          <div className="flex justify-center w-full">
            <div className="bg-white p-1.5 rounded-2xl flex relative w-full max-w-[300px] border border-black/5 shadow-sm">
              <button
                onClick={() => setGender(Gender.FEMALE)}
                className={`flex-1 py-3 text-center text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                  gender === Gender.FEMALE ? 'sun-button-gradient text-white hover:shadow-sun-glow' : 'text-text-secondary'
                }`}
              >
                Female
              </button>
              <button
                onClick={() => setGender(Gender.MALE)}
                className={`flex-1 py-3 text-center text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                  gender === Gender.MALE ? 'sun-button-gradient text-white hover:shadow-sun-glow' : 'text-text-secondary'
                }`}
              >
                Male
              </button>
            </div>
          </div>

          <div className="relative group px-1">
            <div className="absolute -inset-2 bg-gradient-to-r from-soleil-gold/20 via-white/40 to-soleil-gold/20 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-80 transition duration-700"></div>
            <div className="relative flex items-center bg-white rounded-[2rem] p-3 shadow-xl border border-black/5 group-hover:border-soleil-gold/40 transition-colors">
              <input
                className="flex-1 bg-transparent border-none focus:ring-0 text-text-primary placeholder:text-text-secondary/50 px-6 py-6 text-sm font-black animate-shimmer"
                placeholder={placeholders[placeholderIndex]}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="sun-button-gradient text-white rounded-[1.5rem] size-16 flex items-center justify-center transition-all active:scale-90 shrink-0 hover:shadow-sun-glow-lg"
              >
                <span className="material-symbols-outlined font-black text-2xl">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-text-primary text-lg font-black tracking-widest uppercase">Trending ⚡️</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 no-scrollbar snap-x snap-mandatory">
            {trending.map((item, idx) => (
              <div
                key={idx}
                className="snap-start shrink-0 relative w-44 h-60 rounded-3xl overflow-hidden group cursor-pointer border border-black/5 shadow-md"
                onClick={() => {
                  if (onSearch) onSearch(item.title);
                  else navigate(`/search?q=${encodeURIComponent(item.title)}`);
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url("${item.img}")` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-bold leading-tight line-clamp-2 drop-shadow-md">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
