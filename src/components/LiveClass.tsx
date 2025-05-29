
import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const LiveClass = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 52
  });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                // Reset timer for demo purposes
                days = 2;
                hours = 14;
                minutes = 36;
                seconds = 52;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('live-class-section');
    if (section) {
      observer.observe(section);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="live-class-section" className="py-20 relative bg-ivory-light overflow-hidden">
      <div className="absolute inset-0 islamic-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left side - timer */}
          <div className={cn(
            "flex-1 opacity-0",
            isVisible && "animate-fade-in opacity-100"
          )}>
            <div className="max-w-md">
              <h3 className="inline-block px-3 py-1 text-xs font-semibold bg-gold/10 text-gold rounded-full mb-4">
                UPCOMING EVENT
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Next Live Class with Sheikh Yasir Qadhi</h2>
              <p className="text-gray-600 mb-8">
                Join our upcoming live class on "Understanding the Quranic Context: Modern Applications" and interact directly with the instructor.
              </p>
              
              <div className="mb-8">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-2 text-emerald" />
                    <span className="text-sm text-gray-700">Friday, October 15th</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">2:00 PM EST</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    <span className="text-sm text-gray-700">Live on Zoom</span>
                  </div>
                </div>
              </div>
              
              <button className="gold-button">
                Reserve Your Spot
              </button>
            </div>
          </div>
          
          {/* Right side - countdown */}
          <div className={cn(
            "flex-1 opacity-0",
            isVisible && "animate-fade-in opacity-100 animate-delay-200"
          )}>
            <div className="relative">
              <div className="absolute inset-0 bg-emerald rounded-full opacity-5 transform scale-[1.03] blur-xl"></div>
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-emerald font-bold text-xl mb-6">Next Live Class in:</h3>
                
                <div className="flex gap-4">
                  <div className="w-28 h-28 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center border border-emerald/10 animate-float">
                    <span className="text-4xl font-bold text-emerald">{timeLeft.days}</span>
                    <span className="text-gray-500 text-sm">Days</span>
                  </div>
                  
                  <div className="w-28 h-28 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center border border-emerald/10 animate-float" style={{ animationDelay: '0.2s' }}>
                    <span className="text-4xl font-bold text-emerald">{timeLeft.hours}</span>
                    <span className="text-gray-500 text-sm">Hours</span>
                  </div>
                  
                  <div className="w-28 h-28 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center border border-emerald/10 animate-float" style={{ animationDelay: '0.4s' }}>
                    <span className="text-4xl font-bold text-emerald">{timeLeft.minutes}</span>
                    <span className="text-gray-500 text-sm">Minutes</span>
                  </div>
                  
                  <div className="w-28 h-28 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center border border-emerald/10 animate-float" style={{ animationDelay: '0.6s' }}>
                    <span className="text-4xl font-bold text-emerald">{timeLeft.seconds}</span>
                    <span className="text-gray-500 text-sm">Seconds</span>
                  </div>
                </div>

                <div className="mt-8 bg-gold/10 text-gold px-4 py-3 rounded-lg text-sm">
                  <span className="font-medium">Limited Spots Available!</span> Only 50 places remain for this exclusive live session.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveClass;
