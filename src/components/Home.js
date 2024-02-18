import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../darkMode.css";
import "../index.css";
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
  loggedInUserEmail,
  dataThrow,
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
  const CircleMenu = ({ lang, toggleTheme, buttonText }) => {
    const radius = 120;
    const startOffsetPercentage = 50;

    return (
      <div className="circle-menu">
        <Link
          to="/App/SplitBill"
          className={
            theme === "dark"
              ? "menu-item split-billdark"
              : "menu-item split-bill"
          }
        >
          <svg viewBox="0 0 100 100" className="curved-text-svg">
            <path
              id="splitBillCurve"
              fill="none"
              d={`M50,10 A${radius},${radius} 0 0,1 90,50`}
              transform="rotate(-87, 50, 50)"
            />

            <text
              fontSize="14"
              style={{ fill: theme === "dark" ? "white" : "black" }}
            >
              <textPath
                xlinkHref="#splitBillCurve"
                startOffset={`${startOffsetPercentage}%`}
                textAnchor="middle"
                className={
                  theme === "dark" ? "textMainMenudark" : "textMainMenu"
                }
              >
                {lang === "english" ? "Share Bill" : "Partagez"}
              </textPath>
            </text>
          </svg>
          <IoReceiptOutline size={24} className="icon" />
        </Link>

        <Link
          to="/App/EditList"
          className={
            theme === "dark" ? "menu-item edit-listdark" : "menu-item edit-list"
          }
        >
          <svg viewBox="0 0 100 100" className="curved-text-svg">
            <path
              id="editListCurve"
              fill="none"
              d={`M90,50 A${radius + 0.5},${radius + 0.5} 0 0,1 50,90`}
              transform="rotate(-93, 50, 50)"
            />
            <text
              fontSize="16"
              style={{ fill: theme === "dark" ? "white" : "black" }}
            >
              <textPath
                xlinkHref="#editListCurve"
                startOffset={`${startOffsetPercentage}%`}
                textAnchor="middle"
              >
                Contacts
              </textPath>
            </text>
          </svg>
          <IoPersonCircleOutline size={24} className="icon2" />
        </Link>

        <label
          onClick={() => {
            toggleTheme();
            if (theme === "light") {
              changeText(lang === "english" ? "Light" : "Lumière");
            } else {
              changeText(lang === "english" ? "Dark" : "Sombre");
            }
          }}
          className={
            theme === "dark"
              ? "menu-item theme-toggledark"
              : "menu-item theme-toggle"
          }
        >
          <IoInvertModeSharp size={24} className="icon3" />
          <svg viewBox="0 0 100 100" className="curved-text-svg">
            <path
              id="themeToggleCurveAdjusted"
              fill="none"
              d={`M-5,50 A${radius * 1.1},${radius * 1.1} 0 0,0 50,103`}
              transform="rotate(0,50,50)"
            />
            <text
              fontSize="16"
              style={{ fill: theme === "dark" ? "white" : "black" }}
            >
              <textPath
                xlinkHref="#themeToggleCurveAdjusted"
                startOffset={`${startOffsetPercentage}%`}
                textAnchor="middle"
              >
                {buttonText}
              </textPath>
            </text>
          </svg>
        </label>

        <Link
          to="/App/Settings"
          className={
            theme === "dark" ? "menu-item settingsdark" : "menu-item settings"
          }
        >
          <IoSettingsOutline size={24} className="icon4" />
          <svg viewBox="0 0 100 100" className="curved-text-svg">
            <path
              id="settingsCurveFlipped"
              fill="none"
              d={`M50,10 A${radius + 0.5},${radius + 0.5} 0 0,0 10,50`}
              transform="rotate(182, 54, 54)"
            />
            <text
              fontSize="16"
              style={{ fill: theme === "dark" ? "white" : "black" }}
            >
              <textPath
                xlinkHref="#settingsCurveFlipped"
                startOffset="50%"
                textAnchor="middle"
                method="stretch"
                spacing="auto"
              >
                {lang === "english" ? "Settings" : "Paramètres"}
              </textPath>
            </text>
          </svg>
        </Link>
      </div>
    );
  };

  // For Dark/Bright mode. Keeps mode storage for page refresh.
  const [buttonText, setButtonText] = useState(
    lang === "english" ? "Dark" : "Sombre"
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
console.log("dataThrow:",dataThrow);
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
        if (index >= 0 && index < dataThrow.length) {
          return dataThrow[index].Name;
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
        ticks: {
          color: theme === 'dark' ? 'white' : 'black',
        }
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          callback: yAxisCallback,
          color: theme === 'dark' ? 'white' : 'black',
        },
      },
    },
    plugins: {title: {
      display: true,
      text: lang === "english" ? "Current Balances" : "Soldes actuels",
      font: {
        size: 16,
        weight: 'bold',
      },
      color: theme === 'dark' ? 'white' : 'black', 
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
          color: theme === 'dark' ? 'white' : 'black',
        },
        bodyFont: {
          weight: "normal",
          color: theme === 'dark' ? 'white' : 'black',
        },
      },
    },
  };
  
  useEffect(() => {
    if (dataThrow && dataThrow.length > 0) {
      const filteredData = dataThrow.filter(item => item.UserEmail === loggedInUserEmail);
  
      const labels = filteredData.map(item => item.Name);
      const data = filteredData.map(item => item.Owing);
  
      setChartData(prevState => ({
        ...prevState,
        labels,
        datasets: [{
          ...prevState.datasets[0],
          data,
        }],
      }));
    }
  }, [dataThrow, loggedInUserEmail]);
  

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
              /><div style={{ paddingBottom: '10%' }}>
              {chartData.labels.length > 0 ? (
                <Bar data={chartData} options={chartOptions} />
              ) : (
                ""
              )}
            </div>

              <CircleMenu
                lang={lang}
                toggleTheme={() => toggleTheme()}
                buttonText={buttonText}
              />
            </div>
          </div>

          <Footer theme={theme} lang={lang} />
        </main>
      </div>
    </>
  );
}
