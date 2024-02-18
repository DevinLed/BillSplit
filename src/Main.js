import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import LandingPage from './components/LandingPage';

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/App/*" element={<App />} />
    </Routes>
  );
};

export default Main;
