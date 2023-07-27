import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import {
  IoReceiptOutline,
  IoPersonCircleOutline,
  IoListOutline,
  IoInvertModeSharp,
  IoHomeOutline,
  IoAlertCircle,
} from "react-icons/io5";

import { CSSTransition } from "react-transition-group";

export default function Home({ theme, toggleTheme, handleClearData, list, setShowConfirmation, showConfirmation }) {
  const [startBill, setStartBill] = useState(true);
  const [showPersonEdit, setPersonEdit] = useState(false);
  const [selectPersonEdit, setSelectPersonEdit] = useState(false);

  const handleConfirmClearData = () => {
    setShowConfirmation(true); // Show the confirmation popup
  };
  const handleCancelClearData = () => {
    setShowConfirmation(false); // Hide the confirmation popup
  };

  useEffect(() => {
    setStartBill(true);
    setPersonEdit(false);
    setSelectPersonEdit(false);
  }, []);

  // For Dark/Bright mode. Keeps mode storage for page refresh.
  const [buttonText, setButtonText] = useState("Dark");
  const changeText = (text) => setButtonText(text);

  const yAxisCallback = (value) => `$${value.toFixed(2)}`;
  const chartData = {
    labels: list.map(({ personName }) => personName),
    datasets: [
      {
        label: "Owing Amount",
        data: list.map(({ personOwing }) => personOwing),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const tooltipCallbacks = {
    title: (tooltipItems) => {
      if (tooltipItems.length > 0) {
        const index = tooltipItems[0].dataIndex;
        return list[index].personName;
      }
      return "";
    },
    label: (tooltipItem) => `$${tooltipItem.formattedValue}`,
  };

  const chartOptions = {
    indexAxis: "x",
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          callback: yAxisCallback,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Current balances",
        font: {
          size: 16,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: tooltipCallbacks,
        displayColors: false,
        titleAlign: "center",
        titleFont: {
          weight: "bold",
        },
        bodyFont: {
          weight: "normal",
        },
        custom: (tooltipModel) => {
          // Check if tooltip is visible
          if (tooltipModel.opacity === 0) {
            return;
          }

          // Close tooltip after 5 seconds
          setTimeout(() => {
            tooltipModel.opacity = 0;
            this._chart.tooltip.update();
          }, 5000);
        },
      },
    },
  };

  return (
    <>
      <main className={"xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl " + (theme === "dark" ? "border-2 border-gray-800 lg-rounded":"")}  style={{ maxWidth: '600px' }}>
        <div className={`App ${theme}`}>
          <div className="flex flex-col items-center justify-center">
            {/*  Header narrative for the Main Screen + 6 button selection screens */}
            <Header
              startBill={startBill}
              showPersonEdit={showPersonEdit}
              selectPersonEdit={selectPersonEdit}
              setSelectPersonEdit={setSelectPersonEdit}
              setPersonEdit={setPersonEdit}
              theme={theme}
            />
            <div>
              {chartData.labels.length > 0 ? (
                <Bar data={chartData} options={chartOptions} />
              ) : (
                ""
              )}
            </div>
            <div className="grid grid-cols-3 gap-y-0 gap-x-1 py-4">
            <Link to="/SplitBill" className="mb-0 p-0">
  <label
    className={
      theme === "dark"
        ? "mb-0 flex h-24 w-full flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
        : "mb-0 flex h-24 w-full flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
    }
  >
    <IoReceiptOutline size={24} />
    <span className={theme === "dark" ? "text-white" : "text-gray-800"}>Split a Bill</span>
  </label>
</Link>
<Link to="/EditList">
  <label
    className={
      theme === "dark"
        ? "flex h-24 w-full flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
        : "flex h-24 w-full flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
    }
  >
    <IoPersonCircleOutline size={24} />
    <span className={theme === "dark" ? "text-white" : "text-gray-800"}>Edit Person</span>
  </label>
</Link>
<Link to="/History">
  <label
    className={
      theme === "dark"
        ? "flex h-24 w-full flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
        : "flex h-24 w-full flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
    }
  >
    <IoListOutline size={24} />
    <span className={theme === "dark" ? "text-white" : "text-gray-800"}>History</span>
  </label>
</Link>
<label
  onClick={() => {
    toggleTheme();
    if (theme === "light") {
      changeText("Light");
    } else {
      changeText("Dark");
    }
  }}
  className={
    theme === "dark"
      ? "flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
      : "flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
  }
>
  <IoInvertModeSharp size={24} />
  <span className={theme === "dark" ? "text-white" : "text-gray-800"}>{buttonText}</span>
</label>
<Link to="/LandingPage">
  <label
    className={
      theme === "dark"
        ? "flex h-24 w-full flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
        : "flex h-24 w-full flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
    }
  >
    <IoHomeOutline size={24} />
    <span className={theme === "dark" ? "text-white" : "text-gray-800"}>Home Page</span>
  </label>
</Link>
<label
  onClick={() => handleConfirmClearData()}
  className={
    theme === "dark"
      ? "flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
      : "flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
  }
>
  <IoAlertCircle size={24} />
  <span className={theme === "dark" ? "text-white" : "text-gray-800"}>Clear Data</span>
</label>

            </div>
          </div>
        </div>
        <CSSTransition
        in={showConfirmation}
        timeout={500} // Adjust the duration of the transition as needed
        classNames="fade"
        unmountOnExit
      >
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className={"p-6 rounded shadow-md " + (theme === "dark" ? "bg-gray-800" : "bg-gray-100")}>
              <p>Are you sure you want to clear all data?</p>
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  onClick={handleClearData}
                >
                  Yes
                </button>
                <button
                  className={"px-4 py-2 rounded hover:bg-gray-900 " + (theme === "dark" ? "bg-gray-300 text-gray-800" : "bg-gray-800")}
                  onClick={handleCancelClearData}
                >
                  No
                </button>
              </div>
            </div>
          </div>
          </CSSTransition>
        <Footer theme={theme} />
      </main>
    </>
  );
}
