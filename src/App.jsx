import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import ViewProfilePage from './pages/ViewProfilePage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import TakeTestPage from './pages/TakeTestPage';
import TestResultPage from './pages/TestResultPage';
import MyCoursesPage from './pages/MyCoursesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/view-profile" element={<ViewProfilePage />} />
      <Route path="/settings" element={<AccountSettingsPage />} />
      <Route path="/profile" element={<UpdateProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/take-test/:testId" element={<TakeTestPage />} />
      <Route path="/test-result/:testId" element={<TestResultPage />} />
      <Route path="/my-courses" element={<MyCoursesPage />} />
      <Route path="*" element={<div className="min-h-screen flex items-center justify-center text-xl text-gray-600">404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;