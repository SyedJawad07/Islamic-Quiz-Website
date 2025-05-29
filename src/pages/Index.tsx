
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedCourses from '@/components/FeaturedCourses';
import QuizSection from '@/components/QuizSection';
import Footer from '@/components/Footer';

const Index = () => {
  // Initialize page at the top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-ivory-darker overflow-x-hidden" style={{ backgroundColor: "#E6E6D2" }}>
      <Navbar />
      <Hero />
      <FeaturedCourses />
      <QuizSection />
      <Footer />
    </div>
  );
};

export default Index;
