import { React } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import phoneoutline from "../img/phoneoutline.png";

import Receiptphoneoutline from "../img/Receiptphoneoutline.png";
import Historyphoneoutline from "../img/Historyphoneoutline.png";
import Historydarkoutline from "../img/Historydarkoutline.png";

export default function LandingPage({ theme }) {
  return (
    <main>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-blue-600 text-white py-6 px-6 sticky top-0 flex items-center justify-between">
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

              
              Access App
            </button>
          </Link>
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
              <div className="w-48 bg-gray-100 ">
                <p className="text-gray-800 mt-2 ml-3">
                  You can add items manually, or try out the camera capture service.
                </p>
              </div>
            </div>
            <div className="flex flex-row items-top mb-2 mt-5">
              
            <div className="w-48 bg-gray-100 ">
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


            <div className="flex flex-row items-top mt-5">
              <div className="w-48 bg-gray-100">
                <img
                  src={Historydarkoutline}
                  alt="Captured Receipt"
                  className="w-full"
                />
              </div>
              <div className="w-48 bg-gray-100">
                <p className="text-gray-800 mt-2 ml-3">
                  With dark mode, everything is dimmed down so to not hurt the users eyes.
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
