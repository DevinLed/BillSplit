import React, { useRef, useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import Footer from "./Footer";

export default function Home({theme, setTheme, toggleTheme, accessedApp, setAccessedApp}) {


    const [startBill, setStartBill] = useState(true);
    const [showPersonEdit, setPersonEdit] = useState(false);
    const [showHistory, setHistory] = useState(false);

    
  const [selectPersonEdit, setSelectPersonEdit] = useState(false);
  const [selectGroupEdit, setSelectGroupEdit] = useState(false);

  // For Dark/Bright mode. Keeps mode storage for page refresh.
  
    // Text switch for dark mode button
    const [buttonText, setButtonText] = useState("Dark Mode");
    const changeText = (text) => setButtonText(text);

    
    
  
  // Main screen menu selection - 4 buttons: Start Bill, Edit Person, History, Darkmode
  return (
    <>
    
    <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
        <div className={`App ${theme}`}>
              <div className="flex flex-col items-center justify-center">
                {/*  Header narrative for the Main Screen + 4 button selection screens */}
                <Header
                  startBill={startBill}
                  showPersonEdit={showPersonEdit}
                  selectPersonEdit={selectPersonEdit}
                  setSelectPersonEdit={setSelectPersonEdit}
                  setPersonEdit={setPersonEdit}
                ></Header>
                <ul>
                  <li className="flex items-center justify-center">
                    <Link to="/SplitBill">
                      <button
                        className="justify-center mt-5 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                      >
                        Split a Bill
                      </button>
                    </Link>
                  </li>
                  <li className="flex items-center justify-center">
                    <Link to="/EditList">
                      <button
                        className="mt-5 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                      >
                        Edit Person
                      </button>
                    </Link>
                  </li>

                  <li className="flex items-center justify-center">
                    <Link to="/History">
                      <button
                        className="mt-5 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                       >
                        Show History
                      </button>
                    </Link>
                  </li>
                  <li className="flex items-center justify-center">
                    <button
                      onClick={() => {
                        toggleTheme();
                        if (theme === "light") {
                          changeText("Bright Mode");
                        } else {
                          changeText("Dark Mode");
                        }
                      }}
                      className="mt-5 mb-10 bg-black text-white font-bold py-2 px-4 rounded shadow border-2 border-black hover:text-white-500 transition-all duration-300"
                    >
                      {buttonText}
                    </button>
                  </li>
                  <li className="flex items-center justify-center">
                    
                  <Link to="/LandingPage">
                      <button
                      
                        className="mt-5 mb-5 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                       >
                        Home Page
                      </button>
                      </Link>
                  </li>
                </ul>
              </div>
        </div>
      <Footer theme={theme}/>
      </main>
    </>
  )
}
