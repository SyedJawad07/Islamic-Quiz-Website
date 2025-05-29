import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Certificate from '@/components/Certificate';
import { BookOpen, Clock, CheckCircle, Star, ArrowLeft, ChevronRight, Award, ArrowRight, Globe, Download, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl?: string;
  completed: boolean;
  content: {
    english: string;
    urdu: string;
    arabic: string;
  };
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
  duration: string;
  hasQuiz: boolean;
}

interface Quiz {
  id: number;
  moduleId: number;
  questions: {
    id: number;
    question: string;
    options: { id: string; text: string }[];
    correctAnswer: string;
    explanation: string;
  }[];
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
  description: string;
  modules: Module[];
  quizzes: Quiz[];
}

type Language = 'english' | 'urdu' | 'arabic';

// This is a mock database - in a real app, this would come from your backend
const coursesData: Course[] = [
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
    description: "This course explores the foundational principles of Shia jurisprudence, including the roles of reason (aql), consensus (ijma), and the teachings of the Ahl al-Bayt in deriving Islamic law. Students will gain a deep understanding of how Shia scholars approach textual interpretation and legal reasoning.",
    modules: [
      {
        id: 1,
        title: "Introduction to Usul al-Fiqh",
        lessons: [
          { 
            id: 1, 
            title: "Definition and Scope of Usul al-Fiqh", 
            duration: "30 min", 
            completed: true,
            content: {
              english: "Usul al-Fiqh, or the principles of jurisprudence, refers to the methodology used by Islamic jurists to derive legal rulings. This lesson explores the definition, scope, and importance of Usul al-Fiqh in the Shia tradition. We will examine how these principles help jurists navigate the path from divine revelation to practical legal rulings.",
              urdu: "اصول الفقہ، یا فقہی اصول، ان طریقوں کا حوالہ دیتے ہیں جو اسلامی فقہا شرعی احکام اخذ کرنے کے لیے استعمال کرتے ہیں۔ یہ سبق شیعہ روایت میں اصول الفقہ کی تعریف، دائرہ کار، اور اہمیت کا جائزہ لیتا ہے۔ ہم دیکھیں گے کہ یہ اصول فقہا کو الہی وحی سے عملی قانونی احکام تک کے راستے پر چلنے میں کیسے مدد کرتے ہیں۔",
              arabic: "أصول الفقه، أو مبادئ الفقه، تشير إلى المنهجية التي يستخدمها الفقهاء الإسلاميون لاستنباط الأحكام الشرعية. يستكشف هذا الدرس تعريف ونطاق وأهمية أصول الفقه في التقليد الشيعي. سندرس كيف تساعد هذه المبادئ الفقهاء على التنقل في الطريق من الوحي الإلهي إلى الأحكام القانونية العملية."
            }
          },
          { 
            id: 2, 
            title: "Historical Development in Shia School", 
            duration: "45 min", 
            completed: true,
            content: {
              english: "This lesson traces the historical development of Usul al-Fiqh in the Shia school of thought, from its early formulations to contemporary practice. We will study the contributions of key scholars through the centuries and how their works shaped the evolution of Shia jurisprudential methodology.",
              urdu: "یہ سبق شیعہ مکتب فکر میں اصول الفقہ کی تاریخی نشوونما کا جائزہ لیتا ہے، اس کی ابتدائی تشکیل سے لے کر معاصر عمل تک۔ ہم صدیوں کے دوران اہم علماء کی خدمات اور ان کے کاموں نے شیعہ فقہی طریقہ کار کی ارتقاء کو کیسے شکل دی، اس کا مطالعہ کریں گے۔",
              arabic: "يتتبع هذا الدرس التطور التاريخي لأصول الفقه في المذهب الشيعي، من صياغاته المبكرة إلى الممارسة المعاصرة. سندرس إسهامات العلماء الرئيسيين عبر القرون وكيف شكلت أعمالهم تطور المنهجية الفقهية الشيعية."
            }
          },
          { 
            id: 3, 
            title: "Major Differences with Sunni Usul", 
            duration: "40 min", 
            completed: true,
            content: {
              english: "This lesson explores the key differences between Shia and Sunni approaches to Usul al-Fiqh. We will examine variations in the sources of law, the role of reason, the concept of consensus, and the authority of traditions. Understanding these differences provides insight into the distinct legal methodologies of each tradition.",
              urdu: "یہ سبق اصول الفقہ کے حوالے سے شیعہ اور سنی طریقوں کے درمیان اہم فرق کا جائزہ لیتا ہے۔ ہم قانون کے ذرائع، عقل کے کردار، اجماع کے تصور، اور روایات کے اختیار میں تغیرات کا جائزہ لیں گے۔ ان فرق کو سمجھنے سے ہر روایت کے مختلف قانونی طریقہ کار کے بارے میں بصیرت ملتی ہے۔",
              arabic: "يستكشف هذا الدرس الاختلافات الرئيسية بين النهج الشيعي والسني لأصول الفقه. سندرس الاختلافات في مصادر القانون، ودور العقل، ومفهوم الإجماع، وسلطة التقاليد. فهم هذه الاختلافات يوفر نظرة ثاقبة في المنهجيات القانونية المميزة لكل تقليد."
            }
          },
          { 
            id: 4, 
            title: "Primary and Secondary Sources", 
            duration: "35 min", 
            completed: false,
            content: {
              english: "This lesson distinguishes between primary and secondary sources in Shia Usul al-Fiqh. Primary sources include the Quran and Sunnah, while secondary sources encompass consensus (ijma') and reason (aql). We will explore how these sources interact and their hierarchy in deriving legal rulings.",
              urdu: "یہ سبق شیعہ اصول الفقہ میں اولین اور ثانوی ذرائع کے درمیان فرق کرتا ہے۔ اولین ذرائع میں قرآن اور سنت شامل ہیں، جبکہ ثانوی ذرائع میں اجماع اور عقل شامل ہیں۔ ہم دیکھیں گے کہ یہ ذرائع کیسے تعامل کرتے ہیں اور قانونی احکام اخذ کرنے میں ان کی ترتیب کیا ہے۔",
              arabic: "يميز هذا الدرس بين المصادر الأولية والثانوية في أصول الفقه الشيعي. تشمل المصادر الأولية القرآن والسنة، بينما تشمل المصادر الثانوية الإج��اع والعقل. سنستكشف كيف تتفاعل هذه المصادر وتسلسلها الهرمي في استنباط الأحكام الشرعية."
            }
          },
          { 
            id: 5, 
            title: "Role of Ahl al-Bayt in Shia Usul", 
            duration: "30 min", 
            completed: false,
            content: {
              english: "This lesson focuses on the central role of the Ahl al-Bayt (the Prophet's household) in Shia jurisprudence. We will examine how their teachings and traditions form a cornerstone of Shia legal methodology and how this distinguishes Shia Usul from other approaches to Islamic law.",
              urdu: "یہ سبق شیعہ فقہ میں اہل بیت (پیغمبر کے گھرانے) کے مرکزی کردار پر توجہ مرکوز کرتا ہے۔ ہم دیکھیں گے کہ ان کی تعلیمات اور روایات شیعہ قانونی طریقہ کار کا سنگ بنیاد کیسے بنتی ہیں اور یہ شیعہ اصول کو اسلامی قانون کے دیگر طریقوں سے کیسے ممتاز کرتا ہے۔",
              arabic: "يركز هذا الدرس على الدور المركزي لأهل البيت (بيت النبي) في الفقه الشيعي. سندرس كيف تشكل تعاليمهم وتقاليدهم حجر الزاوية في المنهجية القانونية الشيعية وكيف يميز هذا أصول الشيعة عن المناهج الأخرى للقانون الإسلامي."
            }
          }
        ],
        duration: "2.5 hours",
        hasQuiz: true
      },
      {
        id: 2,
        title: "The Role of Aql (Reason) in Shia Usul",
        lessons: [
          { 
            id: 1, 
            title: "Rational Judgments and Their Validity", 
            duration: "45 min", 
            completed: false,
            content: {
              english: "This lesson explores how rational judgments are considered valid sources in Shia jurisprudence. We will examine the criteria for accepting rational judgments and the types of judgments that can be used in legal reasoning.",
              urdu: "یہ سبق بتاتا ہے کہ شیعہ فقہ میں عقلی فیصلوں کو کیسے درست ذرائع سمجھا جاتا ہے۔ ہم عقلی فیصلوں کو قبول کرنے کے معیار اور قانونی استدلال میں استعمال ہونے والے فیصلوں کی اقسام کا جائزہ لیں گے۔",
              arabic: "يستكشف هذا الدرس كيف تعتبر الأحكام العقلانية مصادر صالحة في الفقه الشيعي. سنفحص معايير قبول الأحكام العقلانية وأنواع الأحكام التي يمكن استخدامها في الاستدلال القانوني."
            }
          },
          { 
            id: 2, 
            title: "Correlation Between Reason and Revelation", 
            duration: "50 min", 
            completed: false,
            content: {
              english: "This lesson examines the relationship between reason and divine revelation in Shia jurisprudence. We will study how these two sources of knowledge work together and the principle of harmony between reason and revelation.",
              urdu: "یہ سبق شیعہ فقہ میں عقل اور الہی وحی کے درمیان تعلقات کا جائزہ لیتا ہے۔ ہم یہ مطالعہ کریں گے کہ علم کے یہ دو ذرائع کیسے ایک ساتھ کام کرتے ہیں اور عقل اور وحی کے درمیان ہم آہنگی کا اصول کیا ہے۔",
              arabic: "يفحص هذا الدرس العلاقة بين العقل والوحي الإلهي في الفقه الشيعي. سندرس كيف يعمل هذان المصدران للمعرفة معًا ومبدأ الانسجام بين العقل والوحي."
            }
          },
          { 
            id: 3, 
            title: "Practical Applications of Aql in Jurisprudence", 
            duration: "55 min", 
            completed: false,
            content: {
              english: "This lesson focuses on practical applications of rational reasoning in Shia jurisprudence. Through case studies, we will see how jurists apply rational principles to derive legal rulings on complex issues.",
              urdu: "یہ سبق شیعہ فقہ میں عقلی استدلال کے عملی استعمال پر توجہ مرکوز کرتا ہے۔ کیس اسٹڈیز کے ذریعے، ہم دیکھیں گے کہ فقہا پیچیدہ مسائل پر قانونی احکام اخذ کرنے کے لیے عقلی اصولوں کو کیسے لاگو کرتے ہیں۔",
              arabic: "يركز هذا الدرس على التطبيقات العملية للاستدلال العقلاني في الفقه الشيعي. من خلال دراسات الحالة، سنرى كيف يطبق الفقهاء المبادئ العقلانية لاستنباط الأحكام الشرعية في القضايا المعقدة."
            }
          },
          { 
            id: 4, 
            title: "Contemporary Issues and Rational Approach", 
            duration: "40 min", 
            completed: false,
            content: {
              english: "This lesson examines how contemporary Shia jurists use rational approaches to address modern challenges. We will discuss bioethics, financial transactions, and technological issues through the lens of rational jurisprudence.",
              urdu: "یہ سبق بتاتا ہے کہ معاصر شیعہ فقہا جدید چیلنجوں کو حل کرنے کے لیے عقلی نقطہ نظر کا استعمال کیسے کرتے ہیں۔ ہم بائیو ایتھکس، مالی لین دین، اور ٹیکنالوجی کے مسائل پر عقلی فقہ کے نقطہ نظر سے بحث کریں گے۔",
              arabic: "يفحص هذا الدرس كيف يستخدم الفقهاء الشيعة المعاصرون المناهج العقلانية لمعالجة التحديات الحديثة. سنناقش الأخلاقيات الحيوية والمعاملات المالية والقضايا التكنولوجیة من منظور الفقه العقلاني."
            }
          }
        ],
        duration: "3 hours",
        hasQuiz: true
      },
      {
        id: 3,
        title: "Ijma' and its Application in Shia Jurisprudence",
        lessons: [
          { 
            id: 1, 
            title: "Concept of Ijma' in Shia Thought", 
            duration: "35 min", 
            completed: false,
            content: {
              english: "This lesson introduces the concept of Ijma' (consensus) in Shia jurisprudence. We will explore how Shia scholars define Ijma' and how it differs from the concept in other schools of thought.",
              urdu: "یہ سبق شیعہ فقہ میں اجماع کے تصور سے متعارف کراتا ہے۔ ہم دیکھیں گے کہ شیعہ علماء اجماع کو کیسے بیان کرتے ہیں اور یہ دیگر مکاتب فکر میں اس تصور سے کیسے مختلف ہے۔",
              arabic: "يقدم هذا الدرس مفهوم الإجماع في الفقه الشيعي. سنستكشف كيف يعرف علماء الشيعة الإجماع وكيف يختلف عن المفهوم في المدارس الفكرية الأخرى."
            }
          },
          { 
            id: 2, 
            title: "Conditions for Valid Consensus", 
            duration: "40 min", 
            completed: false,
            content: {
              english: "This lesson outlines the specific conditions that must be met for a consensus to be considered valid in Shia jurisprudence. We will examine the role of the Infallible Imam in validating consensus.",
              urdu: "یہ سبق ان خاص شرائط کا خاکہ پیش کرتا ��ے جن کو پورا کرنا ضروری ہے تاکہ شیعہ فقہ میں اجماع کو درست سمجھا جائے۔ ہم اجماع کی توثیق میں معصوم امام کے کردار کا جائزہ لیں گے۔",
              arabic: "يحدد هذا الدرس الشروط المحددة التي يجب استيفاؤها لاعتبار الإجماع صحيحًا في الفقه الشيعي. سنفحص دور الإمام المعصوم في تصديق الإجماع."
            }
          },
          { 
            id: 3, 
            title: "Historical Examples of Ijma'", 
            duration: "45 min", 
            completed: false,
            content: {
              english: "This lesson examines historical instances of Ijma' in Shia legal tradition. We will study specific cases where consensus played a crucial role in establishing important legal principles.",
              urdu: "یہ سبق شیعہ قانونی روایت میں اجماع کی تاریخی مثالوں کا جائزہ لیتا ہے۔ ہم ایسے خاص معاملات کا مطالعہ کریں گے جہاں اہم قانونی اصولوں کو قائم کرنے میں اجماع نے اہم کردار ادا کیا۔",
              arabic: "يفحص هذا الدرس الأمثلة التاريخية للإجماع في التقليد القانوني الشيعي. سندرس حالات محددة لعب فيها الإجماع دورًا حاسمًا في إرساء مبادئ قانونية مهمة."
            }
          },
          { 
            id: 4, 
            title: "Role of Infallible Imam in Ijma'", 
            duration: "50 min", 
            completed: false,
            content: {
              english: "This lesson explores the distinctive Shia understanding of the role of the Infallible Imam in the formation of Ijma'. We will examine the concept that true consensus must include or be derived from the Imam's position.",
              urdu: "یہ سبق اجماع کی تشکیل میں معصوم امام کے کردار کی شیعہ تفہیم کا جائزہ لیتا ہے۔ ہم اس تصور کا جائزہ لیں گے کہ حقیقی اجماع میں امام کا موقف شامل ہونا یا اس سے ماخوذ ہونا ضروری ہے۔",
              arabic: "يستكشف هذا الدرس الفهم الشيعي المميز لدور الإمام المعصوم في تكوين الإجماع. سنفحص مفهوم أن الإجماع الحقيقي يجب أن يتضمن موقف الإمام أو يستمد منه."
            }
          },
          { 
            id: 5, 
            title: "Contemporary Applications", 
            duration: "35 min", 
            completed: false,
            content: {
              english: "This lesson examines how the principle of Ijma' is applied in contemporary Shia jurisprudence. We will look at modern religious rulings that rely on consensus and how jurists navigate the challenges of establishing consensus today.",
              urdu: "یہ سبق بتاتا ہے کہ معاصر شیعہ فقہ میں اجماع کے اصول کو کیسے لاگو کیا جاتا ہے۔ ہم جدید مذہبی احکام کا جائزہ لیں گے جو اجماع پر منحصر ہیں اور فقہا آج اجماع کے قیام کے چیلنجوں کا کیسے سامنا کرتے ہیں۔",
              arabic: "يفحص هذا الدرس كيفية تطبيق مبدأ الإجماع في الفقه الشيعي المعاصر. سننظر في الأحكام الدينية الحديثة التي تعتمد على الإجماع وكيف يتنقل الفقهاء في تحديات إقامة الإجماع اليوم."
            }
          },
          { 
            id: 6, 
            title: "Comparing Different Juristic Approaches", 
            duration: "35 min", 
            completed: false,
            content: {
              english: "This lesson compares various approaches to Ijma' in different schools of Shia jurisprudence. We will examine the methodologies of major Shia jurists and how their approaches to consensus have shaped legal thought.",
              urdu: "یہ سبق شیعہ فقہ کے مختلف مکاتب میں اجماع کے مختلف طریقوں کا موازنہ کرتا ہے۔ ہم بڑے شیعہ فقہا کے طریقہ کار کا جائزہ لیں گے اور دیکھیں گے کہ اجماع کے بارے میں ان کے طریقے قانونی سوچ کو کیسے تشکیل دیتے ہیں۔",
              arabic: "يقارن هذا الدرس المناهج المختلفة للإجماع في مدارس الفقه الشيعي المختلفة. سنفحص منهجيات كبار الفقهاء الشيعة وكيف شكلت مناهجهم في الإجماع الفكر القانوني."
            }
          }
        ],
        duration: "4 hours",
        hasQuiz: true
      }
    ],
    quizzes: [
      {
        id: 1,
        moduleId: 1,
        questions: [
          {
            id: 1,
            question: "What distinguishes Shia Usul al-Fiqh from other schools?",
            options: [
              { id: "a", text: "Rejection of all hadith" },
              { id: "b", text: "Exclusive reliance on the Quran" },
              { id: "c", text: "Emphasis on the teachings of the Ahl al-Bayt" },
              { id: "d", text: "Rejection of rational arguments" }
            ],
            correctAnswer: "c",
            explanation: "Shia Usul al-Fiqh places special emphasis on the teachings and traditions of the Ahl al-Bayt (the Prophet's family) as a primary source of Islamic law."
          },
          {
            id: 2,
            question: "How does Shia jurisprudence view the role of Aql (reason)?",
            options: [
              { id: "a", text: "It rejects reason entirely" },
              { id: "b", text: "It considers reason as a valid source that complements revelation" },
              { id: "c", text: "It only accepts reason when no textual evidence exists" },
              { id: "d", text: "It values reason above revelation" }
            ],
            correctAnswer: "b",
            explanation: "Shia jurisprudence views reason (Aql) as a valid and complementary source to revelation, believing that true reason never contradicts authentic revelation."
          },
          {
            id: 3,
            question: "What is the significance of the Ahl al-Bayt in Shia Usul al-Fiqh?",
            options: [
              { id: "a", text: "They are considered ordinary scholars" },
              { id: "b", text: "Their opinions are given some weight but can be rejected" },
              { id: "c", text: "They are viewed as divinely appointed guides after the Prophet" },
              { id: "d", text: "Their teachings are only relevant to historical contexts" }
            ],
            correctAnswer: "c",
            explanation: "In Shia Usul al-Fiqh, the Ahl al-Bayt are viewed as divinely appointed guides after the Prophet, whose understanding and interpretation of Islamic law is authoritative."
          }
        ]
      },
      {
        id: 2,
        moduleId: 2,
        questions: [
          {
            id: 1,
            question: "Which of the following best describes the relationship between reason and revelation in Shia thought?",
            options: [
              { id: "a", text: "Reason and revelation are opposing forces" },
              { id: "b", text: "Reason takes precedence over revelation" },
              { id: "c", text: "Revelation makes reason irrelevant" },
              { id: "d", text: "Reason and revelation are complementary and harmonious" }
            ],
            correctAnswer: "d",
            explanation: "In Shia thought, reason and revelation are seen as complementary and harmonious sources of knowledge that, when properly understood, never contradict each other."
          },
          {
            id: 2,
            question: "What is the principle of 'Mulazama' in Shia Usul al-Fiqh?",
            options: [
              { id: "a", text: "The correlation between a rational judgment and a religious ruling" },
              { id: "b", text: "The rejection of rational thinking in religious matters" },
              { id: "c", text: "The principle that all laws must be explicitly stated in the Quran" },
              { id: "d", text: "The requirement to follow the majority opinion" }
            ],
            correctAnswer: "a",
            explanation: "Mulazama refers to the correlation between a rational judgment and a religious ruling, suggesting that what reason definitively judges, religion also affirms."
          },
          {
            id: 3,
            question: "How do Shia jurists apply reason to contemporary issues not explicitly addressed in traditional texts?",
            options: [
              { id: "a", text: "They refuse to address contemporary issues" },
              { id: "b", text: "They apply rational principles while maintaining consistency with the spirit of revelation" },
              { id: "c", text: "They only follow the literal interpretations of ancient texts" },
              { id: "d", text: "They abandon religious guidance entirely for modern issues" }
            ],
            correctAnswer: "b",
            explanation: "Shia jurists apply rational principles to contemporary issues while striving to maintain consistency with the spirit and intent of revelation and the teachings of the Ahl al-Bayt."
          }
        ]
      }
    ]
  }
];

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'overview' | 'certificate'>('content');
  const [expandedModule, setExpandedModule] = useState<number | null>(1);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [language, setLanguage] = useState<Language>('english');
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [userName, setUserName] = useState("Student Name");
  
  // Get active lesson from course data
  const getActiveLesson = (): Lesson | undefined => {
    if (!course || !activeLessonId) return undefined;
    
    for (const module of course.modules) {
      const lesson = module.lessons.find(l => l.id === activeLessonId);
      if (lesson) return lesson;
    }
    
    return undefined;
  };
  
  const activeLesson = getActiveLesson();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // In a real app, you would fetch this data from an API
    if (courseId) {
      const foundCourse = coursesData.find(c => c.id === parseInt(courseId));
      if (foundCourse) {
        setCourse(foundCourse);
        
        // Check if course is completed (this would come from the user's data in a real app)
        // For demo purposes, we'll check if a progress is defined and >= 100
        if (foundCourse.progress && foundCourse.progress >= 100) {
          setCourseCompleted(true);
        }
      } else {
        // Course not found, redirect to courses page
        navigate('/courses');
      }
    }
  }, [courseId, navigate]);

  const toggleModule = (moduleId: number) => {
    if (expandedModule === moduleId) {
      setExpandedModule(null);
    } else {
      setExpandedModule(moduleId);
    }
  };

  const startLesson = (moduleId: number, lessonId: number) => {
    setActiveLessonId(lessonId);
    setActiveQuiz(null);
    setQuizCompleted(false);
  };

  const startQuiz = (moduleId: number) => {
    if (!course) return;
    
    const quiz = course.quizzes.find(q => q.moduleId === moduleId);
    if (quiz) {
      setActiveQuiz(quiz);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setScore(0);
      setQuizCompleted(false);
      setActiveLessonId(null);
      window.scrollTo(0, 0);
    }
  };

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption || isAnswered || !activeQuiz) return;
    
    const currentQuestion = activeQuiz.questions[currentQuestionIndex];
    const isAnswerCorrect = selectedOption === currentQuestion.correctAnswer;
    
    setIsAnswered(true);
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const moveToNextQuestion = () => {
    if (!activeQuiz) return;
    
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const exitQuiz = () => {
    setActiveQuiz(null);
    setQuizCompleted(false);
  };

  const handleCompleteLesson = () => {
    if (!course) return;
    
    // In a real app, we would update the lesson completion status in the database
    setActiveLessonId(null);
    
    // Update progress (simulate progress increase)
    const updatedCourse = { ...course };
    if (updatedCourse.progress === undefined) {
      updatedCourse.progress = 15; // Initial progress
    } else {
      updatedCourse.progress += 15; // Increment progress
      
      // Cap at 100%
      if (updatedCourse.progress > 100) {
        updatedCourse.progress = 100;
      }
      
      // Check if course is now completed
      if (updatedCourse.progress >= 100 && !courseCompleted) {
        setCourseCompleted(true);
        setShowCongratulations(true);
        toast({
          title: "Course Completed!",
          description: "Congratulations! You have completed this course.",
        });
      }
    }
    
    setCourse(updatedCourse);
  };

  const handleDownloadCertificate = () => {
    toast({
      title: "Certificate Download",
      description: "Your certificate is being prepared for download.",
    });
    // In a real app, we would generate a PDF and download it
  };
  
  const handleShareCertificate = () => {
    toast({
      title: "Certificate Shared",
      description: "A shareable link has been copied to your clipboard.",
    });
    // In a real app, we would generate a shareable link
  };

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl">Loading course...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Congratulations modal
  if (showCongratulations) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory-light">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-28">
          <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-xl text-center">
            <div className="w-20 h-20 rounded-full bg-gold/20 mx-auto flex items-center justify-center mb-6">
              <Trophy className="h-10 w-10 text-gold" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-emerald">Congratulations!</h2>
            <p className="text-xl mb-6 text-gray-700">
              You have successfully completed the course:
            </p>
            <p className="text-2xl font-bold mb-8 text-gray-800">{course.title}</p>
            <p className="text-gray-600 mb-8">
              Your certificate of completion is now available. You can view, download, or share it at any time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  setShowCongratulations(false);
                  setActiveTab('certificate');
                }}
                className="px-6 py-3 bg-emerald text-white rounded-lg hover:bg-emerald-dark transition-colors"
              >
                View Certificate
              </button>
              <button 
                onClick={() => {
                  setShowCongratulations(false);
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Continue Learning
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Quiz view
  if (activeQuiz) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory-light">
        <Navbar />
        
        <div className="flex-grow py-28">
          <div className="max-w-3xl mx-auto px-6">
            {quizCompleted ? (
              <div className="bg-white rounded-xl overflow-hidden shadow-xl">
                <div className="bg-emerald p-6">
                  <button onClick={exitQuiz} className="flex items-center text-white mb-4">
                    <ArrowLeft size={16} className="mr-2" /> Back to Course
                  </button>
                  <h3 className="text-xl font-bold text-white">Quiz Results</h3>
                </div>
                
                <div className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-gold/20 mx-auto flex items-center justify-center mb-6">
                    <Award className="h-12 w-12 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Quiz Complete!</h3>
                  <p className="text-gray-600 mb-2">Your score:</p>
                  <div className="text-4xl font-bold text-emerald mb-6">
                    {score} / {activeQuiz.questions.length}
                  </div>
                  <p className="text-gray-600 mb-6">
                    {score === activeQuiz.questions.length 
                      ? "Perfect score! Excellent knowledge!" 
                      : score >= activeQuiz.questions.length * 0.7 
                        ? "Great job! You have a solid understanding." 
                        : "Keep learning and try again soon!"}
                  </p>
                  <button 
                    onClick={exitQuiz}
                    className="gold-button mx-auto flex items-center"
                  >
                    Back to Course <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl overflow-hidden shadow-xl">
                <div className="bg-emerald p-6">
                  <button onClick={exitQuiz} className="flex items-center text-white mb-4">
                    <ArrowLeft size={16} className="mr-2" /> Back to Course
                  </button>
                  <h3 className="text-xl font-bold text-white">Module Quiz</h3>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-white/70 text-sm">
                      Score: {score}/{currentQuestionIndex + (isAnswered ? 1 : 0)}
                    </div>
                  </div>
                  <div className="w-full h-1 bg-white/20 rounded-full mt-4">
                    <div 
                      className="h-full bg-gold rounded-full transition-all duration-300" 
                      style={{ width: `${(currentQuestionIndex / activeQuiz.questions.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-white/70 text-xs mt-1">
                    <span>Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}</span>
                    <span>{Math.round((currentQuestionIndex / activeQuiz.questions.length) * 100)}% Complete</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-lg font-medium mb-6">{activeQuiz.questions[currentQuestionIndex].question}</p>
                  
                  <div className="space-y-3 mb-6">
                    {activeQuiz.questions[currentQuestionIndex].options.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        className={cn(
                          "p-4 border rounded-lg cursor-pointer transition-colors",
                          selectedOption === option.id 
                            ? isAnswered
                              ? isCorrect
                                ? "bg-green-100 border-green-500"
                                : "bg-red-100 border-red-500" 
                              : "bg-blue-100 border-blue-500"
                            : "hover:bg-gray-50",
                          isAnswered && option.id === activeQuiz.questions[currentQuestionIndex].correctAnswer && "bg-green-100 border-green-500"
                        )}
                      >
                        <div className="flex items-center">
                          <div className={cn(
                            "w-6 h-6 rounded-full border flex items-center justify-center mr-3",
                            selectedOption === option.id 
                              ? isAnswered
                                ? isCorrect
                                  ? "border-green-500 text-green-500"
                                  : "border-red-500 text-red-500" 
                                : "border-blue-500 text-blue-500"
                              : "border-gray-300",
                            isAnswered && option.id === activeQuiz.questions[currentQuestionIndex].correctAnswer && "border-green-500 text-green-500"
                          )}>
                            {option.id}
                          </div>
                          <span className="text-gray-800">{option.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {isAnswered ? (
                    <div>
                      <div className={cn(
                        "p-4 mb-6 rounded-lg",
                        isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                      )}>
                        <p className={cn(
                          "font-medium mb-1",
                          isCorrect ? "text-green-700" : "text-red-700"
                        )}>
                          {isCorrect ? "Correct!" : "Incorrect"}
                        </p>
                        <p className="text-gray-600">{activeQuiz.questions[currentQuestionIndex].explanation}</p>
                      </div>
                      
                      <button 
                        onClick={moveToNextQuestion}
                        className="w-full py-3 bg-gold hover:bg-gold/80 text-white font-medium rounded-lg flex items-center justify-center"
                      >
                        {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                          <>Next Question <ChevronRight size={18} className="ml-1" /></>
                        ) : (
                          <>Finish Quiz <CheckCircle size={18} className="ml-1" /></>
                        )}
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={handleSubmit}
                      disabled={!selectedOption}
                      className={cn(
                        "w-full py-3 font-medium rounded-lg flex items-center justify-center",
                        selectedOption 
                          ? "bg-emerald hover:bg-emerald/80 text-white" 
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      Check Answer
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Lesson view
  if (activeLesson) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory-light">
        <Navbar />
        
        <div className="flex-grow py-28">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-xl overflow-hidden shadow-xl">
              <div className="bg-emerald p-6">
                <button 
                  onClick={() => setActiveLessonId(null)}
                  className="flex items-center text-white mb-4"
                >
                  <ArrowLeft size={16} className="mr-2" /> Back to Course
                </button>
                <h3 className="text-xl font-bold text-white">{activeLesson.title}</h3>
                <div className="flex items-center text-white/70 text-sm mt-1">
                  <Clock size={14} className="mr-1" /> {activeLesson.duration}
                </div>
              </div>
              
              <div className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {activeLesson.content.english}
                  </p>
                </div>
                
                <div className="mt-8">
                  <button
                    onClick={handleCompleteLesson}
                    className="px-6 py-3 bg-emerald text-white rounded-lg hover:bg-emerald-dark transition-colors"
                  >
                    Mark as Completed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Main course view with tabs
  return (
    <div className="min-h-screen flex flex-col bg-ivory-light">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Course header */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="md:w-1/3">
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-medium">
                      {course.category}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="text-sm font-medium ml-1">{course.rating}</span>
                    </div>
                  </div>
                  
                  {course.progress !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div 
                          className="h-full bg-emerald rounded-full transition-all duration-300" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Instructor</span>
                      <span className="font-medium text-gray-800">{course.instructor}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Duration</span>
                      <span className="font-medium text-gray-800">
                        {course.modules.reduce((total, module) => {
                          const hours = parseFloat(module.duration.split(' ')[0]);
                          return total + hours;
                        }, 0)} hours
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Modules</span>
                      <span className="font-medium text-gray-800">{course.modules.length}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Lessons</span>
                      <span className="font-medium text-gray-800">
                        {course.modules.reduce((total, module) => total + module.lessons.length, 0)}
                      </span>
                    </div>
                  </div>
                  
                  {courseCompleted && (
                    <div className="mt-4 p-3 bg-gold/10 border border-gold/20 rounded-lg">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-gold mr-2" />
                        <p className="text-sm font-medium text-gray-800">Course Completed</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('certificate')}
                        className="mt-2 text-sm text-gold flex items-center hover:underline"
                      >
                        View Certificate <ChevronRight size={14} className="ml-1" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{course.title}</h1>
              
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('content')}
                    className={cn(
                      "py-3 px-1 border-b-2 font-medium text-sm",
                      activeTab === 'content' 
                        ? "border-emerald text-emerald" 
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    )}
                  >
                    Course Content
                  </button>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={cn(
                      "py-3 px-1 border-b-2 font-medium text-sm",
                      activeTab === 'overview' 
                        ? "border-emerald text-emerald" 
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    )}
                  >
                    Overview
                  </button>
                  {courseCompleted && (
                    <button
                      onClick={() => setActiveTab('certificate')}
                      className={cn(
                        "py-3 px-1 border-b-2 font-medium text-sm",
                        activeTab === 'certificate' 
                          ? "border-emerald text-emerald" 
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      )}
                    >
                      Certificate
                    </button>
                  )}
                </div>
              </div>
              
              {/* Tab content */}
              {activeTab === 'content' && (
                <div className="space-y-4">
                  {course.modules.map((module) => (
                    <div key={module.id} className="bg-white rounded-xl overflow-hidden shadow-md">
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex justify-between items-center p-5 text-left"
                      >
                        <div>
                          <h3 className="font-bold text-gray-800">{module.title}</h3>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <Clock size={14} className="mr-1" /> {module.duration}
                            <span className="mx-2">•</span>
                            <BookOpen size={14} className="mr-1" /> {module.lessons.length} lessons
                            {module.hasQuiz && (
                              <>
                                <span className="mx-2">•</span>
                                <span className="flex items-center">
                                  <CheckCircle size={14} className="mr-1" /> Has Quiz
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <ChevronRight 
                          className={cn(
                            "h-5 w-5 text-gray-400 transition-transform",
                            expandedModule === module.id && "transform rotate-90"
                          )} 
                        />
                      </button>
                      
                      {expandedModule === module.id && (
                        <div className="p-5 pt-0 border-t border-gray-100">
                          <ul className="divide-y divide-gray-100">
                            {module.lessons.map((lesson) => (
                              <li key={lesson.id} className="py-3">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className={cn(
                                      "w-6 h-6 rounded-full flex items-center justify-center mr-3",
                                      lesson.completed ? "bg-emerald text-white" : "bg-gray-100"
                                    )}>
                                      {lesson.completed ? (
                                        <CheckCircle size={14} />
                                      ) : (
                                        <span className="text-xs">{lesson.id}</span>
                                      )}
                                    </div>
                                    <span className={cn(
                                      "text-sm",
                                      lesson.completed ? "text-gray-500" : "text-gray-700"
                                    )}>
                                      {lesson.title}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-gray-400 text-xs mr-3">{lesson.duration}</span>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        startLesson(module.id, lesson.id);
                                      }}
                                      className="text-xs px-3 py-1 rounded-full bg-emerald/10 text-emerald hover:bg-emerald/20 transition-colors"
                                    >
                                      {lesson.completed ? "Review" : "Start"}
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                            
                            {module.hasQuiz && (
                              <li className="py-3">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center mr-3">
                                      <Award size={14} className="text-gold" />
                                    </div>
                                    <span className="text-sm text-gray-700">
                                      Module Quiz
                                    </span>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      startQuiz(module.id);
                                    }}
                                    className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
                                  >
                                    Take Quiz
                                  </button>
                                </div>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'overview' && (
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h2 className="text-xl font-bold mb-4">Course Overview</h2>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <h3 className="font-bold text-lg mt-6 mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-emerald mr-2 flex-shrink-0" />
                      <span>Understand the foundational principles of Shia jurisprudence</span>
                    </li>
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-emerald mr-2 flex-shrink-0" />
                      <span>Explore the role of reason (Aql) in deriving Islamic law</span>
                    </li>
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-emerald mr-2 flex-shrink-0" />
                      <span>Learn about consensus (Ijma') and its applications</span>
                    </li>
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-emerald mr-2 flex-shrink-0" />
                      <span>Understand the significance of the Ahl al-Bayt's teachings</span>
                    </li>
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-emerald mr-2 flex-shrink-0" />
                      <span>Apply jurisprudential principles to contemporary issues</span>
                    </li>
                  </ul>
                  
                  <h3 className="font-bold text-lg mt-6 mb-3">About the Instructor</h3>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mr-4"></div>
                    <div>
                      <h4 className="font-medium">{course.instructor}</h4>
                      <p className="text-gray-500 text-sm">Islamic Studies Scholar</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Sheikh Mohammad Hasan is a respected scholar in the field of Islamic jurisprudence with over 20 years of teaching experience. He completed his higher studies at the Islamic Seminary in Qom and has authored several books on Usul al-Fiqh.
                  </p>
                </div>
              )}
              
              {activeTab === 'certificate' && courseCompleted && (
                <div>
                  <Certificate 
                    studentName={userName}
                    courseName={course.title}
                    completionDate={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    instructorName={course.instructor}
                    onDownload={handleDownloadCertificate}
                    onShare={handleShareCertificate}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetail;
