
import React from 'react';

interface QuizIntroProps {
  onStartQuiz: () => void;
  translations: {
    testKnowledge: string;
    takeQuiz: string;
    startQuiz: string;
  };
}

const QuizIntro: React.FC<QuizIntroProps> = ({ 
  onStartQuiz,
  translations
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-xl transform transition-all duration-300">
      <div className="p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald/20 mx-auto flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-3 text-gray-800">{translations.testKnowledge}</h3>
        <p className="text-gray-600 mb-8">
          {translations.takeQuiz}
        </p>
        <button 
          onClick={onStartQuiz}
          className="gold-button mx-auto"
        >
          {translations.startQuiz}
        </button>
      </div>
    </div>
  );
};

export default QuizIntro;
