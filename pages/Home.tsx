
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gender } from '../types';

interface HomeProps {
  gender: Gender;
  setGender: (g: Gender) => void;
}

const Home: React.FC<HomeProps> = ({ gender, setGender }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const trending = [
    { title: "Dior Sauvage", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC80BaI6vlLb2IEp6Zupf_URddWPPGdbSu0FXXW8bu86O4Wk50OR5y1TLMi39Yg3v12t3ooZQBuiQWOXRiPKlkU4qlpZRWI9qQtXr-K5OK4BDBf-QIDl5_k5ou_hOPOg2tqNAWYrSFta5vUh4viYaXNpYLtr-X6Iai5TlZxZf1RM3T_0WGrD3UzORZDtsG0cPK7OwhcLDNJkkHhSM-Y08QT1TU_fdRiX79JKskwTsk6EvtSTz4hlmd5XNIbBrOl0xKVuZmst8zXuMs" },
    { title: "Estée Lauder Night Repair", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAf571NTbi7bPVrwOcjrIhvt_o_-wPxMOhgVcamsaVxX7gHeXnnrRK92Rm6HL76jlUh4XUqQiQ-_DN4qwhYYz7i6fuJwZxnZzkFE1uEzC9JqGfdeMBGWt_7WhYePttu9yN5p84IdTwVkEl65uELE7eyGy2Kx25hdJ-weg_9gFuwFKAOBcG2yJnMWSQcTInPHrcKliPGAdHaRiQvnqGdYfviL1xPpmjwpRxmNsoJcqXYEFTUGPfEUb3aB9Zmm8xnEJTxVz0SwXiTJCU" },
    { title: "Rituals The Ritual of Sakura", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAA2fPCJiCdIauch5JN8RP5AbWpOny070efogwCS-4tJoRguGFtuNqYF_lJiKvlyoa9f3nh--eemTcrgMh-6NrnHjnoA1stnaB8IG5aOx45ynA-I9n3-zFx8i-Qy8FFNmRRWNIatTlAABw8h8VPWml2erOS_bpGTpZ0MPDaGWMry7y834BjRpBGCpx7-8EPIwTIxHNLmX0n44I0Wu8ZmnBR_8jW5DKtQhja1T3u2thXdW6V1ggjzArTDBrVWDt8HeewMuXL1jOd2So" },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-y-auto pb-24">
      <header className="flex items-center px-4 py-4 justify-between sticky top-0 z-20 bg-background-dark/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-12 border-2 border-primary" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6mgHP1rSn2FP3lrEYBJBpcYndzWjZ5xo0Rp2G4nY44ru0513AwK-WE85XXj7DTGX22LMYTtw6EI5bPJJ9Y4Mcc2n8jPD-0XgFqLrZSBMMorQr3NxttjkjQQdhfk-1GqjFOowqzCSZkoPUsRUxlDrC-QX9Pl73_0ANJoApQzFQnfHlkC3sr1rEmdMzJ0Gs0DpvC32uI1bVccabuYOqLzufa3pWY0sH7eBTQKEh9_5PvHOMn2XrtOjWT9F8j6ZDs8y7_nF64qrru7w")' }}></div>
            <div className="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-background-dark"></div>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold leading-tight">ICI Paris XL Agent</h2>
            <p className="text-text-secondary text-xs font-medium">Netherlands Personal Beauty Expert</p>
          </div>
        </div>
        <button className="flex items-center justify-center rounded-full size-10 text-white hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      <main className="flex-1 px-4 pt-6 space-y-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center w-full">
            <div className="bg-surface-dark p-1 rounded-full flex relative w-full max-w-[240px]">
              <button
                onClick={() => setGender(Gender.FEMALE)}
                className={`flex-1 py-2.5 text-center text-sm font-semibold rounded-full transition-all ${
                  gender === Gender.FEMALE ? 'bg-[#2A4034] text-white shadow-sm' : 'text-text-secondary'
                }`}
              >
                Female
              </button>
              <button
                onClick={() => setGender(Gender.MALE)}
                className={`flex-1 py-2.5 text-center text-sm font-semibold rounded-full transition-all ${
                  gender === Gender.MALE ? 'bg-[#2A4034] text-white shadow-sm' : 'text-text-secondary'
                }`}
              >
                Male
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
            <div className="relative flex items-center bg-surface-dark rounded-[2rem] p-1.5 shadow-lg border border-white/5">
              <input
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-text-secondary px-5 py-4 text-base"
                placeholder="Find anything from ICI Paris XL..."
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="bg-primary hover:bg-primary/90 text-background-dark rounded-full p-3.5 flex items-center justify-center transition-transform active:scale-95 shrink-0 shadow-md shadow-primary/20"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-white text-lg font-bold tracking-tight px-1">Dutch Favourites</h3>
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar snap-x snap-mandatory">
            {trending.map((item, idx) => (
              <div
                key={idx}
                className="snap-start shrink-0 relative w-36 h-52 rounded-[1.5rem] overflow-hidden group cursor-pointer"
                onClick={() => navigate(`/search?q=${encodeURIComponent(item.title)}`)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url("${item.img}")` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <p className="absolute bottom-4 left-4 right-4 text-white text-base font-bold leading-tight">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
