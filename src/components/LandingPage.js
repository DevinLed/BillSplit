import React from "react";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import SchoolIcon from '@mui/icons-material/School';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Tooltip from '@mui/material/Tooltip';
import Footer from "./Footer";
import Button from '@mui/material/Button'; 
import phoneoutline from "../img/phoneoutline.png";
import Contact from "./Contact";
import Receiptphoneoutline from "../img/Receiptphoneoutline.png";
import Historyphoneoutline from "../img/Historyphoneoutline.png";
import Historydarkoutline from "../img/Historydarkoutline.png";
import DivvySample from "../img/DivvySample.gif";

export default function LandingPage({ theme, lang }) {


  const renderButton = (icon, text, to, tooltip) => (
    <Link to={to} className="inline-flex flex-col items-center justify-center text-center">
      <Tooltip title={tooltip}>
        <IconButton color="inherit">
          {icon}
        </IconButton>
      </Tooltip>
      <span className="text-xs text-white">{text}</span>
    </Link>
  );
  return (
    <main className="xs:max-w-xl bg-white-500 rounded p-0 shadow">
      <div
        className="bg-blue-400 text-white py-2 h-20 px-6 sticky top-0 flex items-center justify-between"
        style={{ backgroundColor: "rgb(4, 125, 149)" }}
      >
          <Link to="/" className="text-2xl font-bold tracking-wider text-white hover:text-gray-300">Divvy</Link>

        <div className="flex items-center space-x-4">
          {renderButton(<AppsIcon />, "App", "/App/Home", "Go to App")}
          {renderButton(<SchoolIcon />, "Tutorials", "/Tutorials", "Tutorials")}
          {renderButton(<ContactMailIcon />, "Contact", "/App/Contact", "Contact Me")}
        </div>
      </div>
      <div className="p-4 max-w-3xl mx-auto">
        <p className="text-gray-800 text-lg mb-6">
          Divvy is a simple app that helps you split bills and expenses with
          your friends and family.
        </p>
        <Link to="/App/Home">
          <button className="text-black mb-0 flex h-16 w-full flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-2 px-4 text-lg font-semibold shadow-md hover:bg-gray-200 hover:no-underline">
            Divvy it up
          </button>
        </Link>
        <div className="mt-4 flex flex-col items-center justify-center">
          <span className="flex justify-center mb-3 text-black">Demo</span>
          <div className="flex flex-row justify-center items-center mb-2 mt-2 w-64">
            <div className="w-64 bg-gray-100">
              <img
                src={DivvySample}
                alt="Captured Receipt"
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col justify-center">
          <span className="flex justify-left mb-3 text-black">Features:</span>
          <div className="flex flex-row items-top mb-2 mt-2">
            <div className="w-48 bg-gray-100">
              <img
                src={Receiptphoneoutline}
                alt="Captured Receipt"
                className="w-full"
              />
            </div>
            <div className="w-48 bg-gray-100 flex justify-center items-center">
              <p className="text-gray-800 mt-2 ml-2">
                You can add items manually, or try out the camera capture
                service.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-top mb-2 mt-4 justify-end">
            <div className="w-48 bg-gray-100 flex justify-center items-center">
              <p className="text-gray-800 mt-2 ml-2">
                The History tab shows the last 10 receipts submitted, however
                you can search by contact.
              </p>
            </div>
            <div className="w-48 bg-gray-100">
              <img
                src={Historyphoneoutline}
                alt="Captured Receipt"
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-row items-top mt-4 justify-start">
            <div className="w-48 bg-gray-100">
              <img
                src={Historydarkoutline}
                alt="Captured Receipt"
                className="w-full"
              />
            </div>
            <div className="w-48 bg-gray-100 flex justify-center items-center">
              <p className="text-gray-800 mt-2 ml-2">
                With dark mode, everything is dimmed down so as not to hurt the
                user's eyes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer theme={theme} lang={lang} />
    </main>
  );
}
