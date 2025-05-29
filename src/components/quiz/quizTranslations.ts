
interface QuizTranslations {
  // Header & descriptions
  testYourKnowledge: string;
  aiPoweredQuizzes: string;
  quizDescription: string;
  
  // Feature descriptions
  personalizedLearning: string;
  personalizedDescription: string;
  comprehensiveTopics: string;
  comprehensiveDescription: string;
  progressTracking: string;
  progressDescription: string;
  challengeYourself: string;
  
  // Quiz intro
  testKnowledge: string;
  takeQuiz: string;
  startQuiz: string;
  
  // Quiz UI
  quickQuiz: string;
  seconds: string;
  score: string;
  question: string;
  of: string;
  complete: string;
  submitAnswer: string;
  correct: string;
  incorrect: string;
  nextQuestion: string;
  completeQuiz: string;
  
  // Results
  quizResults: string;
  quizComplete: string;
  yourScore: string;
  perfectScore: string;
  greatJob: string;
  keepLearning: string;
  tryAnother: string;
}

type LanguageMap = {
  [key in 'en' | 'ur']: QuizTranslations;
};

export const quizTranslations: LanguageMap = {
  en: {
    // Header & descriptions
    testYourKnowledge: "TEST YOUR KNOWLEDGE",
    aiPoweredQuizzes: "AI-Powered Islamic Quizzes",
    quizDescription: "Challenge yourself with our adaptive quizzes that adjust to your knowledge level and help you grow in your Islamic understanding.",
    
    // Feature descriptions
    personalizedLearning: "Personalized Learning",
    personalizedDescription: "Our AI algorithm adapts quiz difficulty based on your performance, ensuring an optimal learning experience.",
    comprehensiveTopics: "Comprehensive Topics",
    comprehensiveDescription: "From basic Islamic principles to advanced theological concepts, our quizzes cover the full spectrum of knowledge.",
    progressTracking: "Progress Tracking",
    progressDescription: "Monitor your growth with detailed analytics and identify areas for improvement in your Islamic studies.",
    challengeYourself: "Challenge Yourself",
    
    // Quiz intro
    testKnowledge: "Test Your Knowledge",
    takeQuiz: "Take a quick quiz to test your understanding of Islamic concepts.",
    startQuiz: "Start Quiz",
    
    // Quiz UI
    quickQuiz: "Quick Quiz",
    seconds: "seconds",
    score: "Score",
    question: "Question",
    of: "of",
    complete: "Complete",
    submitAnswer: "Submit Answer",
    correct: "Correct!",
    incorrect: "Incorrect!",
    nextQuestion: "Next Question",
    completeQuiz: "Complete Quiz",
    
    // Results
    quizResults: "Quiz Results",
    quizComplete: "Quiz Complete!",
    yourScore: "Your score:",
    perfectScore: "Perfect score! Excellent knowledge!",
    greatJob: "Great job! You have a solid understanding.",
    keepLearning: "Keep learning and try again soon!",
    tryAnother: "Try Another Quiz"
  },
  
  ur: {
    // Header & descriptions
    testYourKnowledge: "اپنے علم کا امتحان لیں",
    aiPoweredQuizzes: "مصنوعی ذہانت سے چلنے والے اسلامی کوئز",
    quizDescription: "ہمارے موافقتی کوئز کے ساتھ خود کو چیلنج کریں جو آپ کے علم کی سطح کے مطابق ڈھلتے ہیں اور آپ کو اسلامی فہم میں بڑھنے میں مدد کرتے ہیں۔",
    
    // Feature descriptions
    personalizedLearning: "ذاتی سیکھنے کا عمل",
    personalizedDescription: "ہماری مصنوعی ذہانت الگورتھم آپ کی کارکردگی کی بنیاد پر کوئز کی مشکل کو موافق بناتی ہے، جس سے بہترین سیکھنے کا تجربہ یقینی بنتا ہے۔",
    comprehensiveTopics: "جامع موضوعات",
    comprehensiveDescription: "بنیادی اسلامی اصولوں سے لے کر اعلی نظریاتی تصورات تک، ہمارے کوئز علم کے پورے طیف کو احاطہ کرتے ہیں۔",
    progressTracking: "ترقی کی نگرانی",
    progressDescription: "تفصیلی تجزیوں کے ذریعے اپنی نمو کی نگرانی کریں اور اپنی اسلامی تعلیم میں بہتری کے شعبوں کی شناخت کریں۔",
    challengeYourself: "خود کو چیلنج کریں",
    
    // Quiz intro
    testKnowledge: "اپنے علم کا امتحان لیں",
    takeQuiz: "اسلامی تصورات کی اپنی سمجھ کو جانچنے کے لیے ایک فوری کوئز لیں۔",
    startQuiz: "کوئز شروع کریں",
    
    // Quiz UI
    quickQuiz: "فوری کوئز",
    seconds: "سیکنڈز",
    score: "اسکور",
    question: "سوال",
    of: "میں سے",
    complete: "مکمل",
    submitAnswer: "جواب جمع کریں",
    correct: "درست!",
    incorrect: "غلط!",
    nextQuestion: "اگلا سوال",
    completeQuiz: "کوئز مکمل کریں",
    
    // Results
    quizResults: "کوئز کے نتائج",
    quizComplete: "کوئز مکمل ہوگیا!",
    yourScore: "آپ کا اسکور:",
    perfectScore: "پرفیکٹ اسکور! شاندار علم!",
    greatJob: "بہت اچھا! آپ کی سمجھ مضبوط ہے۔",
    keepLearning: "سیکھتے رہیں اور جلد ہی دوبارہ کوشش کریں!",
    tryAnother: "ایک اور کوئز آزمائیں"
  }
};
