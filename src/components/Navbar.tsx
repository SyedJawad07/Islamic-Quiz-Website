
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Home, HelpCircle, Info, Menu, X, ChevronDown, User, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if the current route matches the link path
  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav 
      className={cn(
        "w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white py-2 shadow-md" 
          : "bg-[#D9E9E0]/90 backdrop-blur-sm py-3"
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center mr-2 text-white">
            <Book size={20} />
          </div>
          <h1 className={cn(
            "text-xl sm:text-2xl font-bold transition-colors",
            isScrolled ? "text-emerald-dark" : "text-emerald"
          )}>
            Imami Madrasa
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
          <NavLink to="/" icon={<Home size={18} />} isActive={isActive('/')}>
            Home
          </NavLink>
          
          <NavLink to="/courses" icon={<Book size={18} />} isActive={isActive('/courses')}>
            Courses
          </NavLink>
          
          <NavLink to="/quizzes" icon={<HelpCircle size={18} />} isActive={isActive('/quizzes')}>
            Quizzes
          </NavLink>
          
          <NavLink to="/about" icon={<Info size={18} />} isActive={isActive('/about')}>
            About
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button 
            className={cn(
              "p-2 rounded-full transition-colors",
              isScrolled ? "text-emerald-dark hover:bg-gray-100" : "text-emerald hover:bg-emerald/10"
            )} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={cn(
        "md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 overflow-hidden",
        isMobileMenuOpen ? "max-h-64 border-t" : "max-h-0"
      )}>
        <div className="px-4 py-2 space-y-1">
          <MobileNavLink to="/" icon={<Home size={18} />} isActive={isActive('/')}>
            Home
          </MobileNavLink>
          
          <MobileNavLink to="/courses" icon={<Book size={18} />} isActive={isActive('/courses')}>
            Courses
          </MobileNavLink>
          
          <MobileNavLink to="/quizzes" icon={<HelpCircle size={18} />} isActive={isActive('/quizzes')}>
            Quizzes
          </MobileNavLink>
          
          <MobileNavLink to="/about" icon={<Info size={18} />} isActive={isActive('/about')}>
            About
          </MobileNavLink>
        </div>
      </div>
    </nav>
  );
};

// Component for desktop navigation links
const NavLink = ({ to, children, icon, isActive }: { to: string; children: React.ReactNode; icon: React.ReactNode; isActive: boolean }) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center px-3 py-2 rounded-lg transition-colors font-medium",
      isActive 
        ? "bg-emerald/10 text-emerald" 
        : "text-emerald-dark hover:bg-emerald/5 hover:text-emerald"
    )}
  >
    <span className="mr-1.5">{icon}</span>
    {children}
  </Link>
);

// Component for mobile navigation links
const MobileNavLink = ({ to, children, icon, isActive }: { to: string; children: React.ReactNode; icon: React.ReactNode; isActive: boolean }) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center py-3 px-4 rounded-lg transition-colors",
      isActive 
        ? "bg-emerald/10 text-emerald" 
        : "text-emerald-dark hover:bg-emerald/5"
    )}
  >
    <span className="mr-3">{icon}</span>
    <span className="font-medium">{children}</span>
  </Link>
);

export default Navbar;
