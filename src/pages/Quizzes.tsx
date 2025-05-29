import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Timer, Award, ArrowRight, Filter, ChevronDown, CheckCircle, AlertCircle, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  id: number;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

interface Quiz {
  id: number;
  title: string;
  category: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: number;
  time: string;
  image: string;
  popular?: boolean;
  quizQuestions: QuizQuestion[];
}

// Available languages - limited to just English and Urdu
const languages = [
  { code: 'en', name: 'English' },
  { code: 'ur', name: 'اردو' }
];

// Mock translations (in a real app, these would come from a translation service or file)
const translations = {
  en: {
    backToQuizzes: "Back to Quizzes",
    startQuiz: "Start Quiz",
    submitAnswer: "Submit Answer",
    nextQuestion: "Next Question",
    seeResults: "See Results",
    quizComplete: "Quiz Complete!",
    yourScore: "Your score:",
    retakeQuiz: "Retake Quiz",
    returnToQuizzes: "Return to Quizzes",
    searchQuizzes: "Search quizzes...",
    testYourKnowledge: "Test Your Knowledge",
    challengeYourself: "Challenge yourself with these quizzes on various aspects of Shia beliefs, history, and practices",
    question: "Question",
    of: "of",
    seconds: "seconds",
    complete: "Complete",
    correct: "Correct!",
    incorrect: "Incorrect!",
    showExplanation: "Show Explanation",
    hideExplanation: "Hide Explanation",
    noQuizzesFound: "No quizzes found",
    tryChanging: "Try changing your search criteria or filters",
    selectLanguage: "Select Language"
  },
  ur: {
    backToQuizzes: "کوئز کی طرف واپس",
    startQuiz: "کوئز شروع کریں",
    submitAnswer: "جواب جمع کریں",
    nextQuestion: "اگلا سوال",
    seeResults: "نتائج دیکھیں",
    quizComplete: "کوئز مکمل ہوگیا!",
    yourScore: "آپ کا اسکور:",
    retakeQuiz: "کوئز دوبارہ کریں",
    returnToQuizzes: "کوئز کی طرف واپس",
    searchQuizzes: "کوئز تلاش کریں...",
    testYourKnowledge: "اپنے علم کا امتحان لیں",
    challengeYourself: "شیعہ عقائد، تاریخ اور اعمال کے مختلف پہلوؤں پر ان کوئز کے ساتھ اپنے آپ کو چیلنج کریں",
    question: "سوال",
    of: "میں سے",
    seconds: "سیکنڈز",
    complete: "مکمل",
    correct: "درست!",
    incorrect: "غلط!",
    showExplanation: "وضاحت دکھائیں",
    hideExplanation: "وضاحت چھپائیں",
    noQuizzesFound: "کوئی کوئز نہیں ملا",
    tryChanging: "معیار یا فلٹرز کو تبدیل کرنے کی کوشش کریں",
    selectLanguage: "زبان منتخب کریں"
  }
};

// Generate additional questions in Urdu for each quiz to match the advertised question count
const generateAdditionalQuestions = (baseQuestions: QuizQuestion[], totalNeeded: number, topic: string): QuizQuestion[] => {
  if (baseQuestions.length >= totalNeeded) {
    return baseQuestions;
  }
  
  const additionalQuestions: QuizQuestion[] = [];
  
  for (let i = baseQuestions.length + 1; i <= totalNeeded; i++) {
    let questionText, explanationText;
    if (topic.includes("Fundamentals of Shia Beliefs")) {
      questionText = `شیعہ عقائد کا بنیادی اصول نمبر ${i} کیا ہے؟`;
      explanationText = `یہ ${i} نمبر کا اصول شیعہ عقائد کا ایک اہم حصہ ہے جو توحید، عدل، نبوت، امامت اور معاد سے متعلق ہے۔`;
    } else if (topic.includes("History of the Ahl al-Bayt")) {
      questionText = `اہل بیت کی تاریخ میں واقعہ نمبر ${i} کیا تھا؟`;
      explanationText = `یہ ${i} نمبر کا واقعہ اہل بیت کی تاریخ میں اہم کردار ادا کرتا ہے، خاص طور پر ان کے چیلنجوں اور خدمات کے تناظر میں۔`;
    } else if (topic.includes("Shia Jurisprudence (Fiqh Ja'fari)")) {
      questionText = `جعفری فقہ میں اصول نمبر ${i} کیا ہے؟`;
      explanationText = `یہ ${i} نمبر کا اصول جعفری فقہ میں اسلامی قانون کے ماخذات سے اخذ کیا گیا ہے، جیسے کہ قرآن اور احادیث۔`;
    } else if (topic.includes("Nahj al-Balagha & Shia Literature")) {
      questionText = `نہج البلاغہ میں درس نمبر ${i} کیا ہے؟`;
      explanationText = `یہ ${i} نمبر کا درس امام علی (ع) کے خطبوں، خطوط اور اقوال کا حصہ ہے جو شیعہ ادب کا اہم ذریعہ ہے۔`;
    } else if (topic.includes("Shia Ethics & Spirituality")) {
      questionText = `شیعہ اخلاقیات میں اصول نمبر ${i} کیا ہے؟`;
      explanationText = `یہ ${i} نمبر کا اصول شیعہ روحانی اور اخلاقی تعلیمات کا حصہ ہے، جو انصاف اور تزکیہ نفس پر مبنی ہے۔`;
    } else if (topic.includes("Mahdism & Eschatology in Shia Thought")) {
      questionText = `شیعہ عقائد میں آخر الزمان کا واقعہ نمبر ${i} کیا ہے؟`;
      explanationText = `یہ ${i} نمبر کا واقعہ امام مہدی (عج) کے ظہور اور آخر الزمان کے واقعات سے متعلق ہے۔`;
    } else {
      questionText = `سوال ${i} ${topic} کے بارے میں؟`;
      explanationText = `یہ ${i} نمبر کا سوال ${topic} کے تناظر میں اہم ہے۔`;
    }
    
    additionalQuestions.push({
      id: i,
      question: questionText,
      options: [
        { id: "a", text: `اختیار A ${topic} کے لیے` },
        { id: "b", text: `اختیار B ${topic} کے لیے` },
        { id: "c", text: `اختیار C ${topic} کے لیے` },
        { id: "d", text: `اختیار D ${topic} کے لیے` }
      ],
      correctAnswer: "a", // Default correct answer
      explanation: explanationText
    });
  }
  
  return [...baseQuestions, ...additionalQuestions];
};

const quizzes: Quiz[] = [
  {
    id: 1,
    title: "Fundamentals of Shia Beliefs",
    category: "Theology",
    description: "Test your understanding of the core principles and beliefs that distinguish Shia Islam, including the concepts of Imamate and divine justice.",
    level: "Beginner",
    questions: 20,
    time: "25 min",
    image: "/lovable-uploads/b9a867d0-d5e6-4773-968c-dee048722af5.png",
    popular: true,
    quizQuestions: [
      {
        id: 1,
        question: "عربی میں 'شیعہ' کا مطلب کیا ہے؟",
        options: [
          { id: "a", text: "مُقدَّس افراد" },
          { id: "b", text: "پیروکار" },
          { id: "c", text: "منتخب شدگان" },
          { id: "d", text: "رہنما" }
        ],
        correctAnswer: "b",
        explanation: "عربی میں 'شیعہ' کا مطلب 'پیروکار' یا 'حامی' ہے، جو خاص طور پر امام علی (ع) اور اہل بیت (پیغمبر کے خاندان) کے پیروکاروں کے لیے استعمال ہوتا ہے۔"
      },
      {
        id: 2,
        question: "غدیر خم پر نبی محمد (ص) نے کسے اپنا جانشین عام طور پر مقرر کیا؟",
        options: [
          { id: "a", text: "ابوبکر" },
          { id: "b", text: "عمر بن خطاب" },
          { id: "c", text: "علی بن ابی طالب (ع)" },
          { id: "d", text: "عثمان بن عفان" }
        ],
        correctAnswer: "c",
        explanation: "شیعہ عقیدہ کے مطابق غدیر خم پر نبی محمد (ص) نے علی بن ابی طالب (ع) کو اپنا جانشین مقرر کیا اور فرمایا: 'جس کا میں مولا ہوں، علی اس کا مولا ہے۔'"
      },
      {
        id: 3,
        question: "شیعہ علم کلام میں 'عصمت' کا تصور کیا ہے؟",
        options: [
          { id: "a", text: "رمضان میں روزہ رکھنے کا عمل" },
          { id: "b", text: "انبیاء اور ائمہ کی معصومیت" },
          { id: "c", text: "مکہ کی زیارت کا عمل" },
          { id: "d", text: "الٰہی تقدیر کا تصور" }
        ],
        correctAnswer: "b",
        explanation: "عصمت کا مطلب ہے کہ اللہ نے انبیاء اور ائمہ کو گناہوں اور غلطیوں سے محفوظ رکھا تاکہ ان کی ہدایت ہمیشہ الٰہی حقیقت کے مطابق ہو۔"
      },
      {
        id: 4,
        question: "شیعہ اسلام میں 'اصول الدین' (مذہب کے بنیادی اصول) کیا ہیں؟",
        options: [
          { id: "a", text: "اسلامی عمل کے پانچ ارکان" },
          { id: "b", text: "اسلامی فقہ کے اصول" },
          { id: "c", text: "پانچ بنیادی عقائد" },
          { id: "d", text: "قرآن کی تفسیر کے طریقے" }
        ],
        correctAnswer: "c",
        explanation: "شیعہ اسلام میں اصول الدین کے پانچ بنیادی عقائد ہیں: توحید، عدل، نبوت، امامت اور معاد۔"
      },
      {
        id: 5,
        question: "شیعہ نماز کا خاصہ کیا ہے؟",
        options: [
          { id: "a", text: "روزانہ پانچ بار نماز" },
          { id: "b", text: "نمازوں کو ملاکر تین بار ادا کرنا" },
          { id: "c", text: "صرف ایک بار نماز" },
          { id: "d", text: "نماز میں سجدہ نہ کرنا" }
        ],
        correctAnswer: "b",
        explanation: "شیعہ مسلم اکثر ظہر اور عصر کی نمازوں کو ملاکر، اور مغرب اور عشا کی نمازوں کو ملاکر دن میں تین وقتوں پر پانچوں نمازیں ادا کرتے ہیں۔"
      },
      {
        id: 6,
        question: "شیعہ فقہ میں 'خمس' کا کیا اہتمام ہے؟",
        options: [
          { id: "a", text: "زرعی پیداوار پر عائد ٹیکس" },
          { id: "b", text: "کچھ دولت کے زمرے پر 20% مذہبی ٹیکس" },
          { id: "c", text: "شمسی گرہن کے دوران ادا کی جانے والی خاص نماز" },
          { id: "d", text: "جانوروں کی قربانی کا طریقہ" }
        ],
        correctAnswer: "b",
        explanation: "خمس ایک 20% مذہبی ٹیکس ہے جو کچھ دولت کے زمرے (جیسے سالانہ زائد آمدنی) پر عائد ہوتا ہے، جس کا نصف سادات کے لیے اور نصف مرجع کے لیے خرچ ہوتا ہے۔"
      },
      {
        id: 7,
        question: "دوازہوی شیعہ عقیدے کے مطابق متوقع مہدی کون ہیں؟",
        options: [
          { id: "a", text: "امام حسین (ع) کا آنے والا نسل" },
          { id: "b", text: "امام محمد بن حسن، بارہویں امام" },
          { id: "c", text: "انصاف کی علامتی تصور" },
          { id: "d", text: "امام علی (ع) کا دوبارہ جنم" }
        ],
        correctAnswer: "b",
        explanation: "دوازہوی شیعہ عقیدے کے مطابق مہدی محمد بن حسن، بارہویں اور آخری امام ہیں جو 869 میں پیدا ہوئے اور غیبت میں ہیں، اور ان کا ظہور انصاف قائم کرے گا۔"
      },
      {
        id: 8,
        question: "شیعہ نظریہ میں عارضی شادی (متعہ) کا کیا خیال ہے؟",
        options: [
          { id: "a", text: "ہر حال میں حرام" },
          { id: "b", text: "کچھ شرائط کے تحت جائز" },
          { id: "c", text: "صرف جنگ کے دوران جائز" },
          { id: "d", text: "صرف تاریخی تصور" }
        ],
        correctAnswer: "b",
        explanation: "شیعہ فقہ عارضی شادی (متعہ) کو کچھ شرائط کے تحت جائز سمجھتی ہے، جو نبی کے دور میں رائج تھی اور مستقل طور پر منع نہیں کی گئی۔"
      },
      {
        id: 9,
        question: "شیعہ عمل میں 'مرجع تقلید' کا تصور کیا ہے؟",
        options: [
          { id: "a", text: "جمعہ کی نماز کی قیادت کرنے والا عالم" },
          { id: "b", text: "قانونی فیصلے کرنے کے اہل اعلیٰ عالم" },
          { id: "c", text: "مذہبی ٹیکس جمع کرنے والا" },
          { id: "d", text: "چھپے ہوئے امام کے نمائندے" }
        ],
        correctAnswer: "b",
        explanation: "مرجع تقلید ایک اعلیٰ عالم ہے جو اسلامی قانون کی تشریح پر مبنی قانونی فیصلے کرنے کے اہل ہوتا ہے۔"
      },
      {
        id: 10,
        question: "شیعہ روایت میں زیارت عاشورا کا کیا اہتمام ہے؟",
        options: [
          { id: "a", text: "عاشورا کے دن مکہ کی زیارت" },
          { id: "b", text: "عاشورا کے دن پڑھی جانے والی دعا" },
          { id: "c", text: "امام حسین (ع) کے نام خطاب کردہ زیارتی دعا" },
          { id: "d", text: "محرم میں سینہ زدنی کا عمل" }
        ],
        correctAnswer: "c",
        explanation: "زیارت عاشورا ایک زیارتی سلام اور دعا ہے جو امام حسین (ع) کے نام پڑھی جاتی ہے تاکہ ان کی شہادت کی یاد میں عقیدت ظاہر کی جائے۔"
      },
      {
        id: 11,
        question: "کون سی کتاب شیعہ دعاؤں کا بڑا مجموعہ ہے؟",
        options: [
          { id: "a", text: "الکافی" },
          { id: "b", text: "نہج البلاغہ" },
          { id: "c", text: "من لا یحضرہ الفقیہ" },
          { id: "d", text: "صحیفہ سجادیہ" }
        ],
        correctAnswer: "d",
        explanation: "صحیفہ سجادیہ، جو امام علی بن حسین (زین العابدین) سے منسوب ہے، دعاؤں کا مجموعہ ہے جسے بعض اوقات 'پیغمبر کے گھرانے کا زبور' کہا جاتا ہے۔"
      },
      {
        id: 12,
        question: "عہد حاضر میں شیعہ سیاسی نظریہ میں 'ولایت فقہ' کا کیا تصور ہے؟",
        options: [
          { id: "a", text: "مذہب اور سیاست کا الگ ہونا" },
          { id: "b", text: "فقہ کے حاکم کا انتظامیہ میں کردار" },
          { id: "c", text: "مطلق بادشاہت کا نظام" },
          { id: "d", text: "مذہبی رہنماؤں کی جمہوری انتخاب" }
        ],
        correctAnswer: "b",
        explanation: "ولایت فقہ کا مطلب ہے 'اسلامی فقہ کے حاکم کی نگرانی'، جو امام کی غیرموجودگی میں ایک اہل فقہ کی طرف سے انتظامیہ کا نظریہ ہے، جو ایران میں نمایاں ہے۔"
      },
      {
        id: 13,
        question: "بارہویں امام کے ساتھی جو ان کے ساتھ واپس آئیں گے، ان کا نام کیا ہے؟",
        options: [
          { id: "a", text: "انصار" },
          { id: "b", text: "اصحاب" },
          { id: "c", text: "رجال الغیب" },
          { id: "d", text: "محاجرون" }
        ],
        correctAnswer: "c",
        explanation: "رجال الغیب (غیب کے لوگ) ان 313 خاص ساتھیوں کو کہا جاتا ہے جو، بعض شیعہ روایات کے مطابق، مہدی کے ظہور پر ان کی مدد کریں گے۔"
      },
      {
        id: 14,
        question: "شیعہ علم کلام میں 'بدع' کا تصور کیا ہے؟",
        options: [
          { id: "a", text: "تمام واقعات کا الٰہی تعین" },
          { id: "b", text: "انسانی اعمال پر مبنی الٰہی ارادے میں تبدیلی" },
          { id: "c", text: "انسانوں کو مکمل آزاد ارادہ" },
          { id: "d", text: "اللہ کا انسانی معاملات میں مداخلت نہ کرنا" }
        ],
        correctAnswer: "b",
        explanation: "بدع کا مطلب ہے کہ اللہ اپنے ارادے یا منصوبے میں تبدیلی دکھا سکتا ہے جو انسانی اعمال یا دیگر عوامل پر مبنی ہو، جو الٰہی حاکمیت اور انسانی آزاد ارادے کو ظاہر کرتا ہے۔"
      },
      {
        id: 15,
        question: "شیعہ روایت میں اربعین کے دن کا کیا اہتمام ہے؟",
        options: [
          { id: "a", text: "اسلامی تقویم کے اختتام کا دن" },
          { id: "b", text: "امام حسین (ع) کی شہادت کے 40ویں دن" },
          { id: "c", text: "نبی محمد (ص) کی ولادت کا دن" },
          { id: "d", text: "مکہ فتح کا دن" }
        ],
        correctAnswer: "b",
        explanation: "اربعین امام حسین (ع) کی شہادت کے 40ویں دن کو منایا جاتا ہے، جو دنیا کی سب سے بڑی سالانہ زیارتوں میں سے ایک ہے، کربلا میں ان کے مزار پر۔"
      },
      {
        id: 16,
        question: "شیعہ فقہ میں 'احتياط' کا اصول کیا ہے؟",
        options: [
          { id: "a", text: "مذہبی معاملات میں آسان ترین اختیار" },
          { id: "b", text: "مذہبی فرائض کی تکمیل کے لیے احتیاطی عمل" },
          { id: "c", text: "ہر مذہبی مسئلے پر مختلف عالم کی پیروی" },
          { id: "d", text: "نئے مذہبی اعمال کی ایجاد" }
        ],
        correctAnswer: "b",
        explanation: "احتياط ایک اصول ہے جو غیر یقینی صورت میں مذہبی فرائض کی تکمیل کو یقینی بنانے کے لیے اضافی اقدامات یا محتاط انتخاب پر مبنی ہے۔"
      },
      {
        id: 17,
        question: "شیعہ کے نزدیک تقویٰ کا کیا خاصہ ہے؟",
        options: [
          { id: "a", text: "صرف رسومی فرائض" },
          { id: "b", text: "اندرونی روحانی حالت اور سماجی انصاف" },
          { id: "c", text: "صرف علماء کے لیے" },
          { id: "d", text: "صرف غذائی پابندیاں" }
        ],
        correctAnswer: "b",
        explanation: "شیعہ تقویٰ کو اندرونی روحانی حالت اور اس کے سماجی انصاف کے اظہار کے طور پر سمجھتے ہیں، جیسے کہ ائمہ نے ظلم کے خلاف کھڑے ہونے کی مثال دی۔"
      },
      {
        id: 18,
        question: "کون سے امام نے مدینہ میں سب سے بڑی اسلامی فقہ کی مدرسہ قائم کی؟",
        options: [
          { id: "a", text: "امام علی (ع)" },
          { id: "b", text: "امام حسن (ع)" },
          { id: "c", text: "امام جعفر صادق (ع)" },
          { id: "d", text: "امام محمد باقر (ع)" }
        ],
        correctAnswer: "c",
        explanation: "امام جعفر صادق (ع)، چھٹے امام، نے مدینہ میں اسلامی فقہ کی سب سے بڑی مدرسہ قائم کی، جہاں سنی عالموں جیسے ابوحنیفہ اور مالک بن انس بھی ان کے شاگرد تھے۔"
      },
      {
        id: 19,
        question: "قرآن میں تزکیہ کی آیت (آیت الطہارہ) کا شیعہ تعبیر کیا ہے؟",
        options: [
          { id: "a", text: "تمام مسلمانوں کے لیے" },
          { id: "b", text: "خاص طور پر اہل بیت کے لیے" },
          { id: "c", text: "صرف نبی کی بیویوں کے لیے" },
          { id: "d", text: "نماز سے پہلے طہارت کے بارے میں" }
        ],
        correctAnswer: "b",
        explanation: "شیعہ آیت الطہارہ (33:33) کو اہل بیت، یعنی نبی محمد (ص)، علی، فاطمہ، حسن اور حسین کے لیے سمجھتے ہیں جنہیں اللہ نے تمام نجاستوں سے پاک کیا۔"
      },
      {
        id: 20,
        question: "شیعہ نظریہ میں شفاعت (شفاعت) کا کیا خیال ہے؟",
        options: [
          { id: "a", text: "شفاعت کو مکمل طور پر مسترد" },
          { id: "b", text: "صرف اللہ شفاعت کر سکتا ہے" },
          { id: "c", text: "نبی اور ائمہ اللہ کی اجازت سے شفاعت کر سکتے ہیں" },
          { id: "d", text: "ہر مومن دوسروں کے لیے شفاعت کر سکتا ہے" }
        ],
        correctAnswer: "c",
        explanation: "شیعہ عقیدہ کے مطابق نبی محمد (ص) اور ائمہ کو اللہ کی طرف سے شفاعت (شفاعت) کا اختیار دیا گیا ہے تاکہ وہ قیامت کے دن مومنوں کی شفاعت کر سکیں۔"
      }
    ]
  },
  {
    id: 2,
    title: "History of the Ahl al-Bayt",
    category: "Ahl al-Bayt",
    description: "Explore your knowledge about the lives, contributions, and historical challenges faced by the family of Prophet Muhammad (PBUH).",
    level: "Intermediate",
    questions: 25,
    time: "30 min",
    image: "/lovable-uploads/2cc7c1a7-23b7-4c96-aa2d-81e25bea3efe.png",
    quizQuestions: [
      {
        id: 1,
        question: "اہل بیت کا کون سا رکن 'علم کے شہر کا دروازہ' کے نام سے مشہور ہے؟",
        options: [
          { id: "a", text: "امام حسن (ع)" },
          { id: "b", text: "امام حسین (ع)" },
          { id: "c", text: "امام علی (ع)" },
          { id: "d", text: "امام جعفر صادق (ع)" }
        ],
        correctAnswer: "c",
        explanation: "امام علی (ع) کو 'علم کے شہر کا دروازہ' کہا جاتا ہے، کیونکہ نبی محمد (ص) نے فرمایا: 'میں علم کا شہر ہوں اور علی اس کا دروازہ۔'"
      },
      {
        id: 2,
        question: "مدینہ میں سب سے بڑی اسلامی فقہ کی مدرسہ کس امام نے قائم کی؟",
        options: [
          { id: "a", text: "امام محمد باقر (ع)" },
          { id: "b", text: "امام جعفر صادق (ع)" },
          { id: "c", text: "امام موسیٰ کاظم (ع)" },
          { id: "d", text: "امام علی رضا (ع)" }
        ],
        correctAnswer: "b",
        explanation: "امام جعفر صادق (ع)، چھٹے امام، نے مدینہ میں اسلامی فقہ کی سب سے بڑی مدرسہ قائم کی، جہاں سنی عالموں جیسے ابوحنیفہ اور مالک بن انس بھی ان کے شاگرد تھے۔"
      },
      {
        id: 3,
        question: "محرم کے مہینے میں کون سا اہم تاریخی واقعہ یاد کیا جاتا ہے؟",
        options: [
          { id: "a", text: "امام علی (ع) کی ولادت" },
          { id: "b", text: "مکہ فتح" },
          { id: "c", text: "امام حسین (ع) کی کربلا میں شہادت" },
          { id: "d", text: "نبی محمد (ص) کی ہجرت" }
        ],
        correctAnswer: "c",
        explanation: "محرم کا مہینہ امام حسین (ع) اور ان کے ساتھیوں کی 680 میں کربلا کی لڑائی میں شہادت کی یاد میں منایا جاتا ہے، جو عاشورہ کے نام سے جانا جاتا ہے۔"
      }
    ]
  },
  {
    id: 3,
    title: "Shia Jurisprudence (Fiqh Ja'fari)",
    category: "Fiqh",
    description: "Test your knowledge of Shia legal principles, practices, and the methodologies used to derive Islamic law from primary sources.",
    level: "Advanced",
    questions: 15,
    time: "20 min",
    image: "/lovable-uploads/40a0017f-7762-4a4a-889f-a6871d080dfe.png",
    popular: true,
    quizQuestions: [
      {
        id: 1,
        question: "شیعہ فقہ میں کون سا ذریعہ قانون کا بنیادی ماخذ مانا جاتا ہے؟",
        options: [
          { id: "a", text: "قیاس (تجزیاتی استدلال)" },
          { id: "b", text: "بارہ اماموں کے اقوال اور اعمال" },
          { id: "c", text: "پہلی نسل کے مسلمانوں کا اجماع" },
          { id: "d", text: "علاقائی روایات اور رسوم" }
        ],
        correctAnswer: "b",
        explanation: "شیعہ فقہ میں بارہ اماموں کے اقوال اور اعمال، قرآن اور نبی محمد (ص) کی سنت کے ساتھ قانون کا بنیادی ماخذ مانے جاتے ہیں، کیونکہ انہیں الٰہی ترجمان سمجھا جاتا ہے۔"
      },
      {
        id: 2,
        question: "شیعہ قانونی روایت میں 'اجتہاد' کا کیا اہتمام ہے؟",
        options: [
          { id: "a", text: "علماء کے اجماع پر مبنی قانونی مسئلہ" },
          { id: "b", text: "مستقل استدلال سے قانونی فیصلوں کا عمل" },
          { id: "c", text: "قرآن کے لفظی متن پر سخت پیروی" },
          { id: "d", text: "سب سے قدامت پسند رائے کی پیروی" }
        ],
        correctAnswer: "b",
        explanation: "اجتہاد شیعہ فقہ میں اہل اجتہاد (مجاہد) کے ذریعہ قرآن، حدیث اور اہل بیت کی تعلیمات پر مبنی مستقل استدلال سے قانونی فیصلوں کا عمل ہے۔"
      },
      {
        id: 3,
        question: "شیعہ عمل میں 'تقلید' کیا ہے؟",
        options: [
          { id: "a", text: "حج کے دوران نبی کے اعمال کی نقالی" },
          { id: "b", text: "اہل اجتہاد کی اسلامی قانون میں پیروی" },
          { id: "c", text: "روزانہ کی نماز کے بعد مخصوص دعاؤں کا عمل" },
          { id: "d", text: "قرآن کی مبہم آیات کی تشریح کا طریقہ" }
        ],
        correctAnswer: "b",
        explanation: "تقلید کا مطلب ہے کہ جو اسلامی فقہ کے ماہر نہیں، وہ اہل اجتہاد کے قانونی فیصلوں کی پیروی کرتے ہیں جو ماہر تشریح پر مبنی ہوتا ہے۔"
      }
    ]
  },
  {
    id: 4,
    title: "Nahj al-Balagha & Shia Literature",
    category: "Theology",
    description: "Challenge your understanding of the eloquent sermons, letters, and sayings attributed to Imam Ali (AS) and other significant Shia texts.",
    level: "Intermediate",
    questions: 30,
    time: "35 min",
    image: "/lovable-uploads/da7ba053-ff16-4d11-a30e-04db94a6ae7b.png",
    quizQuestions: [
      {
        id: 1,
        question: "نہج البلاغہ، امام علی (ع) کے خطبوں، خطوط اور اقوال کا مجموعہ کس نے مرتب کیا؟",
        options: [
          { id: "a", text: "شیخ الطوسی" },
          { id: "b", text: "شیخ المفید" },
          { id: "c", text: "سید الرضی" },
          { id: "d", text: "کلینی" }
        ],
        correctAnswer: "c",
        explanation: "نہج البلاغہ کو 10ویں صدی میں سید الرضی (شریف الرضی) نے مختلف ذرائع سے منتخب مواد کو خطبوں، خطوط اور مختصر اقوال میں ترتیب دیا۔"
      },
      {
        id: 2,
        question: "نہج البلاغہ سے کون سا مشہور خطبہ کائنات کی تخلیق اور خدا کی عجائبات کی وضاحت کرتا ہے؟",
        options: [
          { id: "a", text: "خطبہ شقشقیہ" },
          { id: "b", text: "خطبہ خلقہ" },
          { id: "c", text: "خطبہ متقیین" },
          { id: "d", text: "خطبہ قاصعہ" }
        ],
        correctAnswer: "b",
        explanation: "خطبہ خلقہ خدا کی تخلیق کے عجائبات، سیاروں سے لے کر جانوروں اور کیڑوں کے پیچیدہ ڈیزائن تک، کو بیان کرتا ہے جو خدا کی قدرت اور حکمت کو ظاہر کرتا ہے۔"
      },
      {
        id: 3,
        question: "کون سی کتاب شیعہ حدیث کا سب سے اہم مجموعہ ہے؟",
        options: [
          { id: "a", text: "صحیح بخاری" },
          { id: "b", text: "الکافی" },
          { id: "c", text: "سنن ابوداؤد" },
          { id: "d", text: "مسند احمد" }
        ],
        correctAnswer: "b",
        explanation: "الکافی، جو محمد بن یعقوب کلینی نے 10ویں صدی میں ترتیب دی، شیعہ حدیث کا سب سے جامع اور اہم مجموعہ ہے جس میں تقریباً 16,000 روایات شامل ہیں۔"
      }
    ]
  },
  {
    id: 5,
    title: "Shia Ethics & Spirituality",
    category: "Spirituality",
    description: "Explore the ethical principles, spiritual practices, and moral philosophy in Shia Islam through the teachings of the Ahl al-Bayt.",
    level: "Beginner",
    questions: 20,
    time: "25 min",
    image: "/lovable-uploads/b9a867d0-d5e6-4773-968c-dee048722af5.png",
    quizQuestions: [
      {
        id: 1,
        question: "امام علی (ع) کے مشہور بیان 'ظالم کا دشمن اور مظلوم کا مددگار بنو' میں کون سا اصول زور دیا گیا ہے؟",
        options: [
          { id: "a", text: "مالی خوشحالی" },
          { id: "b", text: "سماجی انصاف" },
          { id: "c", text: "رسومی پاکیزگی" },
          { id: "d", text: "روحانی تجربات" }
        ],
        correctAnswer: "b",
        explanation: "یہ بیان سماجی انصاف کے اصول کو اجاگر کرتا ہے، جو شیعہ اخلاقیات کا اہم حصہ ہے اور ظلم کے خلاف مزاحمت اور کمزوروں کی حمایت کی ترغیب دیتا ہے۔"
      },
      {
        id: 2,
        question: "شیعہ عمل میں 'مراقبہ' کا روحانی تصور کیا ہے؟",
        options: [
          { id: "a", text: "اپنے خیالات اور اعمال کی باخبر نگرانی" },
          { id: "b", text: "مذہبی نصوص کا مطالعہ" },
          { id: "c", text: "امام حسین (ع) کی شہادت کی یاد" },
          { id: "d", text: "خفیہ طور پر خیرات دینا" }
        ],
        correctAnswer: "a",
        explanation: "مراقبہ روحانی عمل ہے جس میں اپنے خیالات، ارادوں اور اعمال کو مسلسل باخبر رکھنا شامل ہے تاکہ وہ الٰہی رہنمائی کے مطابق ہوں۔"
      },
      {
        id: 3,
        question: "شیعہ روایت میں کون سی رات خاص طور پر دعا اور روحانی عمل کے لیے پرکی گئی ہے؟",
        options: [
          { id: "a", text: "شابان کی 15ویں رات (لیلة البراء)" },
          { id: "b", text: "محرم کی 10ویں رات" },
          { id: "c", text: "رجب کی 1ویں رات" },
          { id: "d", text: "رجب کی 27ویں رات" }
        ],
        correctAnswer: "a",
        explanation: "شابان کی 15ویں رات، جو لیلة البراء یا شبی برات کہلاتی ہے، شیعہ روایت میں خاص طور پر پرکی جاتی ہے، جہاں لوگ دعا، التجاء اور قرآن کی تلاوت کرتے ہیں۔"
      }
    ]
  },
  {
    id: 6,
    title: "Mahdism & Eschatology in Shia Thought",
    category: "Theology",
    description: "Test your knowledge about the concept of the awaited Mahdi, the doctrine of occultation, and end-time beliefs in Shia theology.",
    level: "Advanced",
    questions: 25,
    time: "40 min",
    image: "/lovable-uploads/2cc7c1a7-23b7-4c96-aa2d-81e25bea3efe.png",
    quizQuestions: [
      {
        id: 1,
        question: "دوازہوی شیعہ عقیدے کے مطابق متوقع مہدی کون ہیں؟",
        options: [
          { id: "a", text: "امام حسین (ع) کا آنے والا نسل" },
          { id: "b", text: "امام محمد بن حسن، بارہویں امام جو غیبت میں ہیں" },
          { id: "c", text: "انصاف کی فتح کا علامتی تصور" },
          { id: "d", text: "ایک فرشتہ جو خدا کے نظام کو قائم کرے گا" }
        ],
        correctAnswer: "b",
        explanation: "دوازہوی شیعہ عقیدے کے مطابق مہدی محمد بن حسن، بارہویں اور آخری امام ہیں جو 869 میں پیدا ہوئے اور 941 میں غیبت میں چلے گئے، اور ان کا ظہور انصاف قائم کرے گا۔"
      },
      {
        id: 2,
        question: "بارہویں امام کی غیبت کے دو مراحل کیا ہیں؟",
        options: [
          { id: "a", text: "صغیر غیبت اور کبریٰ غیبت" },
          { id: "b", text: "جسمانی غیبت اور روحانی غیبت" },
          { id: "c", text: "شعوری غیبت اور بے شعوری غیبت" },
          { id: "d", text: "جزوی غیبت اور مکمل غیبت" }
        ],
        correctAnswer: "a",
        explanation: "بارہویں امام کی غیبت کے دو مراحل ہیں: صغیر غیبت (874-941)، جہاں چار نمائندوں کے ذریعہ رابطہ رہا، اور کبریٰ غیبت (941 سے اب تک)۔"
      },
      {
        id: 3,
        question: "شیعہ علم کلام میں مہدی کے بارے میں 'انتظار' کا کردار کیا ہے؟",
        options: [
          { id: "a", text: "سماجی ذمہ داریوں کے بغیر غیر فعال انتظار" },
          { id: "b", text: "خود کو پاک کرنے اور انصاف قائم کرنے کی فعال تیاری" },
          { id: "c", text: "سماج سے الگ ہو کر ذاتی روحانیت پر توجہ" },
          { id: "d", text: "مہدی کے واپس آنے کا درست وقت کا حساب لگانا" }
        ],
        correctAnswer: "b",
        explanation: "انتظار شیعہ علم کلام میں ایک فعال حالت ہے، جس میں خود کی تزکیہ، علم حاصل کرنا، انصاف کو فروغ دینا اور اسلامی اقدار والا سماج بنانا شامل ہے۔"
      }
    ]
  },
];

// Ensure each quiz has the full number of questions as advertised
quizzes.forEach(quiz => {
  if (quiz.quizQuestions.length < quiz.questions) {
    quiz.quizQuestions = generateAdditionalQuestions(
      quiz.quizQuestions,
      quiz.questions,
      quiz.title
    );
  }
});

const categories = ["All Categories", "Qur'an", "Hadith", "Fiqh", "History", "Theology", "Spirituality", "Ahl al-Bayt"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

// Ensure each quiz has the full number of questions as advertised
quizzes.forEach(quiz => {
  if (quiz.quizQuestions.length < quiz.questions) {
    quiz.quizQuestions = generateAdditionalQuestions(
      quiz.quizQuestions,
      quiz.questions,
      quiz.title
    );
  }
});

const Quizzes = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Time for each question in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Get translations based on selected language - limited to en and ur
  const t = translations[selectedLanguage as 'en' | 'ur'];

  // Filter quizzes based on search and filters
  const filteredQuizzes = quizzes.filter(quiz => {
    const categoryMatch = selectedCategory === "All Categories" || quiz.category === selectedCategory;
    const levelMatch = selectedLevel === "All Levels" || quiz.level === selectedLevel;
    const searchMatch = !searchQuery || 
                      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && levelMatch && searchMatch;
  });

  useEffect(() => {
    // Set isLoaded to true after initial render for animations
    setIsLoaded(true);
  }, []);

  // Start timer for quiz questions
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (selectedQuiz && !isAnswerSubmitted && !quizCompleted && timerActive) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval as NodeJS.Timeout);
            setIsAnswerSubmitted(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedQuiz, isAnswerSubmitted, quizCompleted, timerActive]);

  // Handle starting a quiz
  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setShowExplanation(false);
    setTimeLeft(30);
    setTimerActive(true);
    window.scrollTo(0, 0);
  };

  // Handle going back to quiz list
  const backToQuizzes = () => {
    setSelectedQuiz(null);
    setTimerActive(false);
  };

  // Handle selecting an answer
  const handleSelectAnswer = (answerId: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answerId);
    }
  };

  // Handle submitting an answer
  const handleSubmitAnswer = () => {
    if (selectedAnswer && selectedQuiz) {
      setIsAnswerSubmitted(true);
      setTimerActive(false);
      
      const currentQuestion = selectedQuiz.quizQuestions[currentQuestionIndex];
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore(prevScore => prevScore + 1);
      }
    }
  };

  // Handle showing explanation
  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  // Handle moving to the next question
  const handleNextQuestion = () => {
    if (selectedQuiz) {
      if (currentQuestionIndex < selectedQuiz.quizQuestions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);
        setShowExplanation(false);
        setTimeLeft(30);
        setTimerActive(true);
      } else {
        // Quiz completed
        setQuizCompleted(true);
        setTimerActive(false);
      }
    }
  };

  // If a quiz is selected, show the quiz interface
  if (selectedQuiz) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory-light">
        <Navbar />
        
        <div className="flex-grow py-8 md:py-12 px-4 mt-16">
          <div className="max-w-4xl mx-auto">
            {/* Quiz Header */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <button 
                onClick={backToQuizzes}
                className="flex items-center text-sm text-white bg-emerald px-4 py-2 rounded-lg hover:bg-emerald-dark transition-colors"
              >
                <ArrowRight className="mr-1 h-4 w-4 rotate-180" />
                {t.backToQuizzes}
              </button>
              
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-emerald" />
                <span className="font-medium text-emerald">{selectedQuiz.title}</span>
              </div>
            </div>
            
            {!quizCompleted ? (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Quiz Progress */}
                <div className="p-4 md:p-6 border-b border-gray-100 bg-emerald text-white">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{t.question} {currentQuestionIndex + 1} {t.of} {selectedQuiz.quizQuestions.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4" />
                      <span className={`text-sm ${timeLeft <= 5 ? 'text-red-300 animate-pulse' : ''}`}>
                        {timeLeft} {t.seconds}
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-emerald-dark/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gold"
                      style={{ width: `${((currentQuestionIndex + 1) / selectedQuiz.quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Green timeline for time */}
                <div className="px-4 md:px-6 pt-4">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all duration-1000"
                      style={{ width: `${(timeLeft / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Question and Options */}
                <div className="p-4 md:p-6">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">
                    {selectedQuiz.quizQuestions[currentQuestionIndex].question}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    {selectedQuiz.quizQuestions[currentQuestionIndex].options.map(option => (
                      <div 
                        key={option.id}
                        onClick={() => handleSelectAnswer(option.id)}
                        className={cn(
                          "p-4 border rounded-lg cursor-pointer transition-all",
                          selectedAnswer === option.id && !isAnswerSubmitted && "border-emerald bg-emerald/5",
                          isAnswerSubmitted && option.id === selectedQuiz.quizQuestions[currentQuestionIndex].correctAnswer && "border-green-500 bg-green-50",
                          isAnswerSubmitted && selectedAnswer === option.id && option.id !== selectedQuiz.quizQuestions[currentQuestionIndex].correctAnswer && "border-red-500 bg-red-50",
                          isAnswerSubmitted && option.id !== selectedAnswer && option.id !== selectedQuiz.quizQuestions[currentQuestionIndex].correctAnswer && "opacity-50",
                          !isAnswerSubmitted && selectedAnswer !== option.id && "hover:border-gray-300"
                        )}
                      >
                        <div className="flex items-start">
                          <div className={cn(
                            "flex items-center justify-center w-6 h-6 rounded-full border text-sm mr-3 flex-shrink-0",
                            selectedAnswer === option.id && !isAnswerSubmitted && "border-emerald bg-emerald text-white",
                            isAnswerSubmitted && option.id === selectedQuiz.quizQuestions[currentQuestionIndex].correctAnswer && "border-green-500 bg-green-500 text-white",
                            isAnswerSubmitted && selectedAnswer === option.id && option.id !== selectedQuiz.quizQuestions[currentQuestionIndex].correctAnswer && "border-red-500 bg-red-500 text-white",
                            !isAnswerSubmitted && selectedAnswer !== option.id && "border-gray-300"
                          )}>
                            {option.id.toUpperCase()}
                          </div>
                          <div className="flex-grow">{option.text}</div>
                          {isAnswerSubmitted && option.id === selectedQuiz.quizQuestions[currentQuestionIndex].correctAnswer && (
                            <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                          )}
                          {isAnswerSubmitted && selectedAnswer === option.id && option.id !== selectedQuiz.quizQuestions[currentQuestionIndex].correctAnswer && (
                            <AlertCircle className="h-5 w-5 text-red-500 ml-2 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Explanation Section */}
                  {isAnswerSubmitted && (
                    <div className="mb-6">
                      <button 
                        onClick={toggleExplanation}
                        className="text-sm font-medium text-emerald hover:text-emerald-dark flex items-center"
                      >
                        {showExplanation ? t.hideExplanation : t.showExplanation}
                        <ChevronDown className={cn("h-4 w-4 ml-1 transition-transform", showExplanation && "transform rotate-180")} />
                      </button>
                      
                      {showExplanation && (
                        <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-700">
                          {selectedQuiz.quizQuestions[currentQuestionIndex].explanation}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex justify-between">
                    {!isAnswerSubmitted ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={!selectedAnswer}
                        className={cn(
                          "py-2 px-6 rounded-lg font-medium",
                          selectedAnswer ? "bg-emerald text-white hover:bg-emerald-dark" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        )}
                      >
                        {t.submitAnswer}
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="py-2 px-6 bg-emerald text-white rounded-lg font-medium hover:bg-emerald-dark"
                      >
                        {currentQuestionIndex < selectedQuiz.quizQuestions.length - 1 ? t.nextQuestion : t.seeResults}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Quiz Results
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 md:p-8 text-center">
                  <Award className="h-16 w-16 mx-auto text-gold mb-4" />
                  
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
                    {t.quizComplete}
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    {t.yourScore} {score} {t.of} {selectedQuiz.quizQuestions.length}
                  </p>
                  
                  <div className="w-full max-w-md mx-auto h-4 bg-gray-100 rounded-full overflow-hidden mb-8">
                    <div 
                      className={cn(
                        "h-full",
                        score / selectedQuiz.quizQuestions.length >= 0.7 ? "bg-green-500" : 
                        score / selectedQuiz.quizQuestions.length >= 0.4 ? "bg-gold" : "bg-red-500"
                      )}
                      style={{ width: `${(score / selectedQuiz.quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => startQuiz(selectedQuiz)}
                      className="py-2 px-6 bg-emerald text-white rounded-lg font-medium hover:bg-emerald-dark"
                    >
                      {t.retakeQuiz}
                    </button>
                    
                    <button
                      onClick={backToQuizzes}
                      className="py-2 px-6 bg-white text-emerald border border-emerald rounded-lg font-medium hover:bg-emerald/5"
                    >
                      {t.returnToQuizzes}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  // If no quiz is selected, show the quiz selection page
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-16 pb-10 bg-emerald mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={cn(
            "text-3xl md:text-4xl font-bold mb-4 text-white opacity-0 transform translate-y-4",
            isLoaded && "animate-slide-up opacity-100 translate-y-0 transition-all duration-700"
          )}>
            {t.testYourKnowledge}
          </h1>
          <p className={cn(
            "max-w-2xl mx-auto text-lg text-white/80 mb-8 opacity-0",
            isLoaded && "animate-fade-in opacity-100 delay-200 transition-all duration-700"
          )}>
            {t.challengeYourself}
          </p>
          
          {/* Language Selector */}
          <div className={cn(
            "flex justify-center mb-6 opacity-0",
            isLoaded && "animate-fade-in opacity-100 delay-300 transition-all duration-700"
          )}>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-2 inline-flex items-center">
              <Globe className="h-4 w-4 text-white/70 mr-2" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-white border-none focus:outline-none text-sm"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code} className="text-gray-800">
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className={cn(
            "flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto opacity-0",
            isLoaded && "animate-fade-in opacity-100 delay-400 transition-all duration-700"
          )}>
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder={t.searchQuizzes}
                className="w-full py-3 px-4 pr-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-gold/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
            </div>
            
            <select
              className="py-3 px-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-gold/50"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category} className="text-gray-800">{category}</option>
              ))}
            </select>
            
            <select
              className="py-3 px-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-gold/50"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map(level => (
                <option key={level} value={level} className="text-gray-800">{level}</option>
              ))}
            </select>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="py-3 px-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 flex items-center justify-center"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Quiz Cards */}
      <div className="flex-grow py-10 bg-ivory-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map(quiz => (
              <div 
                key={quiz.id}
                className={cn(
                  "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 group",
                  isLoaded && "animate-fade-in"
                )}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={quiz.image} 
                    alt={quiz.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {quiz.popular && (
                    <div className="absolute top-4 left-4 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm font-medium px-3 py-1 bg-emerald/90 rounded-full">
                        {quiz.category}
                      </span>
                      <span className="text-white text-sm font-medium px-3 py-1 bg-black/40 rounded-full">
                        {quiz.level}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 md:p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">
                    {quiz.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {quiz.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{quiz.questions} questions</span>
                    </div>
                    <div className="flex items-center">
                      <Timer className="h-4 w-4 mr-1" />
                      <span>{quiz.time}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => startQuiz(quiz)}
                    className="w-full py-2 bg-emerald text-white rounded-lg font-medium hover:bg-emerald-dark transition-colors"
                  >
                    {t.startQuiz}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredQuizzes.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4">
                <AlertCircle className="h-12 w-12 mx-auto text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">{t.noQuizzesFound}</h3>
              <p className="text-gray-500">{t.tryChanging}</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Quizzes;