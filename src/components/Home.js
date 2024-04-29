import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../darkMode.css";
import "../index.css";
import {
  IoReceiptOutline,
  IoPersonCircleOutline,
  IoSettingsOutline,
  IoPerson,
} from "react-icons/io5";
import { Button } from "@material-tailwind/react";
import "@aws-amplify/ui-react/styles.css";

import { Amplify } from "aws-amplify";

import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

export default function Home({
  theme,
  toggleTheme,
  lang,
  setLang,
  signOut,
  user,
  loggedInUserEmail,
  dataThrow,
  selfExpense,
}) {
  const [startBill, setStartBill] = useState(true);
  const [showPersonEdit, setPersonEdit] = useState(false);
  const [selectPersonEdit, setSelectPersonEdit] = useState(false);
  const [totalOwing, setTotalOwing] = useState(0);
  const [totalOwed, setTotalOwed] = useState(0);
  useEffect(() => {
    let owingTotal = 0;
    let owedTotal = 0;

    dataThrow.forEach((item) => {
      if (
        item.UserEmail === loggedInUserEmail &&
        item.Email !== loggedInUserEmail
      ) {
        if (parseFloat(item.Owing) > 0) {
          owingTotal += parseFloat(item.Owing);
        } else if (parseFloat(item.Owing) < 0) {
          owedTotal += parseFloat(item.Owing);
        }
      }
    });

    setTotalOwing(owingTotal);
    setTotalOwed(owedTotal);
  }, [dataThrow, loggedInUserEmail]);

  useEffect(() => {
    setStartBill(true);
    setPersonEdit(false);
    setSelectPersonEdit(false);
    setLang(lang);
  }, [lang, setLang]);
  const owingPercentage =
    (totalOwing / (totalOwing + Math.abs(totalOwed))) * 100;
  const owedPercentage =
    (Math.abs(totalOwed) / (totalOwing + Math.abs(totalOwed))) * 100;
  const navigate = useNavigate();
  const CircleMenu = ({ lang }) => {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Link to="/App/SplitBill" className="w-full">
          <Button
            variant="gradient"
            className="gradient-btn mb-2 flex items-center justify-center glow"
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
        <Link
          to={{
            pathname: "/App/SelfExpense",
            state: { selfExpense: selfExpense },
          }}
          className="w-full"
        >
          <Button
            variant="gradient"
            className="gradient-btn mb-2 flex items-center justify-center"
            style={{ margin: "auto" }}
          >
            <div className="flex items-center">
              <IoPerson size={24} />
              <span className="text-white ml-2">
                {lang === "english" ? "Self Expense" : "Dépense Personnelle"}
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
              <div
                style={{ paddingBottom: "4%" }}
                onClick={() => navigate("/App/SplitBill")}
                className="cursor-pointer"
              >
                <svg viewBox="0 0 100 100" width="200" height="200">
                  <defs>
                    <filter
                      id="glow-path"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="0"
                        stdDeviation="4"
                        floodColor="#64b5f6"
                      />
                    </filter>
                    <filter
                      id="glow-trail"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="0"
                        stdDeviation="4"
                        floodColor="#ffb74d"
                      />
                    </filter>
                  </defs>

                  {totalOwing === 0 && totalOwed === 0 ? (
                    <>
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        fill={theme === "dark" ? "white" : "black"}
                        fontSize="8"
                        style={{ filter: "url(#glow-path)" }}
                      >
                        {lang === "english"
                          ? "Welcome To Divvy"
                          : "Bienvenue chez Divvy"}
                      </text>

                      <text
                        x="50%"
                        y="60%"
                        textAnchor="middle"
                        fill={theme === "dark" ? "white" : "black"}
                        fontSize="8"
                        style={{ filter: "url(#glow-trail)" }}
                      ></text>
                    </>
                  ) : (
                    <>
                      <text
                        x="50%"
                        y="40%"
                        textAnchor="middle"
                        fill={theme === "dark" ? "white" : "black"}
                        fontSize="8"
                        style={{ filter: "url(#glow-path)" }}
                      >
                        {lang === "english" ? "Owed" : "Dû"}: $
                        {totalOwing.toFixed(2)}
                      </text>
                      <text
                        x="50%"
                        y="60%"
                        textAnchor="middle"
                        fill={theme === "dark" ? "white" : "black"}
                        fontSize="8"
                        style={{ filter: "url(#glow-trail)" }}
                      >
                        {lang === "english" ? "Owing" : "Due"}: $
                        {Math.abs(totalOwed).toFixed(2)}
                      </text>
                    </>
                  )}
                  <CircularProgressbar
                    value={owingPercentage}
                    styles={buildStyles({
                      textSize: "16px",
                      pathColor: "#64b5f6",
                      trailColor: "#ffb74d",
                      pathTransitionDuration: 0.5,
                      pathTransition: "none",
                      trailWidth: 8,
                      filter: "url(#glow-trail)",
                    })}
                  />
                </svg>
              </div>

              <CircleMenu lang={lang} toggleTheme={() => toggleTheme()} />
            </div>
          </div>

          <Footer theme={theme} lang={lang} />
        </main>
      </div>
    </>
  );
}
