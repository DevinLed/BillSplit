import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import phoneoutline from "../img/phoneoutline.png";
import Receiptphoneoutline from "../img/Receiptphoneoutline.png";
import Historyphoneoutline from "../img/Historyphoneoutline.png";
import Historydarkoutline from "../img/Historydarkoutline.png";
import DivvySample from "../img/DivvySample.gif";

export default function LandingPage({ theme }) {
  return (
    <main className="xs:max-w-xl bg-white-500 rounded p-0 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl" style={{ maxWidth: '650px' }}>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-blue-600 text-white py-6 px-6 sticky top-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold tracking-wider">
            Welcome to Divvy
          </h1>
        </div>
        <div className="p-8 max-w-3xl mx-auto">
          <p className="text-gray-800 text-lg mb-6">
            Divvy is a simple app that helps you split bills and expenses with your friends and family.
          </p>
          <Link to="/Home">
            <button className="text-black mb-0 flex h-24 w-full flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-xl font-semibold shadow-md hover:bg-gray-200 hover:no-underline">
              Divvy it up
            </button>
          </Link>
          <div className="mt-5 flex flex-col items-center justify-center">
          <span className="flex justify-center mb-3 text-black">
              Demo
            </span>
          <div className="flex flex-row justify-center items-center mb-2 mt-2 w-72">
              <div className="w-72 bg-gray-100">
                <img
                  src={DivvySample}
                  alt="Captured Receipt"
                  className="w-full"
                />
              </div>
              </div>
              </div>
          <div className="mt-5 flex flex-col justify-center">
            <span className="flex justify-left mb-3 text-black">
              Features:
            </span>
            <div className="flex flex-row items-top mb-2 mt-2">
              <div className="w-48 bg-gray-100">
                <img
                  src={Receiptphoneoutline}
                  alt="Captured Receipt"
                  className="w-full"
                />
              </div>
              <div className="w-48 bg-gray-100 flex justify-center items-center">
                <p className="text-gray-800 mt-2 ml-3">
                  You can add items manually, or try out the camera capture service.
                </p>
              </div>
            </div>
            <div className="flex flex-row items-top mb-2 mt-5 justify-end">
              <div className="w-48 bg-gray-100 flex justify-center items-center">
                <p className="text-gray-800 mt-2 ml-3">
                  The History tab shows the last 10 receipts submitted, however you can search by contact.
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
            <div className="flex flex-row items-top mt-5 justify-start">
              <div className="w-48 bg-gray-100">
                <img
                  src={Historydarkoutline}
                  alt="Captured Receipt"
                  className="w-full"
                />
              </div>
              <div className="w-48 bg-gray-100 flex justify-center items-center">
                <p className="text-gray-800 mt-2 ml-3">
                  With dark mode, everything is dimmed down so as not to hurt the user's eyes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer theme={theme} />
    </main>
  );
}
