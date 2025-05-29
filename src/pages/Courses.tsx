
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Filter, Book, Clock, GraduationCap, Users, Star, BadgeCheck, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const categories = [
  "All Categories",
  "Qur'an",
  "Hadith",
  "Fiqh",
  "Islamic History",
  "Theology",
  "Spirituality",
  "Ahl al-Bayt",
];

// Enhanced course data with complete content
const courses = [
  {
    id: 1,
    title: "Principles of Usul al-Fiqh in Shia Jurisprudence",
    category: "Fiqh",
    image: "/lovable-uploads/da7ba053-ff16-4d11-a30e-04db94a6ae7b.png",
    popular: true,
    isNew: false,
    description: "Explore the foundational principles of Shia jurisprudence, including the roles of reason (aql), consensus (ijma), and the teachings of the Ahl al-Bayt in deriving Islamic law. This comprehensive course covers the historical development of Usul al-Fiqh, critical differences between Shia and Sunni methodologies, and practical applications in contemporary issues.",
    rating: 4.9,
    students: 3240,
    duration: "12 weeks",
    progress: 65,
    instructor: "Sheikh Mohammad Hasan",
    level: "Intermediate",
    language: "English, Arabic",
    prerequisites: "Basic understanding of Islamic principles",
    achievements: ["Certificate Available", "Community Discussion", "Expert Guidance", "Weekly Live Q&A"],
    syllabus: [
      "Introduction to Usul al-Fiqh",
      "Sources of Jurisprudence in Shia Islam",
      "Role of Aql (Reason) in Deriving Laws",
      "Concept of Ijma' (Consensus) in Shia Thought",
      "Authority of the Ahl al-Bayt in Legal Interpretation",
      "Principles of Juristic Preference (Istihsan)",
      "Contemporary Applications and Case Studies",
      "Final Project: Analyzing a Modern Legal Issue"
    ]
  },
  {
    id: 2,
    title: "Nahj al-Balagha: Wisdom of Imam Ali (AS)",
    category: "Theology",
    image: "/lovable-uploads/b9a867d0-d5e6-4773-968c-dee048722af5.png",
    popular: false,
    isNew: true,
    description: "Dive deep into the sermons, letters, and sayings of Imam Ali ibn Abi Talib (AS) compiled in Nahj al-Balagha, exploring their spiritual, ethical, and political dimensions. This course analyzes the literary brilliance, philosophical depth, and practical wisdom found in this monumental work and its relevance to contemporary challenges.",
    rating: 4.8,
    students: 1850,
    duration: "10 weeks",
    progress: 0,
    instructor: "Sayyid Ali Husayni",
    level: "All Levels",
    language: "English, Persian",
    prerequisites: "None",
    achievements: ["Certificate Available", "Interactive Quizzes", "Multilingual Content", "Manuscript Analysis"],
    syllabus: [
      "Historical Context and Compilation of Nahj al-Balagha",
      "Literary Excellence and Rhetorical Analysis",
      "Theological Concepts and Divine Unity",
      "Social Justice and Governance Principles",
      "Ethics and Moral Development",
      "Spiritual Guidance and Self-Purification",
      "Contemporary Relevance and Modern Applications",
      "Comparative Study with Other Islamic Texts"
    ]
  },
  {
    id: 3,
    title: "History of the Twelve Imams",
    category: "Islamic History",
    image: "/lovable-uploads/2cc7c1a7-23b7-4c96-aa2d-81e25bea3efe.png",
    popular: true,
    isNew: false,
    description: "Study the lives, teachings, and historical context of the Twelve Imams from Imam Ali (AS) to Imam Mahdi (AJ), and understand their role in preserving and interpreting Islam. This course examines the socio-political circumstances of each Imam's era, their contributions to Islamic knowledge, and their enduring influence on Shia thought and practice.",
    rating: 4.7,
    students: 2760,
    duration: "8 weeks",
    progress: 30,
    instructor: "Dr. Hassan Qazwini",
    level: "Beginner",
    language: "English, Arabic",
    prerequisites: "Basic knowledge of Islamic history",
    achievements: ["Certificate Available", "Historical Timeline", "Virtual Tours", "Primary Source Documents"],
    syllabus: [
      "Introduction to the Concept of Imamate",
      "Imam Ali (AS): The First Imam and Successor",
      "Imam Hasan (AS) and the Treaty with Muawiyah",
      "Imam Husayn (AS) and the Revolution of Karbala",
      "Imams Sajjad, Baqir, and Sadiq (AS): The Academic Era",
      "Imams Kadhim through Askari (AS): Persecution and Resilience",
      "Imam Mahdi (AJ): The Living Imam and Occultation",
      "Contemporary Relevance of the Imamate Tradition"
    ]
  },
  {
    id: 4,
    title: "Karbala & Ashura: History and Commemoration",
    category: "Islamic History",
    image: "/lovable-uploads/40a0017f-7762-4a4a-889f-a6871d080dfe.png",
    popular: true,
    isNew: false,
    description: "Examine the events leading to the tragedy of Karbala, the martyrdom of Imam Hussein (AS) and his companions, and the various ways these events are commemorated in Shia communities. This course analyzes the historical sources, the theological and social significance of Ashura, and its impact on Shia identity throughout history and around the world.",
    rating: 4.9,
    students: 3850,
    duration: "6 weeks",
    progress: 0,
    instructor: "Sheikh Jafar Najafi",
    level: "All Levels",
    language: "English, Arabic, Persian",
    prerequisites: "None",
    achievements: ["Certificate Available", "Documentary Footage", "Scholarly Analysis", "Commemorative Practices Guide"],
    syllabus: [
      "Historical Background: Succession Crisis after Prophet Muhammad (PBUH)",
      "Political Climate under Yazid's Rule",
      "Journey of Imam Hussein (AS) from Medina to Karbala",
      "The Day of Ashura: Events and Martyrdom",
      "Survivors and the Aftermath: Spreading the Message",
      "Development of Commemorative Traditions",
      "Ashura Observances Around the World",
      "Contemporary Significance and Universal Message"
    ]
  },
  {
    id: 5,
    title: "Shia Approach to Hadith Authentication",
    category: "Hadith",
    image: "/lovable-uploads/da7ba053-ff16-4d11-a30e-04db94a6ae7b.png",
    popular: false,
    isNew: true,
    description: "Learn about the methodologies used in Shia scholarship to evaluate, authenticate, and categorize hadith, with special emphasis on narrations from the Ahl al-Bayt. This course covers the development of Shia hadith sciences, the compilation of the Four Books, critical evaluation methods, and contemporary approaches to hadith studies in the Shia tradition.",
    rating: 5.0,
    students: 4120,
    duration: "8 weeks",
    progress: 0,
    instructor: "Allamah Sayyid Ahmad",
    level: "Advanced",
    language: "English, Arabic",
    prerequisites: "Familiarity with basic Islamic sciences",
    achievements: ["Certificate Available", "Research Methods", "Hadith Database Access", "Scholarly Publication Opportunity"],
    syllabus: [
      "Introduction to Hadith Sciences in Shia Tradition",
      "The Four Books and Other Major Shia Hadith Collections",
      "Classifications of Hadith: Sahih, Hasan, Muwaththaq, Da'if",
      "Evaluation of Narrators and Chain Analysis",
      "Textual Criticism and Content Analysis",
      "Reconciliation of Seemingly Contradictory Narrations",
      "Principles of Hadith Interpretation",
      "Contemporary Challenges in Hadith Authentication"
    ]
  },
  {
    id: 6,
    title: "Introduction to Dua Kumayl & Dua Nudbah",
    category: "Spirituality",
    image: "/lovable-uploads/b9a867d0-d5e6-4773-968c-dee048722af5.png",
    popular: false,
    isNew: false,
    description: "Discover the spiritual depth and practical guidance in these two significant supplications taught by Imam Ali (AS) and recited regularly in Shia communities worldwide. This course explores the historical context, thematic content, and spiritual dimensions of Dua Kumayl and Dua Nudbah, along with their role in personal devotion and community practice.",
    rating: 4.9,
    students: 2980,
    duration: "6 weeks",
    progress: 0,
    instructor: "Sayyida Fatima Zaidi",
    level: "Beginner",
    language: "English, Arabic, Urdu",
    prerequisites: "None",
    achievements: ["Certificate Available", "Audio Recitations", "Spiritual Reflection Guides", "Memorization Techniques"],
    syllabus: [
      "Historical Background of Dua Kumayl",
      "Textual Analysis and Key Themes in Dua Kumayl",
      "Spiritual Concepts: Divine Forgiveness and Mercy",
      "Origins and Context of Dua Nudbah",
      "Messianic Expectations in Dua Nudbah",
      "Emotional and Spiritual Dimensions of Supplication",
      "Practical Application in Personal Devotion",
      "Community Practices and Traditions"
    ]
  },
  {
    id: 7,
    title: "Ziyarat: Spiritual Connection with the Ahl al-Bayt",
    category: "Ahl al-Bayt",
    image: "/lovable-uploads/2cc7c1a7-23b7-4c96-aa2d-81e25bea3efe.png",
    popular: false,
    isNew: true,
    description: "Explore the concept, importance, and practices of ziyarat (visitation) to the shrines of the Ahl al-Bayt and its significance in establishing spiritual connection. This course covers the theological foundations, historical development, and contemporary practices of ziyarat in Shia spirituality, with special focus on major shrines and pilgrimage sites.",
    rating: 4.7,
    students: 1250,
    duration: "5 weeks",
    progress: 100,
    instructor: "Dr. Zaynab Husayni",
    level: "Intermediate",
    language: "English, Arabic",
    prerequisites: "Basic understanding of Shia beliefs",
    achievements: ["Certificate Earned", "Virtual Pilgrimages", "Practical Guidance", "Personal Reflection Journal"],
    syllabus: [
      "Theological Foundations of Ziyarat in Shia Islam",
      "Historical Development of Shrine Visitation",
      "Major Ziyarat Texts: Content and Significance",
      "Sacred Geography: Major Shrines and their Histories",
      "Etiquette and Practices of Ziyarat",
      "Spiritual Dimensions of Connection with the Ahl al-Bayt",
      "Contemporary Challenges and Opportunities",
      "Personal Development through Spiritual Visitation"
    ]
  },
  {
    id: 8,
    title: "Shia Interpretation of Quranic Verses",
    category: "Qur'an",
    image: "/lovable-uploads/40a0017f-7762-4a4a-889f-a6871d080dfe.png",
    popular: true,
    isNew: false,
    description: "Study key Quranic verses through the lens of Shia tafsir, based on the teachings and traditions of the Prophet Muhammad (PBUH) and the Ahl al-Bayt. This course examines major themes, distinctive interpretive principles, and significant exegetical works in the Shia tradition, with emphasis on their relevance to contemporary Muslim life.",
    rating: 4.8,
    students: 3570,
    duration: "12 weeks",
    progress: 0,
    instructor: "Ayatollah Dr. Muhammad Baqir",
    level: "Intermediate",
    language: "English, Arabic",
    prerequisites: "Basic Quranic knowledge",
    achievements: ["Certificate Available", "Verse-by-Verse Analysis", "Contextual Studies", "Comparative Interpretation"],
    syllabus: [
      "Principles of Quranic Interpretation in Shia Tradition",
      "The Role of Ahl al-Bayt in Understanding the Quran",
      "Major Shia Tafsir Works: Historical Development",
      "Interpretation of Verses Related to Imamate and Wilayah",
      "Exegesis of Verses on Divine Justice and Human Free Will",
      "Mystical and Spiritual Dimensions in Shia Tafsir",
      "Contemporary Approaches to Quranic Interpretation",
      "Application of Quranic Teachings in Modern Life"
    ]
  }
];

const difficultyLevels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const durationFilters = ["Any Duration", "0-4 Weeks", "5-8 Weeks", "9+ Weeks"];

const Courses = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const initialCategory = searchParams.get('category') || "All Categories";
  const initialSearch = searchParams.get('search') || "";
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [selectedDuration, setSelectedDuration] = useState("Any Duration");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
    
    // Update search and category from URL parameters
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category && categories.includes(category)) {
      setSelectedCategory(category);
    }
    
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategory !== "All Categories") {
      params.set('category', selectedCategory);
    }
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    navigate(`/courses?${params.toString()}`, { replace: true });
  }, [selectedCategory, searchQuery, navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The URL will be updated by the useEffect
  };

  const clearFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedDifficulty("All Levels");
    setSelectedDuration("Any Duration");
    setSearchQuery("");
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset to default values.",
    });
  };

  const handleContinue = (courseId: number) => {
    navigate(`/courses/${courseId}/content/1`);
  };

  const toggleSyllabus = (courseId: number) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
    }
  };

  const filteredCourses = courses.filter(course => {
    // Filter by category if not "All Categories"
    const categoryMatch = selectedCategory === "All Categories" || course.category === selectedCategory;
    
    // Filter by difficulty
    const difficultyMatch = selectedDifficulty === "All Levels" || course.level === selectedDifficulty;
    
    // Filter by duration
    let durationMatch = true;
    if (selectedDuration !== "Any Duration") {
      const weeks = parseInt(course.duration);
      if (selectedDuration === "0-4 Weeks") {
        durationMatch = weeks <= 4;
      } else if (selectedDuration === "5-8 Weeks") {
        durationMatch = weeks >= 5 && weeks <= 8;
      } else if (selectedDuration === "9+ Weeks") {
        durationMatch = weeks >= 9;
      }
    }
    
    // Filter by search query
    const searchMatch = !searchQuery || 
                        course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && difficultyMatch && durationMatch && searchMatch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with Enhanced Design */}
      <div className="relative pt-20 md:pt-28 pb-12 md:pb-20 bg-emerald" style={{ backgroundImage: 'linear-gradient(135deg, #0D553F 0%, #1A7A5E 100%)' }}>
        <div className="absolute inset-0 bg-pattern-light opacity-10"></div>
        <div className="absolute inset-0 islamic-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white opacity-0 transform translate-y-4",
              isLoaded && "animate-slide-up opacity-100 translate-y-0"
            )}>
              Explore Our <span className="text-gold">Knowledge Treasury</span>
            </h1>
            <p className={cn(
              "text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-6 md:mb-10 opacity-0",
              isLoaded && "animate-fade-in opacity-100 animate-delay-100"
            )}>
              Discover our comprehensive collection of courses crafted to enrich your Islamic knowledge and spiritual growth
            </p>
          </div>
          
          {/* Search and Main Categories */}
          <div className={cn(
            "flex flex-col md:flex-row gap-4 max-w-4xl mx-auto opacity-0",
            isLoaded && "animate-fade-in opacity-100 animate-delay-200"
          )}>
            <form onSubmit={handleSearch} className="relative flex-grow">
              <input
                type="text"
                placeholder="Search courses by title or keywords..."
                className="w-full px-4 py-3 md:px-5 md:py-4 pr-12 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Search className="text-white/70" size={20} />
              </button>
            </form>
            
            <select
              className="px-4 py-3 md:px-5 md:py-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-emerald text-white">{category}</option>
              ))}
            </select>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 md:px-5 md:py-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all flex items-center justify-center gap-2"
            >
              <Filter size={20} />
              <span className="hidden sm:inline">Advanced Filters</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Advanced Filters */}
      <div className={cn(
        "bg-white border-b transform origin-top transition-all duration-300",
        showFilters ? "h-auto opacity-100 scale-y-100 py-4" : "h-0 opacity-0 scale-y-0 overflow-hidden"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
              <select
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald focus:border-emerald"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                {difficultyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <select
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald focus:border-emerald"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
              >
                {durationFilters.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={clearFilters}
                className="w-full py-2 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Listings */}
      <div className="py-8 md:py-16 bg-ivory-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {filteredCourses.length} Courses Available
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 border rounded p-1 bg-white">
                <button 
                  onClick={() => setViewMode('grid')} 
                  className={cn(
                    "p-1 rounded",
                    viewMode === 'grid' ? "bg-emerald/10 text-emerald" : "text-gray-500 hover:bg-gray-100"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button 
                  onClick={() => setViewMode('list')} 
                  className={cn(
                    "p-1 rounded",
                    viewMode === 'list' ? "bg-emerald/10 text-emerald" : "text-gray-500 hover:bg-gray-100"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
              </div>
              <select className="px-3 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald/50 transition-all">
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
          
          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    {course.popular && (
                      <span className="absolute top-4 left-4 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}
                    {course.isNew && (
                      <span className="absolute top-4 left-4 bg-emerald text-white text-xs font-bold px-3 py-1 rounded-full">
                        New Release
                      </span>
                    )}
                    {course.progress === 100 && (
                      <div className="absolute top-4 right-4 bg-white shadow rounded-full p-1">
                        <Trophy className="h-4 w-4 text-gold" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-1 bg-emerald/10 text-emerald text-xs rounded-md">
                        {course.category}
                      </span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-gold fill-current" />
                        <span className="text-sm font-medium ml-1">{course.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">{course.description}</p>
                    
                    {/* Course details */}
                    <div className="flex flex-col space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Instructor:</span>
                        <span className="font-medium text-gray-700">{course.instructor}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Level:</span>
                        <span className="font-medium text-gray-700">{course.level}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Language:</span>
                        <span className="font-medium text-gray-700">{course.language}</span>
                      </div>
                    </div>
                    
                    {/* Syllabus Preview */}
                    <div className="mb-4">
                      <button 
                        onClick={() => toggleSyllabus(course.id)}
                        className="w-full py-1 px-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded text-xs font-medium flex items-center justify-center gap-2"
                      >
                        {expandedCourse === course.id ? "Hide Syllabus" : "View Syllabus"}
                      </button>
                      
                      {expandedCourse === course.id && (
                        <div className="mt-2 p-2 bg-gray-50 rounded-md text-xs animate-fade-in">
                          <h4 className="font-semibold mb-1">Course Syllabus:</h4>
                          <ul className="list-disc pl-4 text-gray-700 space-y-1">
                            {course.syllabus?.slice(0, 4).map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                            {course.syllabus && course.syllabus.length > 4 && (
                              <li className="text-emerald">+ {course.syllabus.length - 4} more topics</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    {course.progress !== undefined && course.progress > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-gray-500">Your progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              course.progress === 100 ? "bg-gold" : "bg-emerald"
                            )}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.achievements?.map((achievement, index) => (
                        <span key={index} className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {achievement.includes("Certificate") && (
                            <BadgeCheck size={12} className={cn(
                              "mr-1",
                              achievement.includes("Earned") ? "text-gold" : "text-emerald"
                            )} />
                          )}
                          {achievement}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                      <div className="flex items-center">
                        <Users size={14} className="mr-1" />
                        <span>{course.students?.toLocaleString() || '1,000+'}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{course.duration || '10+ hours'}</span>
                      </div>
                    </div>
                    
                    {course.progress ? (
                      <Link 
                        to={`/courses/${course.id}/content/1`}
                        className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-emerald text-white hover:bg-emerald-dark rounded-md transition-colors duration-300 text-xs sm:text-sm font-medium shadow-sm block text-center"
                      >
                        {course.progress === 100 ? 'View Certificate' : 'Continue Learning'}
                      </Link>
                    ) : (
                      <button 
                        onClick={() => handleContinue(course.id)}
                        className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-emerald text-white hover:bg-emerald-dark rounded-md transition-colors duration-300 text-xs sm:text-sm font-medium shadow-sm"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-4 md:space-y-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row">
                  <div className="relative md:w-64 h-48 md:h-auto overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    {course.popular && (
                      <span className="absolute top-4 left-4 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}
                    {course.isNew && (
                      <span className="absolute top-4 left-4 bg-emerald text-white text-xs font-bold px-3 py-1 rounded-full">
                        New Release
                      </span>
                    )}
                  </div>
                  
                  <div className="p-5 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-1 bg-emerald/10 text-emerald text-xs rounded-md">
                        {course.category}
                      </span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-gold fill-current" />
                        <span className="text-sm font-medium ml-1">{course.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.description.substring(0, 180)}...</p>
                    
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users size={16} className="mr-1" />
                        <span>{course.students?.toLocaleString() || '1,000+'} students</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={16} className="mr-1" />
                        <span>{course.duration || '10+ hours'}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <GraduationCap size={16} className="mr-1" />
                        <span>{course.level}</span>
                      </div>
                    </div>
                    
                    {course.progress !== undefined && course.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="text-gray-500">Your progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              course.progress === 100 ? "bg-gold" : "bg-emerald"
                            )}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap justify-between items-center">
                      <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
                        {course.achievements?.slice(0, 2).map((achievement, index) => (
                          <span key={index} className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {achievement.includes("Certificate") && (
                              <BadgeCheck size={12} className={cn(
                                "mr-1",
                                achievement.includes("Earned") ? "text-gold" : "text-emerald"
                              )} />
                            )}
                            {achievement}
                          </span>
                        ))}
                        {course.achievements && course.achievements.length > 2 && (
                          <span className="text-xs text-emerald">+{course.achievements.length - 2} more</span>
                        )}
                      </div>
                      
                      <div className="w-full md:w-auto">
                        {course.progress ? (
                          <Link 
                            to={`/courses/${course.id}/content/1`}
                            className="w-full md:w-auto py-2 px-4 bg-emerald text-white hover:bg-emerald-dark rounded-md transition-colors duration-300 text-sm font-medium shadow-sm block text-center"
                          >
                            {course.progress === 100 ? 'View Certificate' : 'Continue Learning'}
                          </Link>
                        ) : (
                          <button 
                            onClick={() => handleContinue(course.id)}
                            className="w-full md:w-auto py-2 px-4 bg-emerald text-white hover:bg-emerald-dark rounded-md transition-colors duration-300 text-sm font-medium shadow-sm"
                          >
                            Continue
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Courses;
