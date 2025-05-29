import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Star, BookOpen, CheckCircle, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';

interface Module {
  id: number;
  title: string;
  lessons: number;
  hasQuiz: boolean;
}

interface Course {
  id: number;
  title: string;
  category: string;
  image: string;
  popular: boolean;
  isNew: boolean;
  progress?: number;
  rating: number;
  instructor: string;
  modules: Module[];
}

const courses: Course[] = [
  {
    id: 1,
    title: "Principles of Usul al-Fiqh in Shia Jurisprudence",
    category: "Fiqh",
    image: "/lovable-uploads/da7ba053-ff16-4d11-a30e-04db94a6ae7b.png",
    popular: true,
    isNew: false,
    progress: 65,
    rating: 4.9,
    instructor: "Sheikh Mohammad Hasan",
    modules: [
      {
        id: 1,
        title: "Introduction to Usul al-Fiqh",
        lessons: 5,
        hasQuiz: true
      },
      {
        id: 2,
        title: "The Role of Aql (Reason) in Shia Usul",
        lessons: 4,
        hasQuiz: true
      },
      {
        id: 3,
        title: "Ijma' and its Application in Shia Jurisprudence",
        lessons: 6,
        hasQuiz: true
      }
    ]
  },
  {
    id: 2,
    title: "Nahj al-Balagha: Wisdom of Imam Ali (AS)",
    category: "Theology",
    image: "/lovable-uploads/b9a867d0-d5e6-4773-968c-dee048722af5.png",
    popular: false,
    isNew: true,
    progress: 0,
    rating: 4.8,
    instructor: "Sayyid Ali Husayni",
    modules: [
      {
        id: 1,
        title: "Historical Background of Nahj al-Balagha",
        lessons: 3,
        hasQuiz: true
      },
      {
        id: 2,
        title: "Spiritual Insights from Imam Ali's Sermons",
        lessons: 6,
        hasQuiz: true
      },
      {
        id: 3,
        title: "Ethical Teachings in Nahj al-Balagha",
        lessons: 5,
        hasQuiz: true
      }
    ]
  },
  {
    id: 3,
    title: "History of the Twelve Imams",
    category: "History",
    image: "/lovable-uploads/2cc7c1a7-23b7-4c96-aa2d-81e25bea3efe.png",
    popular: true,
    isNew: false,
    progress: 30,
    rating: 4.7,
    instructor: "Dr. Hassan Qazwini",
    modules: [
      {
        id: 1,
        title: "The Life of Imam Ali (AS)",
        lessons: 7,
        hasQuiz: true
      },
      {
        id: 2,
        title: "Imam Hasan (AS) and Imam Husayn (AS)",
        lessons: 5,
        hasQuiz: true
      },
      {
        id: 3,
        title: "The Middle Imams: Sajjad to Askari (AS)",
        lessons: 8,
        hasQuiz: true
      },
      {
        id: 4,
        title: "Imam Mahdi (AJ): The Present Imam",
        lessons: 4,
        hasQuiz: true
      }
    ]
  },
  {
    id: 4,
    title: "Karbala & Ashura: History and Commemoration",
    category: "History",
    image: "/lovable-uploads/40a0017f-7762-4a4a-889f-a6871d080dfe.png",
    popular: true,
    isNew: false,
    progress: 0,
    rating: 4.9,
    instructor: "Sheikh Jafar Najafi",
    modules: [
      {
        id: 1,
        title: "Historical Context of Karbala",
        lessons: 4,
        hasQuiz: true
      },
      {
        id: 2,
        title: "The Journey to Karbala",
        lessons: 3,
        hasQuiz: true
      },
      {
        id: 3,
        title: "The Day of Ashura",
        lessons: 5,
        hasQuiz: true
      },
      {
        id: 4,
        title: "Commemoration Practices Around the World",
        lessons: 4,
        hasQuiz: true
      }
    ]
  },
  {
    id: 5,
    title: "Shia Approach to Hadith Authentication",
    category: "Hadith",
    image: "/lovable-uploads/da7ba053-ff16-4d11-a30e-04db94a6ae7b.png",
    popular: false,
    isNew: true,
    progress: 0,
    rating: 5.0,
    instructor: "Allamah Sayyid Ahmad",
    modules: [
      {
        id: 1,
        title: "Principles of Hadith Authentication",
        lessons: 5,
        hasQuiz: true
      },
      {
        id: 2,
        title: "The Four Books of Shia Hadith",
        lessons: 4,
        hasQuiz: true
      },
      {
        id: 3,
        title: "Comparing Shia and Sunni Hadith Methodology",
        lessons: 3,
        hasQuiz: true
      }
    ]
  },
  {
    id: 6,
    title: "Introduction to Dua Kumayl & Dua Nudbah",
    category: "Spirituality",
    image: "/lovable-uploads/b9a867d0-d5e6-4773-968c-dee048722af5.png",
    popular: false,
    isNew: false,
    progress: 15,
    rating: 4.9,
    instructor: "Sayyida Fatima Zaidi",
    modules: [
      {
        id: 1,
        title: "History and Context of Dua Kumayl",
        lessons: 3,
        hasQuiz: true
      },
      {
        id: 2,
        title: "Spiritual Themes in Dua Kumayl",
        lessons: 4,
        hasQuiz: true
      },
      {
        id: 3,
        title: "Understanding Dua Nudbah",
        lessons: 3,
        hasQuiz: true
      },
      {
        id: 4,
        title: "Practical Applications in Daily Life",
        lessons: 2,
        hasQuiz: true
      }
    ]
  }
];

const FeaturedCourses = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
  const navigate = useNavigate();

  const checkScrollable = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      
      setTimeout(checkScrollable, 400);
    }
  };

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
    
    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  const toggleCourseExpand = (courseId: number) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
    }
  };

  const handleContinue = (courseId: number) => {
    navigate(`/courses/${courseId}/content/1`);
  };

  return (
    <section className="py-20 bg-ivory-light relative overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 bg-pattern-light opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className={cn(
          "text-center mb-12 opacity-0 transform translate-y-4",
          isVisible && "animate-slide-up opacity-100 translate-y-0"
        )}>
          <h3 className="inline-block px-3 py-1 text-xs font-semibold bg-emerald/10 text-emerald rounded-full mb-4">
            PREMIUM COURSES
          </h3>
          <h2 className="text-4xl font-bold mb-4">Expand Your Islamic Knowledge</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most exceptional courses crafted by renowned scholars from around the world.
          </p>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex justify-end mb-6 gap-2">
          <button 
            onClick={() => scroll('left')} 
            disabled={!canScrollLeft}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              canScrollLeft 
                ? "bg-emerald text-white hover:bg-emerald-light" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
            aria-label="Scroll left"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')} 
            disabled={!canScrollRight}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              canScrollRight 
                ? "bg-emerald text-white hover:bg-emerald-light" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
            aria-label="Scroll right"
          >
            <ArrowRight size={20} />
          </button>
        </div>
        
        {/* Courses carousel */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={checkScrollable}
        >
          {courses.map((course, index) => (
            <div 
              key={course.id} 
              className={cn(
                "flex-shrink-0 w-full sm:w-[350px] hover-lift rounded-xl overflow-hidden bg-white shadow-lg border border-gray-100",
                isVisible && "animate-scale-in opacity-100",
                `animate-delay-${Math.min(index * 100, 500)}`
              )}
            >
              <div className="relative h-48 overflow-hidden">
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
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                  <Star size={14} className="text-gold mr-1 fill-gold" />
                  {course.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 bg-emerald/10 text-emerald text-xs rounded-md">
                    {course.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>
                
                {course.progress !== undefined && course.progress > 0 ? (
                  <div className="mb-4">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{course.progress}% complete</p>
                  </div>
                ) : (
                  <div className="h-8 mb-4"></div>
                )}
                
                {/* Course structure - Coursera style */}
                <div className="mb-4">
                  <button 
                    onClick={() => toggleCourseExpand(course.id)}
                    className="flex items-center justify-between w-full text-left text-emerald hover:text-emerald-light transition-colors mb-2"
                  >
                    <span className="font-medium">Course Content</span>
                    <ArrowRight size={16} className={cn(
                      "transition-transform duration-300",
                      expandedCourse === course.id && "rotate-90"
                    )} />
                  </button>
                  
                  {expandedCourse === course.id && (
                    <div className="bg-gray-50 rounded-lg p-3 text-sm animate-fade-in">
                      {course.modules.map((module) => (
                        <div key={module.id} className="border-b border-gray-200 last:border-0 py-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">{module.title}</h4>
                          </div>
                          <div className="flex flex-wrap items-center mt-1 text-xs text-gray-500">
                            <div className="flex items-center mr-3">
                              <BookOpen size={12} className="mr-1" />
                              {module.lessons} lessons
                            </div>
                            {module.hasQuiz && (
                              <div className="flex items-center">
                                <CheckCircle size={12} className="mr-1 text-emerald" />
                                Includes quiz
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Link 
                  to={`/courses/${course.id}/content/1`} 
                  className="w-full py-3 px-4 bg-emerald text-white hover:bg-emerald-dark rounded-md transition-colors duration-300 text-sm font-medium shadow-sm block text-center"
                >
                  {course.progress !== undefined && course.progress > 0 ? 'Continue Learning' : 'Continue'}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/courses" className="inline-flex items-center text-emerald hover:text-emerald-light font-medium">
            View All Courses <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
