import React, { useEffect, useState, useRef } from 'react';
import { Mail, Phone, MapPin, ExternalLink, Users, GraduationCap, Globe, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ahmad Ibrahim",
    title: "Student from USA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    quote: "The courses at Imami Mudrasa have transformed my understanding of Islamic knowledge. The scholars make complex topics accessible without simplifying the depth of wisdom."
  },
  {
    id: 2,
    name: "Aisha Rahman",
    title: "Medical Student, UK",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    quote: "As a busy medical student, finding quality Islamic education was challenging until I discovered Imami Mudrasa. The flexible learning and quiz platform helps me retain knowledge effectively."
  },
  {
    id: 3,
    name: "Mohammed Ali",
    title: "Software Engineer, Canada",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    quote: "The learning experience here is unmatched. I've tried many online platforms, but the quality of instruction and the interactive quiz system has helped me grow spiritually like never before."
  }
];

const images = [
  "https://images.unsplash.com/photo-1519817914152-22d216bb9170?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1604659938916-e8c0c7d8a1c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1609599006353-e629aaabeb83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
];

const AboutUs = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'mission' | 'founder' | 'contact'>('mission');
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    const imageInterval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 4000);
    
    return () => {
      clearInterval(testimonialInterval);
      clearInterval(imageInterval);
    };
  }, []);

  return (
    <section ref={sectionRef} id="about-us" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 to-gold/5"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h3 className="inline-block px-3 py-1 text-xs font-semibold bg-emerald/10 text-emerald rounded-full mb-4">
            ABOUT IMAMI MUDRASA
          </h3>
          <h2 className="text-4xl font-bold mb-6">Our Vision & Heritage</h2>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('mission')}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all",
                activeTab === 'mission' 
                  ? "bg-white shadow-sm text-emerald" 
                  : "text-gray-600 hover:text-emerald"
              )}
            >
              Our Mission
            </button>
            <button 
              onClick={() => setActiveTab('founder')}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all",
                activeTab === 'founder' 
                  ? "bg-white shadow-sm text-emerald" 
                  : "text-gray-600 hover:text-emerald"
              )}
            >
              Founder
            </button>
            <button 
              onClick={() => setActiveTab('contact')}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all",
                activeTab === 'contact' 
                  ? "bg-white shadow-sm text-emerald" 
                  : "text-gray-600 hover:text-emerald"
              )}
            >
              Contact Us
            </button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left side - Content changes based on active tab */}
          <div className={cn(
            "flex-1 opacity-0",
            isVisible && "animate-fade-in opacity-100"
          )}>
            {activeTab === 'mission' && (
              <>
                <h3 className="text-3xl font-bold mb-6">Bringing Divine Knowledge to Your Fingertips</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Imami Mudrasa was founded with a singular vision: to make authentic Islamic knowledge accessible to every seeker around the globe. Our platform bridges the gap between traditional Islamic scholarship and modern educational technology.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  With courses developed by renowned scholars and a state-of-the-art quiz system that adapts to your learning progress, we provide a comprehensive educational experience that nurtures both intellectual growth and spiritual development.
                </p>
                
                {/* Added new section to fill space - Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-emerald/5 rounded-xl p-6 border border-emerald/20 hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <div className="p-2 bg-emerald/10 rounded-full mr-4">
                        <Users className="text-emerald" size={24} />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-1">75,000+</h4>
                        <p className="text-gray-600">Global Students</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gold/5 rounded-xl p-6 border border-gold/20 hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <div className="p-2 bg-gold/10 rounded-full mr-4">
                        <GraduationCap className="text-gold" size={24} />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-1">50+</h4>
                        <p className="text-gray-600">Expert Scholars</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-emerald/5 rounded-xl p-6 border border-emerald/20 hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <div className="p-2 bg-emerald/10 rounded-full mr-4">
                        <BookOpen className="text-emerald" size={24} />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-1">100+</h4>
                        <p className="text-gray-600">Unique Courses</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gold/5 rounded-xl p-6 border border-gold/20 hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <div className="p-2 bg-gold/10 rounded-full mr-4">
                        <Globe className="text-gold" size={24} />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-1">120+</h4>
                        <p className="text-gray-600">Countries Reached</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial carousel */}
                <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-100 relative">
                  <div className="absolute -top-4 -left-4 text-6xl text-gold opacity-20">"</div>
                  
                  <div className="h-40 relative">
                    {testimonials.map((testimonial, index) => (
                      <div 
                        key={testimonial.id}
                        className={cn(
                          "absolute inset-0 transition-all duration-700 flex flex-col",
                          activeTestimonial === index 
                            ? "opacity-100 translate-x-0" 
                            : "opacity-0 translate-x-8"
                        )}
                        aria-hidden={activeTestimonial !== index}
                      >
                        <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
                        <div className="mt-auto flex items-center">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-emerald"
                          />
                          <div>
                            <h4 className="font-bold">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500">{testimonial.title}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-6 space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          activeTestimonial === index 
                            ? "bg-emerald w-6" 
                            : "bg-gray-300 hover:bg-gray-400"
                        )}
                        onClick={() => setActiveTestimonial(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'founder' && (
              <div className="animate-fade-in">
                <h3 className="text-3xl font-bold mb-6">Meet Our Visionary Founder</h3>
                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                  <img 
                    src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                    alt="Sheikh Muhammad Abdullah"
                    className="w-48 h-48 object-cover rounded-full border-4 border-gold shadow-lg"
                  />
                  <div>
                    <h4 className="text-2xl font-bold mb-2">Sheikh Muhammad Abdullah</h4>
                    <p className="text-emerald font-medium mb-4">Founder & Principal Scholar</p>
                    <div className="flex items-center mb-4">
                      <div className="h-1 w-16 bg-gold rounded-full mr-2"></div>
                      <p className="text-gray-500 italic">Al-Azhar University, Cairo</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Sheikh Muhammad Abdullah, a distinguished graduate of Al-Azhar University with a lifelong dedication to Islamic scholarship, founded Imami Mudrasa in 2015 with a revolutionary vision: making authentic Islamic knowledge accessible in the digital age without compromising on scholarly rigor.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  With specializations in Quranic exegesis and classical Islamic texts, Sheikh Abdullah has authored twelve influential books and lectured at prestigious institutions across five continents. His innovative approach combines traditional Islamic pedagogical methods with modern educational technology.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Under his leadership, Imami Mudrasa has grown from a small online platform to a globally recognized institution serving over 75,000 students worldwide. His motto, "Knowledge is the light that guides hearts," reflects his belief that authentic Islamic education can transform individuals and communities.
                </p>
                
                <div className="mt-8 flex gap-4">
                  <a href="#" className="inline-flex items-center text-emerald border border-emerald hover:bg-emerald hover:text-white px-4 py-2 rounded-md transition-all">
                    View Full Biography <ExternalLink size={16} className="ml-2" />
                  </a>
                  <a href="#" className="inline-flex items-center text-gray-600 hover:text-emerald">
                    Publications <ExternalLink size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            )}
            
            {activeTab === 'contact' && (
              <div className="animate-fade-in">
                <h3 className="text-3xl font-bold mb-6">Contact Imami Mudrasa</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We welcome your inquiries, feedback, and suggestions. Our dedicated team is here to assist you on your journey to knowledge and spiritual growth.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                    <div className="flex items-start">
                      <div className="bg-emerald/10 p-3 rounded-full mr-4">
                        <Mail className="text-emerald" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-1">Email Us</h4>
                        <p className="text-gray-500 mb-2">For general inquiries:</p>
                        <a href="mailto:info@imamimudrasa.org" className="text-emerald hover:underline">info@imamimudrasa.org</a>
                        <p className="text-gray-500 mt-2 mb-1">For student support:</p>
                        <a href="mailto:support@imamimudrasa.org" className="text-emerald hover:underline">support@imamimudrasa.org</a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                    <div className="flex items-start">
                      <div className="bg-emerald/10 p-3 rounded-full mr-4">
                        <Phone className="text-emerald" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-1">Call Us</h4>
                        <p className="text-gray-500 mb-2">International:</p>
                        <p className="text-emerald font-medium">+1 (123) 456-7890</p>
                        <p className="text-gray-500 mt-2 mb-1">Toll-Free (USA):</p>
                        <p className="text-emerald font-medium">1-800-IMUDRASA</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 mb-8">
                  <div className="flex items-start">
                    <div className="bg-emerald/10 p-3 rounded-full mr-4">
                      <MapPin className="text-emerald" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Visit Our Headquarters</h4>
                      <p className="text-gray-600 mb-2">
                        123 Blessing Street, Knowledge City<br />
                        CA 90210, USA
                      </p>
                      <p className="text-gray-500 text-sm">Open Monday-Friday: 9 AM - 5 PM (Pacific Time)</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald/5 rounded-xl p-6 border border-emerald/20">
                  <h4 className="font-bold text-gray-800 mb-4">Send Us a Message</h4>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald/50"
                      />
                      <input 
                        type="email" 
                        placeholder="Your Email" 
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald/50"
                      />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Subject" 
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald/50"
                    />
                    <textarea 
                      placeholder="Your Message" 
                      rows={4}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald/50"
                    ></textarea>
                    <button className="bg-emerald text-white hover:bg-emerald-dark px-6 py-3 rounded-md transition-colors font-medium">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
          
          {/* Right side - Image carousel (shown only in mission tab on mobile, always on desktop) */}
          <div className={cn(
            "flex-1 opacity-0",
            (activeTab === 'mission' || window.innerWidth >= 1024) && "block",
            activeTab !== 'mission' && window.innerWidth < 1024 && "hidden",
            isVisible && "animate-fade-in opacity-100 animate-delay-200"
          )}>
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-xl bg-white p-4">
              {/* Image container with mask for gradient effect */}
              <div className="absolute inset-4 overflow-hidden rounded-xl">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={cn(
                      "absolute inset-0 transition-all duration-1000",
                      activeImage === index 
                        ? "opacity-100 scale-100" 
                        : "opacity-0 scale-110"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald/80 to-transparent z-10"></div>
                    <img 
                      src={image} 
                      alt="Islamic education"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Stats overlay */}
              <div className="absolute bottom-12 left-12 right-12 z-20">
                <h3 className="text-white text-2xl font-bold mb-6">Our Global Impact</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gold">50+</p>
                    <p className="text-white text-sm">Expert Scholars</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gold">100+</p>
                    <p className="text-white text-sm">Unique Courses</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gold">75K+</p>
                    <p className="text-white text-sm">Global Students</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation dots */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-20">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      activeImage === index 
                        ? "bg-white w-6" 
                        : "bg-white/50 hover:bg-white/70"
                    )}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-8 right-8 w-16 h-16 border-4 border-gold/20 rounded-full"></div>
              <div className="absolute top-16 left-12 w-8 h-8 border-2 border-gold/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
