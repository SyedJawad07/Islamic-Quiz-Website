import React, { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp, Play, BookOpen, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Lesson {
  id: number;
  title: string;
  completed: boolean;
}

interface Module {
  id: number;
  title: string;
  description?: string;
  lessons: Lesson[];
  hasQuiz: boolean;
  completed: boolean;
}

interface ModuleSystemProps {
  courseId: number;
  courseTitle: string;
  modules: Module[];
  onModuleSelect: (moduleId: number) => void;
  onMarkComplete: (moduleId: number, lessonId: number) => void;
  onLessonSelect?: (moduleId: number, lessonId: number) => void;
  selectedModule?: number;
  selectedLesson?: number;
}

const ModuleSystem = ({
  courseId,
  courseTitle,
  modules,
  onModuleSelect,
  onMarkComplete,
  onLessonSelect,
  selectedModule,
  selectedLesson
}: ModuleSystemProps) => {
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const { toast } = useToast();

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  };

  const handleModuleSelect = (moduleId: number) => {
    onModuleSelect(moduleId);
    // Auto-expand the selected module
    if (!expandedModules.includes(moduleId)) {
      setExpandedModules(prev => [...prev, moduleId]);
    }
  };

  const handleLessonSelect = (moduleId: number, lessonId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the event from bubbling up
    
    // Ensure the module is expanded
    if (!expandedModules.includes(moduleId)) {
      setExpandedModules(prev => [...prev, moduleId]);
    }
    
    // Call the module select first to update the parent state
    onModuleSelect(moduleId);
    
    // If onLessonSelect prop is provided, use that
    if (onLessonSelect) {
      onLessonSelect(moduleId, lessonId);
    } else {
      // Otherwise use the custom event approach as fallback
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('lessonSelected', { 
          detail: { moduleId, lessonId } 
        });
        window.dispatchEvent(event);
      }
    }
  };

  const handleMarkComplete = (moduleId: number, lessonId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event propagation
    onMarkComplete(moduleId, lessonId);
    toast({
      title: "Progress Saved",
      description: "Your progress has been updated.",
    });
  };

  const calculateProgress = (mod: Module) => {
    const completedLessons = mod.lessons.filter(lesson => lesson.completed).length;
    return mod.lessons.length > 0 ? (completedLessons / mod.lessons.length) * 100 : 0;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-4 py-3 bg-emerald-50 border-b border-emerald-100">
        <h3 className="text-lg font-bold text-emerald-dark">Course Modules</h3>
        <p className="text-sm text-emerald-dark/70">{courseTitle}</p>
      </div>
      
      <div className="divide-y divide-gray-100">
        {modules.map((module) => {
          const progress = calculateProgress(module);
          const isExpanded = expandedModules.includes(module.id);
          const isSelected = selectedModule === module.id;
          
          return (
            <div key={module.id} className="overflow-hidden">
              <div 
                className={cn(
                  "flex items-start justify-between p-4 cursor-pointer transition-colors",
                  isSelected ? "bg-emerald-50" : "hover:bg-gray-50"
                )}
                onClick={() => handleModuleSelect(module.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    module.completed 
                      ? "bg-emerald text-white" 
                      : progress > 0 
                        ? "bg-emerald/10 text-emerald" 
                        : "bg-gray-100 text-gray-400"
                  )}>
                    {module.completed ? (
                      <CheckCircle size={18} />
                    ) : (
                      <span className="text-sm font-semibold">{module.id}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{module.title}</h4>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <BookOpen size={12} className="mr-1" />
                      <span>{module.lessons.length} lessons</span>
                      {module.hasQuiz && (
                        <span className="flex items-center ml-3">
                          <CheckSquare size={12} className="mr-1" />
                          Includes quiz
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleModule(module.id);
                  }}
                  className="p-1 text-gray-500 hover:text-emerald hover:bg-emerald-50 rounded-full transition-colors"
                >
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
              
              {/* Progress bar */}
              <div className="px-4 pb-1">
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full", 
                      module.completed ? "bg-emerald" : "bg-emerald/60"
                    )}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Lessons (expandable) */}
              <div className={cn(
                "transition-all duration-300 overflow-hidden bg-gray-50",
                isExpanded ? "max-h-96" : "max-h-0"
              )}>
                <div className="p-2 pl-14 space-y-1">
                  {module.lessons.map((lesson) => (
                    <div 
                      key={lesson.id}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer",
                        selectedModule === module.id && selectedLesson === lesson.id 
                          ? "bg-emerald-100 text-emerald-dark"
                          : "hover:bg-gray-100 text-gray-700"
                      )}
                      onClick={(e) => handleLessonSelect(module.id, lesson.id, e)}
                    >
                      <div className="flex items-center">
                        <Play size={14} className="mr-2 text-emerald" />
                        <span className="text-sm">{lesson.title}</span>
                      </div>
                      <button
                        onClick={(e) => handleMarkComplete(module.id, lesson.id, e)}
                        className={cn(
                          "p-1.5 rounded-full transition-colors", 
                          lesson.completed 
                            ? "text-emerald bg-emerald/10" 
                            : "text-gray-400 hover:bg-gray-200"
                        )}
                      >
                        <CheckCircle size={16} className={lesson.completed ? "fill-emerald/20" : ""} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleSystem;
