import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function LandingPage({ theme }) {
  return (
    <main>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-blue-600 text-white py-6 px-6 sticky top-0 flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-wider">
            Welcome to BillSplit
          </h1>
          <div className="space-x-4">
            <Link to="/info" className="text-gray-200 hover:text-gray-100">
              Info
            </Link>
            <Link to="/contact" className="text-gray-200 hover:text-gray-100">
              Contact
            </Link>
            <Link to="/about" className="text-gray-200 hover:text-gray-100">
              About
            </Link>
          </div>
        </div>
        <div className="p-8 max-w-3xl mx-auto">
          <p className="text-gray-800 text-lg mb-6">
            BillSplit is a simple app that helps you split bills and expenses with your friends and family.
          </p>
          <Link to="/Home">
            <button className="bg-blue-600 text-white rounded px-6 py-3 hover:bg-blue-700 focus:bg-blue-700 font-bold text-lg shadow-md">
              Access App
            </button>
          </Link>
        </div>
      </div>

      <Footer theme={theme} />
    </main>
  );
}
