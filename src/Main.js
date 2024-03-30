import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import LandingPage from "./components/LandingPage";
import AboutMe from "./components/Aboutme";
import Tutorial from "./components/Tutorial";
import Contact from "./components/Contact";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/Contact" element={<Contact />} />
      <Route path="/Tutorial" element={<Tutorial />} />
      <Route path="/AboutMe" element={<AboutMe />} />
      <Route path="/App/*" element={<App />} />
    </Routes>
  );
};

export default Main;
