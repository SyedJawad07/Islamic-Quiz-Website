
import React from 'react';
import { cn } from '@/lib/utils';

interface QuizOptionProps {
  option: {
    id: string;
    text: string;
  };
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  correctAnswerId: string;
  onClick: () => void;
  rtl?: boolean;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  isAnswered,
  isCorrect,
  correctAnswerId,
  onClick,
  rtl = false
}) => {
  const isCorrectAnswer = option.id === correctAnswerId;
  
  return (
    <div
      className={cn(
        "relative p-3 border rounded-lg cursor-pointer transition-all transform",
        isSelected && !isAnswered && "border-emerald",
        isAnswered && isCorrectAnswer && "border-green-500 bg-green-50",
        isAnswered && isSelected && !isCorrectAnswer && "border-red-500 bg-red-50",
        isAnswered && !isSelected && "opacity-60 cursor-not-allowed",
        !isAnswered && "hover:border-emerald hover:shadow-sm"
      )}
      onClick={isAnswered ? undefined : onClick}
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center">
        <div
          className={cn(
            "w-6 h-6 flex items-center justify-center rounded-full border mr-3",
            rtl && "ml-3 mr-0",
            isSelected && !isAnswered && "border-emerald bg-emerald text-white",
            isAnswered && isCorrectAnswer && "border-green-500 bg-green-500 text-white",
            isAnswered && isSelected && !isCorrectAnswer && "border-red-500 bg-red-500 text-white",
            !isSelected && !isAnswered && "border-gray-300"
          )}
        >
          <span className="text-sm font-medium">{option.id.toUpperCase()}</span>
        </div>
        <span className={cn(
          "flex-1",
          isSelected && !isAnswered && "font-medium text-emerald-dark",
          isAnswered && isCorrectAnswer && "font-medium text-green-700",
          isAnswered && isSelected && !isCorrectAnswer && "font-medium text-red-700"
        )}>
          {option.text}
        </span>
        
        {isAnswered && isCorrectAnswer && (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        )}
        
        {isAnswered && isSelected && !isCorrectAnswer && (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        )}
      </div>
    </div>
  );
};

export default QuizOption;
