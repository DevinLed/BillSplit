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
  IoSettingsOutline,
} from "react-icons/io5";

import NotificationAPIComponent from "../components/NotificationAPI";
import { CSSTransition } from "react-transition-group";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { Amplify, API, graphqlOperation, Auth } from "aws-amplify";

import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

export default function Home({
  theme,
  toggleTheme,
  handleClearData,
  list,
  lang,
  setLang,
  signOut,
  user,
  loggedInUserEmail
}) {
  const [startBill, setStartBill] = useState(true);
  const [showPersonEdit, setPersonEdit] = useState(false);
  const [selectPersonEdit, setSelectPersonEdit] = useState(false);

  useEffect(() => {
    setStartBill(true);
    setPersonEdit(false);
    setSelectPersonEdit(false);
    setLang(lang);
  }, [lang, setLang]);

  // For Dark/Bright mode. Keeps mode storage for page refresh.
  const [buttonText, setButtonText] = useState(
    lang === "english" ? "Dark Mode" : "Mode Sombre"
  );
  const changeText = (text) => setButtonText(text);

  /*

  Still testing


  const handleChangePassword = async () => {
    try {
      const oldPassword = prompt("Enter your old password:");
      if (!oldPassword) {
        alert("Changing password was canceled.");
        return;
      }
  
      const user = await Auth.currentAuthenticatedUser();
  
      const newPassword = prompt("Enter your new password:");
      if (!newPassword) {
        alert("Changing password was canceled.");
        return;
      }
  
      await Auth.changePassword(user, oldPassword, newPassword);
      alert("Password changed successfully!");
  
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password: " + error.message);
    }
  };
  */


  const yAxisCallback = (value) => `$${value.toFixed(2)}`;
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Owing Amount",
        data: [],
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
  });

  const tooltipCallbacks = {
    title: (tooltipItems) => {
      if (tooltipItems.length > 0) {
        const index = tooltipItems[0].dataIndex;
        if (index >= 0 && index < list.length) {
          return list[index].personName;
        }
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
        text: lang === "english" ? "Current Balances" : "Soldes actuels",
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
      <div className={`App ${theme}`}>
        <div className="flex items-center justify-center mt-1">
          
          <Heading
            className={
              theme === "dark"
                ? "text-white text-center"
                : "text-gray-800 text-center"
            }
            level={1}
          >
            {lang === "english" ? "Hello" : "Bonjour"} {user.attributes.name}
          </Heading>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Button
            onClick={signOut}
            className={
              theme === "dark"
                ? "text-white text-center"
                : "text-gray-800 text-center"
            }
          >
            {lang === "english" ? "Sign out" : "Se déconnecter"}
          </Button>
        </div>
        <main
          className={
            "xs:max-w-xl mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl " +
            (theme === "dark"
              ? "border-2 border-gray-800 lg-rounded bg-gray-650"
              : "bg-white-500 ")
          }
          style={{ maxWidth: "600px" }}
        >
          
          <div>
            <div className="flex flex-col items-center justify-center">
              <Header
                startBill={startBill}
                showPersonEdit={showPersonEdit}
                selectPersonEdit={selectPersonEdit}
                setSelectPersonEdit={setSelectPersonEdit}
                setPersonEdit={setPersonEdit}
                theme={theme}
                lang={lang}
              />
              <div>
                {chartData.labels.length > 0 ? (
                  <Bar data={chartData} options={chartOptions} />
                ) : (
                  ""
                )}
              </div>
              <div className="circle-menu">
                <div class="center-circle"></div>
                <Link to="/SplitBill" className="menu-item split-bill">
                  <IoReceiptOutline size={24} />
                </Link>

                <Link to="/EditList" className="menu-item edit-list">
                  <IoPersonCircleOutline size={24} />
                </Link>

                <label className="menu-item theme-toggle"
                 onClick={() => {
                  toggleTheme();}}>
                  <IoInvertModeSharp size={24} />
                </label>

                <Link to="/Settings" className="menu-item settings">
                  <IoSettingsOutline size={24} />
                </Link>
              </div>
            </div>
          </div>

          <Footer theme={theme} lang={lang} />
        </main>
      </div>
    </>
  );
}
