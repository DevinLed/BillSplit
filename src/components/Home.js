import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../darkMode.css";
import "../index.css";
import {
  IoReceiptOutline,
  IoPersonCircleOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { Button } from "@material-tailwind/react";
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
  loggedInUsername,
  dataThrow,
  setDataThrow,
  API_URL,
  handleAddSelfSubmit,
  selectSelf,
  editSelf,
}) {
  const [startBill, setStartBill] = useState(true);
  const [showPersonEdit, setPersonEdit] = useState(false);
  const [selectPersonEdit, setSelectPersonEdit] = useState(false);
  const handlePersonalExpenseClick = async () => {
    const personalExpenseEntry = dataThrow.find(
      (item) =>
        item.UserEmail === loggedInUserEmail && item.Email === loggedInUserEmail
    );

    if (personalExpenseEntry) {
    } else {
      try {
        const owingValue = 0;
        const itemData = {
          Name: loggedInUsername,
          Email: loggedInUserEmail,
          Phone: "5555555555",
          Owing: owingValue,
          UserEmail: loggedInUserEmail,
          UserName: loggedInUsername,
        };

        await handleAddSelfSubmit(itemData);
      } catch (error) {
        console.error("Error creating item:", error);
      }
    }
  };
  useEffect(() => {
    setStartBill(true);
    setPersonEdit(false);
    setSelectPersonEdit(false);
    setLang(lang);
  }, [lang, setLang]);
  
  const CircleMenu = ({ lang }) => {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Link to="/App/SplitBill" className="w-full">
          <Button
            variant="gradient"
            className="gradient-btn mb-2 flex items-center justify-center"
            style={{ margin: "auto" }} 
          >
            <div className="flex items-center">
              <IoReceiptOutline size={24} />
              <span className="text-white ml-2">
                {lang === "english" ? "Split a bill" : "Partagez la note"}
              </span>
            </div>
          </Button>
        </Link>
  
        <Link to="/App/EditList" className="w-full">
          <Button
            variant="gradient"
            className="gradient-btn mb-2 flex items-center justify-center"
            style={{ margin: "auto" }} 
          >
            <div className="flex items-center">
              <IoPersonCircleOutline size={24} />
              <span className="text-white ml-2">
                {lang === "english" ? "Friends" : "Amis"}
              </span>
            </div>
          </Button>
        </Link>
  
        <Link to="/App/Settings" className="w-full">
          <Button
            variant="gradient"
            className="gradient-btn mb-2 flex items-center justify-center"
            style={{ margin: "auto" }}
          >
            <div className="flex items-center">
              <IoSettingsOutline size={24} />
              <span className="text-white ml-2">
                {lang === "english" ? "Settings" : "Réglages"}
              </span>
            </div>
          </Button>
        </Link>
      </div>
    );
  };
  
  const owingPercentage = 50; // Example value, replace with actual value
  const owedPercentage = 70; // Example value, replace with actual value

  return (
    <>
      <div className={`App ${theme}`}>
        <Header
          startBill={startBill}
          showPersonEdit={showPersonEdit}
          selectPersonEdit={selectPersonEdit}
          setSelectPersonEdit={setSelectPersonEdit}
          setPersonEdit={setPersonEdit}
          theme={theme}
          lang={lang}
          signOut={signOut}
          user={user}
        />
        <main
          className={
            "xs:max-w-xl mt-3 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl " +
            (theme === "dark"
              ? "border-2 border-gray-800 lg-rounded bg-gray-650"
              : "bg-white-500 ")
          }
          style={{ maxWidth: "600px", marginTop: "50px" }}
        >
          <div className="marginBottom">
            <div className="flex flex-col items-center justify-center mb-3">
              {/* <div style={{ paddingBottom: "10%" }}>
                <svg
                  viewBox="0 0 100 100"
                  width="200"
                  height="200"
                  style={{ filter: "drop-shadow(0px 0px 10px #f39c12)" }} // Add glow effect
                >
                  <text
                    x="50%"
                    y="40%"
                    textAnchor="middle"
                    fill="white"
                    fontSize="8"
                  >
                    Owing: $205.33
                  </text>
                  <text
                    x="50%"
                    y="60%"
                    textAnchor="middle"
                    fill="white"
                    fontSize="8"
                  >
                    Owed: $50.20
                  </text>
                </svg>
              </div> */}

              <CircleMenu
                lang={lang}
                toggleTheme={() => toggleTheme()}
              />
            </div>
          </div>

          <Footer theme={theme} lang={lang} />
        </main>
      </div>
    </>
  );
}
