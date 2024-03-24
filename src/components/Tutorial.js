import React from "react";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import SchoolIcon from '@mui/icons-material/School';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Tooltip from '@mui/material/Tooltip';
import Footer from "./Footer";
import Receiptphoneoutline from "../img/Receiptphoneoutline.png";
import Historyphoneoutline from "../img/Historyphoneoutline.png";
import Historydarkoutline from "../img/Historydarkoutline.png";
import DivvySample from "../img/DivvySample.gif";
import divvylogo from "../img/divvylogo.png";
import { Hidden } from "@mui/material";
import "../LandingPage.css";

export function Tutorial() {

  const renderButton = (icon, text, to, tooltip) => (
    <Link to={to} className="inline-flex flex-col items-center justify-center text-center">
      <Tooltip title={tooltip}>
        <IconButton color="inherit">{icon}</IconButton>
      </Tooltip>
      <span className="text-xs text-white">{text}</span>
    </Link>
  );

  const FeatureCard = ({ imageSrc, altText, description }) => (
    <div className="feature-card flex flex-row items-center mb-4 mt-4 bg-gray-100 shadow-lg rounded-lg overflow-hidden">
      <div className="w-1/2">
        <img src={imageSrc} alt={altText} className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 p-4">
        <p className="text-gray-800">{description}</p>
      </div>
    </div>
  );

  return (
    <main className={`backgroundImage backgroundImageDefault ${window.innerWidth > 700 ? "backgroundImageLarge" : ""}`} 
    style={{
      bottom: "-25px",
      transition: "transform 0.2s",
    }}>
      <div style={{ backdropFilter: "blur(5px)", backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", position: "fixed", top: 0, left: 0, right: 0, padding: "10px 0", overflow: Hidden }}>
        <div className="mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Divvy</Link>
          <div className="flex items-center space-x-4">
            {renderButton(<AppsIcon />, "App", "/App/Home", "Go to App")}
            {renderButton(<SchoolIcon />, "Tutorial", "/App/Tutorial", "Tutorial")}
            {renderButton(<ContactMailIcon />, "Contact", "/App/Contact", "Contact Me")}
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col items-center justify-center">
        <span className="flex justify-center mb-3 text-black">Demo</span>
        <div className="flex flex-row justify-center items-center mb-2 mt-2 w-64">
          <div className="w-64 bg-gray-100">
            <img src={DivvySample} alt="Captured Receipt" className="w-full" />
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="mt-4">
          <FeatureCard imageSrc={Receiptphoneoutline} altText="Feature 1" description="You can add items manually, or try out the camera capture service." />
          <FeatureCard imageSrc={Historyphoneoutline} altText="Feature 2" description="The History tab shows the last 10 receipts submitted, however you can search by contact." />
          <FeatureCard imageSrc={Historydarkoutline} altText="Feature 3" description="With dark mode, everything is dimmed down so as not to hurt the user's eyes." />
        </div>
      </div>
      <div className="flex justify-center mt-100">
        <footer className="fixed bottom-0 w-full">
          <div className="outro" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", textAlign: "center", padding: "10px", borderRadius: "20px" }}>
            <p>© Devin Ledwell | Developed with React, JSX, Node.js, and AWS | Check out my <a className="font-bold" target="_blank" rel="noopener noreferrer" href="https://github.com/DevinLed" style={{ color: "#FFD700" }}>GitHub</a></p>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default Tutorial;
