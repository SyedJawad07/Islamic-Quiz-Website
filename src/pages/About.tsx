
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutUs from '@/components/AboutUs';
import { cn } from '@/lib/utils';

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className={cn(
        "pt-10 pb-16 bg-emerald relative mt-16",
        "bg-gradient-to-b from-emerald to-emerald-dark"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={cn(
            "text-center mb-8 opacity-0 transform translate-y-4",
            isLoaded && "animate-slide-up opacity-100 translate-y-0 transition-all duration-700"
          )}>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">About Our Mission</h1>
            <p className="max-w-2xl mx-auto text-lg text-white/80">
              Dedicated to spreading authentic Islamic knowledge and fostering a deeper understanding of the faith
            </p>
          </div>
        </div>
      </div>
      
      <AboutUs />
      
      <Footer />
    </div>
  );
};

export default About;
