
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import CourseContentPages from './pages/CourseContentPages';
import Quizzes from './pages/Quizzes';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/courses/:courseId/content" element={<CourseContentPages />} />
        <Route path="/courses/:courseId/content/:contentId" element={<CourseContentPages />} />
        <Route path="/courses/:courseId/lesson/:moduleId/:lessonId" element={<CourseDetail />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
