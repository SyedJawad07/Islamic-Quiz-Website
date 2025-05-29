
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ModuleSystem from '@/components/ModuleSystem';
import { ArrowLeft, BookOpen, Clock, Users, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Mock course data
const courseData = {
  1: {
    id: 1,
    title: "Principles of Usul al-Fiqh in Shia Jurisprudence",
    category: "Fiqh",
    image: "/lovable-uploads/da7ba053-ff16-4d11-a30e-04db94a6ae7b.png",
    rating: 4.9,
    students: 3240,
    duration: "12 weeks",
    instructor: "Sheikh Mohammad Hasan",
    modules: [
      {
        id: 1,
        title: "Introduction to Usul al-Fiqh",
        description: "Foundation principles and history of Usul al-Fiqh in Shia tradition",
        completed: false,
        hasQuiz: true,
        lessons: [
          { id: 1, title: "What is Usul al-Fiqh?", completed: false },
          { id: 2, title: "Historical Development of Shia Jurisprudence", completed: false },
          { id: 3, title: "Relationship Between Fiqh and Usul", completed: false },
          { id: 4, title: "Key Figures in Shia Usul Development", completed: false }
        ]
      },
      {
        id: 2,
        title: "The Role of Aql (Reason) in Shia Usul",
        description: "Exploring reason as a source of Islamic law in Shia tradition",
        completed: false,
        hasQuiz: true,
        lessons: [
          { id: 1, title: "Aql as a Source of Law", completed: false },
          { id: 2, title: "Rational Proofs (Dalil al-Aqli)", completed: false },
          { id: 3, title: "Comparison with Sunni Approaches to Reason", completed: false }
        ]
      },
      {
        id: 3,
        title: "Ijma' and its Application in Shia Jurisprudence",
        description: "Understanding the concept of consensus in Shia legal theory",
        completed: false,
        hasQuiz: true,
        lessons: [
          { id: 1, title: "Definition and Scope of Ijma'", completed: false },
          { id: 2, title: "Historical Development of Ijma' in Shia Thought", completed: false },
          { id: 3, title: "Comparison with Sunni Concept of Ijma'", completed: false },
          { id: 4, title: "Contemporary Applications", completed: false }
        ]
      }
    ]
  },
  2: {
    id: 2,
    title: "Nahj al-Balagha: Wisdom of Imam Ali (AS)",
    category: "Theology",
    image: "/lovable-uploads/b9a867d0-d5e6-4773-968c-dee048722af5.png",
    rating: 4.8,
    students: 1850,
    duration: "10 weeks",
    instructor: "Sayyid Ali Husayni",
    modules: [
      {
        id: 1,
        title: "Historical Background of Nahj al-Balagha",
        description: "Exploring the compilation and history of this important text",
        completed: false,
        hasQuiz: true,
        lessons: [
          { id: 1, title: "Who was Sayyid Radi?", completed: false },
          { id: 2, title: "The Process of Compilation", completed: false },
          { id: 3, title: "Authenticity Debates", completed: false }
        ]
      },
      {
        id: 2,
        title: "Spiritual Insights from Imam Ali's Sermons",
        description: "Deep dive into the spiritual teachings in key sermons",
        completed: false,
        hasQuiz: true,
        lessons: [
          { id: 1, title: "The Sermon of Creation (Khutbat al-Ashbah)", completed: false },
          { id: 2, title: "The Sermon Without Dots", completed: false },
          { id: 3, title: "The Sermon of Skeletons", completed: false },
          { id: 4, title: "Spiritual Development in Imam Ali's Vision", completed: false }
        ]
      },
      {
        id: 3,
        title: "Ethical Teachings in Nahj al-Balagha",
        description: "Exploring the moral and ethical guidelines provided by Imam Ali",
        completed: false,
        hasQuiz: true,
        lessons: [
          { id: 1, title: "Social Justice in Nahj al-Balagha", completed: false },
          { id: 2, title: "Letter to Malik al-Ashtar", completed: false },
          { id: 3, title: "Personal Ethics and Self-Development", completed: false },
          { id: 4, title: "Contemporary Relevance of Imam Ali's Ethics", completed: false }
        ]
      }
    ]
  },
  3: {
    id: 3,
    title: "History of the Twelve Imams",
    category: "Islamic History",
    image: "/lovable-uploads/2cc7c1a7-23b7-4c96-aa2d-81e25bea3efe.png",
    rating: 4.7,
    students: 2760,
    duration: "8 weeks",
    instructor: "Dr. Hassan Qazwini",
    modules: [
      {
        id: 1,
        title: "The Life of Imam Ali (AS)",
        description: "Exploring the life and legacy of the first Imam",
        completed: false,
        hasQuiz: true,
        lessons: [
          { id: 1, title: "Early Life and Character", completed: false },
          { id: 2, title: "During the Prophet's Mission", completed: false },
          { id: 3, title: "The Question of Succession", completed: false },
          { id: 4, title: "Caliphate of Imam Ali", completed: false },
          { id: 5, title: "Martyrdom and Legacy", completed: false }
        ]
      },
      {
        id: 2,
        title: "Imam Hasan (AS) and Imam Husayn (AS)",
        description: "Understanding the lives and missions of the 2nd and 3rd Imams",
        completed: false,
        hasQuiz: true,
        lessons: [
          { id: 1, title: "Imam Hasan's Life and Character", completed: false },
          { id: 2, title: "The Peace Treaty with Muawiyah", completed: false },
          { id: 3, title: "Imam Husayn's Early Life", completed: false },
          { id: 4, title: "The Revolution and Martyrdom", completed: false }
        ]
      },
      {
        id: 3,
        title: "The Middle Imams: Sajjad to Askari (AS)",
        description: "Exploring the scholarly period of the Imamate",
        completed: false,
        hasQuiz: true,
        lessons: [
          { id: 1, title: "Imam Sajjad and the Sahifa al-Sajjadiyya", completed: false },
          { id: 2, title: "Imam Baqir and the Founding of Scholarly Traditions", completed: false },
          { id: 3, title: "Imam Sadiq and the Golden Era of Knowledge", completed: false },
          { id: 4, title: "Imams Kadhim, Ridha, Jawad, Hadi, and Askari", completed: false }
        ]
      }
    ]
  },
  4: {
    id: 4,
    title: "Karbala & Ashura: History and Commemoration",
    category: "Islamic History",
    image: "/lovable-uploads/40a0017f-7762-4a4a-889f-a6871d080dfe.png",
    rating: 4.9,
    students: 3850,
    duration: "6 weeks",
    instructor: "Sheikh Jafar Najafi",
    modules: [
      {
        id: 1,
        title: "Historical Context of Karbala",
        description: "Understanding the political and social situation leading to Karbala",
        completed: false,
        hasQuiz: true,
        lessons: [
          { id: 1, title: "Succession Crisis after the Prophet", completed: false },
          { id: 2, title: "The Rise of the Umayyads", completed: false },
          { id: 3, title: "Yazid's Accession to Power", completed: false }
        ]
      },
      {
        id: 2,
        title: "The Journey to Karbala",
        description: "Following Imam Husayn's path from Medina to Karbala",
        completed: false,
        hasQuiz: true,
        lessons: [
          { id: 1, title: "Departure from Medina", completed: false },
          { id: 2, title: "Stay in Mecca", completed: false },
          { id: 3, title: "The Road to Kufa and Karbala", completed: false }
        ]
      },
      {
        id: 3,
        title: "The Day of Ashura",
        description: "Detailed account of the tragedy of Karbala",
        completed: false,
        hasQuiz: true,
        lessons: [
          { id: 1, title: "The Final Negotiations", completed: false },
          { id: 2, title: "The Battle and Martyrdom", completed: false },
          { id: 3, title: "Aftermath and Captivity", completed: false }
        ]
      }
    ]
  }
};

// Function to get course data from localStorage or initialize it
const getStoredCourseData = (courseId: string) => {
  const storedData = localStorage.getItem(`course_${courseId}`);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return courseData[parseInt(courseId) as keyof typeof courseData] || null;
};

// Function to save course data to localStorage
const storeCourseData = (courseId: string, data: any) => {
  localStorage.setItem(`course_${courseId}`, JSON.stringify(data));
};

const CourseContentPages = () => {
  const { courseId, contentId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [selectedModule, setSelectedModule] = useState<number | undefined>(undefined);
  const [selectedLesson, setSelectedLesson] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      const data = getStoredCourseData(courseId);
      if (data) {
        setCourse(data);
        
        // If contentId is provided, try to find the matching module and lesson
        if (contentId) {
          // Parse contentId to find module and lesson
          const parts = contentId.split('-');
          if (parts.length === 2) {
            const moduleId = parseInt(parts[0]);
            const lessonId = parseInt(parts[1]);
            
            // Check if this module and lesson exist
            const moduleExists = data.modules.some((m: any) => m.id === moduleId);
            if (moduleExists) {
              setSelectedModule(moduleId);
              setSelectedLesson(lessonId);
            }
          } else {
            // If content format is not as expected, just use the first module/lesson
            if (data.modules.length > 0) {
              setSelectedModule(data.modules[0].id);
              if (data.modules[0].lessons.length > 0) {
                setSelectedLesson(data.modules[0].lessons[0].id);
              }
            }
          }
        } else {
          // If no contentId is provided, use the first module and lesson
          if (data.modules.length > 0) {
            setSelectedModule(data.modules[0].id);
            if (data.modules[0].lessons.length > 0) {
              setSelectedLesson(data.modules[0].lessons[0].id);
            }
          }
        }
      }
      setLoading(false);
    }
  }, [courseId, contentId]);

  // Add a listener for the custom lessonSelected event
  useEffect(() => {
    const handleLessonSelected = (e: CustomEvent) => {
      const { moduleId, lessonId } = e.detail;
      setSelectedModule(moduleId);
      setSelectedLesson(lessonId);
      
      // Update the URL without reloading the page
      if (courseId) {
        navigate(`/courses/${courseId}/content/${moduleId}-${lessonId}`, { replace: true });
      }
    };

    window.addEventListener('lessonSelected', handleLessonSelected as EventListener);
    
    return () => {
      window.removeEventListener('lessonSelected', handleLessonSelected as EventListener);
    };
  }, [courseId, navigate]);

  const handleModuleSelect = (moduleId: number) => {
    setSelectedModule(moduleId);
    
    // Find the first lesson in this module
    const module = course?.modules.find((m: any) => m.id === moduleId);
    if (module && module.lessons.length > 0) {
      setSelectedLesson(module.lessons[0].id);
      
      // Update URL
      if (courseId) {
        navigate(`/courses/${courseId}/content/${moduleId}-${module.lessons[0].id}`, { replace: true });
      }
    }
  };
  
  const handleLessonSelect = (moduleId: number, lessonId: number) => {
    setSelectedModule(moduleId);
    setSelectedLesson(lessonId);
    
    // Update URL
    if (courseId) {
      navigate(`/courses/${courseId}/content/${moduleId}-${lessonId}`, { replace: true });
    }
  };

  const handleMarkComplete = (moduleId: number, lessonId: number) => {
    if (!courseId) return;
    
    const updatedCourse = {
      ...course,
      modules: course.modules.map((module: any) => {
        if (module.id === moduleId) {
          // Update the specific lesson
          const updatedLessons = module.lessons.map((lesson: any) => {
            if (lesson.id === lessonId) {
              return { ...lesson, completed: !lesson.completed };
            }
            return lesson;
          });
          
          // Check if all lessons are completed to mark module as completed
          const allLessonsCompleted = updatedLessons.every((lesson: any) => lesson.completed);
          
          return {
            ...module,
            lessons: updatedLessons,
            completed: allLessonsCompleted
          };
        }
        return module;
      })
    };
    
    setCourse(updatedCourse);
    storeCourseData(courseId, updatedCourse);
  };

  // Calculate current lesson content
  const getCurrentLessonContent = () => {
    if (!selectedModule || !selectedLesson) return null;
    
    const module = course?.modules.find((m: any) => m.id === selectedModule);
    if (!module) return null;
    
    const lesson = module.lessons.find((l: any) => l.id === selectedLesson);
    if (!lesson) return null;
    
    return {
      moduleTitle: module.title,
      lessonTitle: lesson.title,
      moduleDescription: module.description
    };
  };

  // Function to navigate to the next lesson
  const goToNextLesson = () => {
    if (!selectedModule || !selectedLesson || !courseId) return;
    
    const currentModule = course.modules.find((m: any) => m.id === selectedModule);
    if (!currentModule) return;
    
    // Find the index of the current lesson
    const currentLessonIndex = currentModule.lessons.findIndex((l: any) => l.id === selectedLesson);
    
    // If there's another lesson in the current module
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      const nextLesson = currentModule.lessons[currentLessonIndex + 1];
      setSelectedLesson(nextLesson.id);
      navigate(`/courses/${courseId}/content/${selectedModule}-${nextLesson.id}`, { replace: true });
    } 
    // If we need to go to the next module
    else {
      const currentModuleIndex = course.modules.findIndex((m: any) => m.id === selectedModule);
      if (currentModuleIndex < course.modules.length - 1) {
        const nextModule = course.modules[currentModuleIndex + 1];
        setSelectedModule(nextModule.id);
        if (nextModule.lessons.length > 0) {
          const firstLesson = nextModule.lessons[0];
          setSelectedLesson(firstLesson.id);
          navigate(`/courses/${courseId}/content/${nextModule.id}-${firstLesson.id}`, { replace: true });
        }
      }
    }
  };
  
  // Function to check if there's a next lesson available
  const hasNextLesson = () => {
    if (!selectedModule || !selectedLesson) return false;
    
    const currentModule = course?.modules.find((m: any) => m.id === selectedModule);
    if (!currentModule) return false;
    
    const currentLessonIndex = currentModule.lessons.findIndex((l: any) => l.id === selectedLesson);
    
    // Check if there's another lesson in the current module
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      return true;
    }
    
    // Check if there's another module
    const currentModuleIndex = course.modules.findIndex((m: any) => m.id === selectedModule);
    return currentModuleIndex < course.modules.length - 1;
  };

  const lessonContent = getCurrentLessonContent();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory-light">
        <div className="animate-pulse text-emerald">Loading course content...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen pt-16 bg-ivory-light">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-6">The course you are looking for does not exist or has been removed.</p>
          <button 
            onClick={() => navigate('/courses')}
            className="px-4 py-2 bg-emerald text-white rounded-md hover:bg-emerald-dark transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const isCurrentLessonCompleted = () => {
    if (!selectedModule || !selectedLesson) return false;
    const module = course.modules.find((m: any) => m.id === selectedModule);
    if (!module) return false;
    const lesson = module.lessons.find((l: any) => l.id === selectedLesson);
    return lesson?.completed || false;
  };

  return (
    <div className="min-h-screen bg-ivory-light">
      <Navbar />
      
      <div className="pt-16 md:pt-20">
        {/* Course Header */}
        <div className="bg-emerald-dark text-white py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <button 
              onClick={() => navigate('/courses')} 
              className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Courses
            </button>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{course.title}</h1>
                <p className="text-white/80">Instructor: {course.instructor}</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-white/90">
                  <Users size={16} className="mr-1.5" />
                  <span>{course.students?.toLocaleString()} students</span>
                </div>
                <div className="flex items-center text-white/90">
                  <Clock size={16} className="mr-1.5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-white/90">
                  <Award size={16} className="mr-1.5" />
                  <span>{course.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Modules */}
            <div className="lg:col-span-1">
              <ModuleSystem 
                courseId={course.id}
                courseTitle={course.title}
                modules={course.modules}
                onModuleSelect={handleModuleSelect}
                onLessonSelect={handleLessonSelect}
                onMarkComplete={handleMarkComplete}
                selectedModule={selectedModule}
                selectedLesson={selectedLesson}
              />
            </div>
            
            {/* Right Content Area - Lesson Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                {lessonContent ? (
                  <div>
                    <div className="px-6 py-4 border-b border-gray-100">
                      <h3 className="text-xl font-bold text-gray-800">{lessonContent.lessonTitle}</h3>
                      <p className="text-sm text-gray-500">Module: {lessonContent.moduleTitle}</p>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{lessonContent.moduleDescription}</p>
                      
                      {/* This is where actual course content would go */}
                      <div className="prose max-w-none">
                        <p>
                          This is the lesson content for <strong>{lessonContent.lessonTitle}</strong> from the module <strong>{lessonContent.moduleTitle}</strong>.
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                        </p>
                        <h4>Key Concepts</h4>
                        <ul>
                          <li>Important concept one related to this lesson</li>
                          <li>Another crucial understanding for students</li>
                          <li>Historical context and significance</li>
                          <li>Practical application in modern context</li>
                        </ul>
                        <p>
                          Etiam eget ullamcorper magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis, nunc et ullamcorper ultricies, nisl nisl aliquam nisl.
                        </p>
                        <blockquote>
                          "Important quote related to this lesson's content that provides deeper insight or historical context."
                        </blockquote>
                        <p>
                          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis, nunc et ullamcorper ultricies, nisl nisl aliquam nisl.
                        </p>
                      </div>
                      
                      {/* Mark as Complete Button and Next Lesson */}
                      <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="flex flex-col gap-3">
                          <Button
                            onClick={() => {
                              if (selectedModule && selectedLesson) {
                                handleMarkComplete(selectedModule, selectedLesson);
                              }
                            }}
                            className={cn(
                              isCurrentLessonCompleted() 
                                ? "bg-emerald/10 text-emerald border border-emerald/20" 
                                : "bg-emerald text-white hover:bg-emerald-dark"
                            )}
                          >
                            <CheckCircle size={18} className="mr-2" />
                            {isCurrentLessonCompleted() 
                              ? "Marked as Completed" 
                              : "Mark as Complete"}
                          </Button>
                          
                          {isCurrentLessonCompleted() && hasNextLesson() && (
                            <Button 
                              onClick={goToNextLesson} 
                              className="bg-emerald-dark hover:bg-emerald-dark/90 text-white"
                            >
                              Next Lesson
                              <ArrowRight size={18} className="ml-2" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No Lesson Selected</h3>
                    <p className="text-gray-500">Please select a module and lesson from the sidebar to start learning</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseContentPages;
