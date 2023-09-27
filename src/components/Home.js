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

import { CSSTransition } from "react-transition-group";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { Amplify, API, graphqlOperation, Auth } from 'aws-amplify';
import { listUserData } from '../graphql/queries';
import { updateUserData, deleteUserData } from "../graphql/mutations";

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

  useEffect(() => {
    // Function to fetch data from DynamoDB
    async function fetchData() {
      try {
        // Get the currently authenticated user's information
        const user = await Auth.currentAuthenticatedUser();
        const loggedInUsername = user.attributes.email;
        const userData = await API.graphql(
          graphqlOperation(listUserData, {
            limit: 100,
            sortField: "createdAt",
            sortDirection: "DESC",
            filter: {
              email: {
                eq: loggedInUsername,
                
              },
            },
          })
          
        );
        const userDataList = userData.data.listUserData.items;
        // Extract labels and data from userDataList
        const labels = userDataList.map(({ personName }) => personName);
        const data = userDataList.map(({ personOwing }) => personOwing);

        // Update the chartData state with the fetched data
        setChartData({
          ...chartData,
          labels: labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: data,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching User Data", error);
      }
    }

    // Call fetchData to fetch data when the component mounts
    fetchData();
  }, [chartData]); //
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
        <div className="flex items-center justify-center mt-4">
          <Heading
            className={
              theme === "dark"
                ? "text-white text-center"
                : "text-gray-800 text-center"
            }
            level={1}
          >
            {lang === "english" ? "Hello" : "Bonjour"} {user.attributes.nickname}
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
              {/*  Header narrative for the Main Screen + 6 button selection screens */}
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
              <div className="grid grid-cols-3 gap-y-0 gap-x-1 py-4">
                <Link to="/SplitBill" className="mb-0 p-0">
                  <label
                    className={
                      theme === "dark"
                        ? "mb-0 flex h-24 w-full flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
                        : "mb-0 flex h-24 w-full flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
                    }
                  >
                    <div style={{ width: "24px", height: "24px" }}>
                      <IoReceiptOutline size={24} />
                    </div>
                    <span
                      className={
                        theme === "dark"
                          ? "text-white text-center"
                          : "text-gray-800 text-center"
                      }
                    >
                      {lang === "english"
                        ? "Split a Bill"
                        : "Partager la facture"}
                    </span>
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
                    <div style={{ width: "24px", height: "24px" }}>
                      <IoPersonCircleOutline size={24} />
                    </div>
                    <span
                      className={
                        theme === "dark"
                          ? "text-white text-center"
                          : "text-gray-800 text-center"
                      }
                    >
                      {lang === "english"
                        ? "Edit Person"
                        : "Modifier la personne"}
                    </span>
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
                    <div style={{ width: "24px", height: "24px" }}>
                      <IoListOutline size={24} />
                    </div>
                    <span
                      className={
                        theme === "dark"
                          ? "text-white text-center"
                          : "text-gray-800 text-center"
                      }
                    >
                      {lang === "english" ? "History" : "Historique"}
                    </span>
                  </label>
                </Link>
                <label
                  onClick={() => {
                    toggleTheme();
                    if (theme === "light") {
                      changeText(
                        lang === "english" ? "Light Mode" : "Mode Lumière"
                      );
                    } else {
                      changeText(
                        lang === "english" ? "Dark Mode" : "Mode Sombre"
                      );
                    }
                  }}
                  className={
                    theme === "dark"
                      ? "flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
                      : "flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
                  }
                >
                  <div style={{ width: "24px", height: "24px" }}>
                    <IoInvertModeSharp size={24} />
                  </div>
                  <span
                    className={
                      theme === "dark"
                        ? "text-white text-center"
                        : "text-gray-800 text-center"
                    }
                  >
                    {buttonText}
                  </span>
                </label>
                <Link to="/LandingPage">
                  <label
                    className={
                      theme === "dark"
                        ? "flex h-24 w-full flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
                        : "flex h-24 w-full flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
                    }
                  >
                    <div style={{ width: "24px", height: "24px" }}>
                      <IoHomeOutline size={24} />
                    </div>
                    <span
                      className={
                        theme === "dark"
                          ? "text-white text-center"
                          : "text-gray-800 text-center"
                      }
                    >
                      {lang === "english" ? "Home Page" : "Page d'accueil"}
                    </span>
                  </label>
                </Link>
                <Link to="/Settings">
                  <label
                    className={
                      theme === "dark"
                        ? "flex h-24 w-full flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
                        : "flex h-24 w-full flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
                    }
                  >
                    <div style={{ width: "24px", height: "24px" }}>
                      <IoSettingsOutline size={24} />
                    </div>
                    <span
                      className={
                        theme === "dark"
                          ? "text-white text-center"
                          : "text-gray-800 text-center"
                      }
                    >
                      {lang === "english" ? "Settings" : "Paramètres"}
                    </span>
                  </label>
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
