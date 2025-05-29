
import React from 'react';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-emerald text-white">
      <div className="max-w-7xl mx-auto">
        {/* Top section with newsletter */}
        <div className="border-b border-white/10 py-12 px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold mb-2">Stay Connected</h3>
              <p className="text-white/70">
                Subscribe to our newsletter for exclusive lessons, spiritual insights, and special offers.
              </p>
            </div>
            
            <div className="w-full max-w-md">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 py-3 px-4 rounded-l-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
                <button className="bg-gold hover:bg-gold-light text-black font-medium py-3 px-6 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main footer content */}
        <div className="py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="text-gold">Imami</span>Mudrasa
            </h3>
            <p className="text-white/70 mb-6 text-sm">
              A global platform dedicated to Islamic education, making authentic knowledge accessible to students worldwide through technology and scholarship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/20 transition-colors">
                <Instagram size={18} className="text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/20 transition-colors">
                <Facebook size={18} className="text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/20 transition-colors">
                <Twitter size={18} className="text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/20 transition-colors">
                <Youtube size={18} className="text-white" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Home</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Courses</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Quizzes</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">About Us</a></li>
            </ul>
          </div>
          
          {/* Column 3 - Resources */}
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Blog</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Podcasts</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">FAQs</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Support Center</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@imamimudrasa.org</span>
              </li>
              <li className="flex gap-3 text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex gap-3 text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>123 Blessing Street, Knowledge City, CA 90210, USA</span>
              </li>
            </ul>
            
            <button className="mt-6 bg-gold hover:bg-gold-light text-black font-medium py-3 px-6 rounded-md transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Support Our Mission
            </button>
          </div>
        </div>
        
        {/* Bottom copyright */}
        <div className="py-6 px-6 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Imami Mudrasa. All rights reserved. Spreading knowledge is our purpose.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
