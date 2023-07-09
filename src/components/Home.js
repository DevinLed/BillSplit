import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Chart, registerables } from "chart.js";
import 'chart.js';

export default function Home({theme, toggleTheme, handleClearData, personReceiptAmount }) {


    const [startBill, setStartBill] = useState(true);
    const [showPersonEdit, setPersonEdit] = useState(false);

    
  const [selectPersonEdit, setSelectPersonEdit] = useState(false);

  // For Dark/Bright mode. Keeps mode storage for page refresh.
  
    // Text switch for dark mode button
    const [buttonText, setButtonText] = useState("Dark Mode");
    const changeText = (text) => setButtonText(text);
    const [chartData, setChartData] = useState(null); // Initialize chartData as null

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await personReceiptAmount();
          setChartData(data); // Update chartData with the fetched data
        } catch (error) {
          console.error('Error fetching chart data:', error);
        }
      };
  
      fetchData();
    }, [personReceiptAmount]); // Include personReceiptAmount as a dependency to re-fetch data when it changes
  
  return (
    <>
    
    <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
        <div className={`App ${theme}`}>
              <div className="flex flex-col items-center justify-center">
                {/*  Header narrative for the Main Screen + 6 button selection screens */}
                <Header
                  startBill={startBill}
                  showPersonEdit={showPersonEdit}
                  selectPersonEdit={selectPersonEdit}
                  setSelectPersonEdit={setSelectPersonEdit}
                  setPersonEdit={setPersonEdit}
                ></Header>
                <div className={`App ${theme}`}>
                <div className="flex flex-col items-center justify-center">
            {/* Header narrative for the Main Screen + 6 button selection screens */}
            <Header
              startBill={startBill}
              showPersonEdit={showPersonEdit}
              selectPersonEdit={selectPersonEdit}
              setSelectPersonEdit={setSelectPersonEdit}
              setPersonEdit={setPersonEdit}
            ></Header>
            <ul>
              {/* Buttons */}
            </ul>
            <div>
              <h2>Person Receipt Amount Over Time</h2>
              {chartData ? ( // Render the chart only if chartData is available
                <Line
                  data={{
                    labels: chartData.map((dataPoint) => dataPoint.date),
                    datasets: [
                      {
                        label: 'Receipt Amount',
                        data: chartData.map((dataPoint) => dataPoint.amount),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              ) : (
                <p>Loading chart data...</p> // Display a loading message while data is being fetched
              )}
            </div>
          </div>
        </div>
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
                  <li onClick={() => handleClearData()} className="flex items-center justify-center">
                  <button className="mt-5 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                        onClick={() => handleClearData()}>Clear Data</button>
                  </li>
                </ul>
              </div>
        </div>
      <Footer theme={theme}/>
      </main>
    </>
  )
}
