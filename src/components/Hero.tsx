
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-emerald relative overflow-hidden" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', backgroundImage: 'linear-gradient(135deg, #0D553F 0%, #1A7A5E 100%)' }}>
      {/* Pattern background - ensure it covers full width */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none w-full">
        {Array.from({ length: 144 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center text-white/10">
            <span className="text-2xl">+</span>
          </div>
        ))}
      </div>
      
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Arabic calligraphy */}
        <div className="text-center mb-6 animate-fade-in-slow">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-gold arabic-calligraphy">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
          </h2>
          <p className="text-white/80 text-lg md:text-xl">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>
        
        {/* Main heading */}
        <div className="text-center mb-8 animate-fade-in animate-delay-100">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Illuminate Your Path with Knowledge
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-white/80 px-4">
            Embark on a journey of spiritual and intellectual growth with our premium Islamic education platform
          </p>
        </div>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in animate-delay-200 justify-center">
          <a href="/courses" className="px-10 py-3 bg-gold text-black font-semibold rounded-md hover:bg-gold-light transition-colors">
            Explore Courses
          </a>
          <a href="/quizzes" className="px-10 py-3 bg-white text-emerald font-semibold rounded-md hover:bg-white/90 transition-colors">
            Take a Quiz
          </a>
        </div>
        
        {/* Search bar */}
        <div className="w-full max-w-2xl mx-auto px-4 animate-fade-in animate-delay-300">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for courses, quizzes, or topics..."
              className="w-full py-4 px-5 pr-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
