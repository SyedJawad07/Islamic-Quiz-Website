
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import QuizIntro from './quiz/QuizIntro';
import QuizQuestion from './quiz/QuizQuestion';
import QuizResults from './quiz/QuizResults';
import { quizTranslations } from './quiz/quizTranslations';
import { quizQuestions } from './quiz/quizQuestions';

const QuizSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Use only English translations
  const language = 'en';
  const translations = quizTranslations[language];
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption || isAnswered) return;
    
    const isAnswerCorrect = selectedOption === currentQuestion.correctAnswer;
    
    setIsAnswered(true);
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const moveToNextQuestion = () => {
    const maxQuestions = quizQuestions.length;
    
    if (currentQuestionIndex < maxQuestions - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setShowQuiz(false);
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
    
    const section = document.getElementById('quiz-section');
    if (section) {
      observer.observe(section);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="quiz-section" className="py-20 bg-emerald relative overflow-hidden mt-16">
      <div className="absolute inset-0 islamic-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald to-emerald-dark opacity-90"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={cn(
          "text-center mb-12 opacity-0 transform translate-y-4",
          isVisible && "animate-slide-up opacity-100 translate-y-0"
        )}>
          <h3 className="inline-block px-3 py-1 text-xs font-semibold bg-gold/20 text-gold rounded-full mb-4">
            {translations.testYourKnowledge}
          </h3>
          <h2 className="text-4xl font-bold mb-4 text-white">{translations.aiPoweredQuizzes}</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            {translations.quizDescription}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className={cn(
            "flex-1 text-white space-y-6 opacity-0",
            isVisible && "animate-fade-in opacity-100 animate-delay-200"
          )}>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{translations.personalizedLearning}</h3>
                <p className="text-white/70">
                  {translations.personalizedDescription}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{translations.comprehensiveTopics}</h3>
                <p className="text-white/70">
                  {translations.comprehensiveDescription}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{translations.progressTracking}</h3>
                <p className="text-white/70">
                  {translations.progressDescription}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowQuiz(true)}
              className="gold-button mt-6 inline-flex items-center group"
            >
              {translations.challengeYourself}
              <svg className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          
          <div className={cn(
            "flex-1 opacity-0",
            isVisible && "animate-fade-in opacity-100 animate-delay-300"
          )}>
            {showQuiz ? (
              quizCompleted ? (
                <QuizResults 
                  score={score}
                  totalQuestions={quizQuestions.length}
                  onReset={resetQuiz}
                  translations={{
                    quizResults: translations.quizResults,
                    quizComplete: translations.quizComplete,
                    yourScore: translations.yourScore,
                    perfectScore: translations.perfectScore,
                    greatJob: translations.greatJob,
                    keepLearning: translations.keepLearning,
                    tryAnother: translations.tryAnother
                  }}
                />
              ) : (
                <QuizQuestion
                  currentQuestion={currentQuestion}
                  score={score}
                  currentQuestionIndex={currentQuestionIndex}
                  totalQuestions={quizQuestions.length}
                  selectedOption={selectedOption}
                  isAnswered={isAnswered}
                  isCorrect={isCorrect}
                  onOptionSelect={handleOptionSelect}
                  onSubmit={handleSubmit}
                  onNextQuestion={moveToNextQuestion}
                  translations={{
                    quickQuiz: translations.quickQuiz,
                    score: translations.score,
                    question: translations.question,
                    of: translations.of,
                    complete: translations.complete,
                    submitAnswer: translations.submitAnswer,
                    correct: translations.correct,
                    incorrect: translations.incorrect,
                    nextQuestion: translations.nextQuestion,
                    completeQuiz: translations.completeQuiz
                  }}
                />
              )
            ) : (
              <QuizIntro 
                onStartQuiz={() => setShowQuiz(true)}
                translations={{
                  testKnowledge: translations.testKnowledge,
                  takeQuiz: translations.takeQuiz,
                  startQuiz: translations.startQuiz
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
