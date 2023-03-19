import React, { useRef, useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import Footer from "./Footer";

export default function Home() {


    const [startBill, setStartBill] = useState(true);
    const [showPersonEdit, setPersonEdit] = useState(false);
    const [showHistory, setHistory] = useState(false);

    
  const [selectPersonEdit, setSelectPersonEdit] = useState(false);
  const [selectGroupEdit, setSelectGroupEdit] = useState(false);

  
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const toggleTheme = () => {
      if (theme === "light") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };
    // useEffect to track dark mode
    useEffect(() => {
      localStorage.setItem("theme", theme);
      document.body.className = theme;
    }, [theme]);
    // Text switch for dark mode button
    const [buttonText, setButtonText] = useState("Dark Mode");
    const changeText = (text) => setButtonText(text);
  
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
                  <li>
                    <Link to="/SplitBill">
                      <button
                        className="justify-center mt-5 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                      >
                        Split a Bill
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/EditList">
                      <button
                        className="mt-5 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                      >
                        Edit Person
                      </button>
                    </Link>
                  </li>

                  <li>
                    <Link to="/History">
                      <button
                        className="mt-5 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                       >
                        Show History
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        toggleTheme();
                        if (theme === "light") {
                          changeText("Bright Mode");
                        } else {
                          changeText("Dark Mode");
                        }
                      }}
                      className="mt-5 mb-5 bg-black text-white font-bold py-2 px-4 rounded shadow border-2 border-black hover:text-white-500 transition-all duration-300"
                    >
                      {buttonText}
                    </button>
                  </li>
                </ul>
              </div>
        </div>
      <Footer/>
      </main>
    </>
  )
}
