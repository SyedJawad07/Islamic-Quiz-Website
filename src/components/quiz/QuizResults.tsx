
import React from 'react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onReset: () => void;
  translations: {
    quizResults: string;
    quizComplete: string;
    yourScore: string;
    perfectScore: string;
    greatJob: string;
    keepLearning: string;
    tryAnother: string;
  };
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  score, 
  totalQuestions, 
  onReset,
  translations
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-xl transform transition-all duration-300">
      <div className="bg-emerald p-6">
        <h3 className="text-xl font-bold text-white">{translations.quizResults}</h3>
      </div>
      
      <div className="p-6 text-center">
        <div className="w-24 h-24 rounded-full bg-gold/20 mx-auto flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-3">{translations.quizComplete}</h3>
        <p className="text-gray-600 mb-2">{translations.yourScore}</p>
        <div className="text-4xl font-bold text-emerald mb-6">
          {score} / {totalQuestions}
        </div>
        <p className="text-gray-600 mb-6">
          {score === totalQuestions 
            ? translations.perfectScore 
            : score >= totalQuestions * 0.7 
              ? translations.greatJob 
              : translations.keepLearning}
        </p>
        <button 
          onClick={onReset}
          className="gold-button mx-auto"
        >
          {translations.tryAnother}
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
