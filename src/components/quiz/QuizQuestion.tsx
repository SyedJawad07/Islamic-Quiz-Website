
import React from 'react';
import { cn } from '@/lib/utils';
import QuizOption from './QuizOption';

interface QuizQuestionProps {
  currentQuestion: any;
  score: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedOption: string | null;
  isAnswered: boolean;
  isCorrect: boolean;
  onOptionSelect: (optionId: string) => void;
  onSubmit: () => void;
  onNextQuestion: () => void;
  translations: {
    quickQuiz: string;
    score: string;
    question: string;
    of: string;
    complete: string;
    submitAnswer: string;
    correct: string;
    incorrect: string;
    nextQuestion: string;
    completeQuiz: string;
  };
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  currentQuestion,
  score,
  currentQuestionIndex,
  totalQuestions,
  selectedOption,
  isAnswered,
  isCorrect,
  onOptionSelect,
  onSubmit,
  onNextQuestion,
  translations
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-xl transform transition-all duration-300">
      <div className="bg-emerald p-6">
        <h3 className="text-xl font-bold text-white">{translations.quickQuiz}</h3>
        <div className="flex justify-between items-center mt-2">
          <div className="text-white/70 text-sm">
            {translations.score}: {score}/{currentQuestionIndex + (isAnswered ? 1 : 0)}
          </div>
        </div>
        <div className="w-full h-1 bg-white/20 rounded-full mt-4">
          <div 
            className="h-full bg-gold rounded-full transition-all duration-300" 
            style={{ width: `${(currentQuestionIndex / totalQuestions) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-white/70 text-xs mt-1">
          <span>{translations.question} {currentQuestionIndex + 1} {translations.of} {totalQuestions}</span>
          <span>{Math.round((currentQuestionIndex / totalQuestions) * 100)}% {translations.complete}</span>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-lg font-medium mb-6">
          {currentQuestion.question}
        </p>
        
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option) => (
            <QuizOption
              key={option.id}
              option={option}
              isSelected={selectedOption === option.id}
              isAnswered={isAnswered}
              isCorrect={isAnswered && selectedOption === option.id && selectedOption === currentQuestion.correctAnswer}
              correctAnswerId={currentQuestion.correctAnswer}
              onClick={() => onOptionSelect(option.id)}
              rtl={false}
            />
          ))}
        </div>
        
        {isAnswered ? (
          <div className="space-y-4">
            <div className={cn(
              "p-4 rounded-lg bg-gray-50 border",
              isCorrect ? "border-green-200" : "border-red-200"
            )}>
              <h4 className={cn(
                "text-lg font-medium mb-2",
                isCorrect ? "text-green-700" : "text-red-700"
              )}>
                {isCorrect ? translations.correct : translations.incorrect}
              </h4>
              <p className="text-gray-700">
                {currentQuestion.explanation}
              </p>
            </div>
            
            <button
              onClick={onNextQuestion}
              className="w-full py-3 px-4 bg-emerald-dark hover:bg-emerald text-white font-medium rounded-lg transition-colors duration-300"
            >
              {currentQuestionIndex < totalQuestions - 1 ? translations.nextQuestion : translations.completeQuiz}
            </button>
          </div>
        ) : (
          <button
            onClick={onSubmit}
            disabled={!selectedOption}
            className={cn(
              "w-full py-3 px-4 font-medium rounded-lg transition-colors duration-300",
              selectedOption ? "bg-emerald-dark hover:bg-emerald text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
            )}
          >
            {translations.submitAnswer}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;
