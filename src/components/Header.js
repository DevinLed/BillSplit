import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import {
  IoArrowBackCircleOutline, IoArrowBackCircleSharp
} from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import App from "../App";

import "../darkMode.css";
export default function Header({
  startBill,
  showHistory,
  showSettings,
  selectPersonReceipt,
  selectPersonList,
  selectEditPersonList,
  selectMethodManual,
  selectMethodPicture,
  handleResetTotals,
  theme,
  lang,
  setLang
}) {
  return (
    <>
      {startBill ? (
      <div className="mt-5 flex flex-col items-center justify-center h-24 ">
      <header className="xs:flex-row xs:justify-center mr-3 mb-5 flex flex-col items-center text-2xl md:flex-row md:justify-center xl:flex-row xl:justify-center">
        <h1 className="text-4xl font-bold text-white mb-4 animate-pulse">
          <span className={theme === "dark" ? "bg-gradient-to-r  from-white via-gray-200 to-blue-300 text-transparent bg-clip-text": "bg-gradient-to-r from-gray-900 via-blue-800 to-black text-transparent bg-clip-text"}>
            Divvy
          </span>
        </h1>
      </header>
    </div>
      ) : (
        ""
      )}
      {selectPersonList ? (
        <>
          <div
            className="align-items-center mb-5 flex h-10 w-full items-center items-stretch justify-between border-t-2 border-b-2 text-2xl font-bold "
            id="headbar"
          >
            <Link to="/Home">
              <button className="ml-2 text-black hover:text-black">
                <IoIosArrowBack />
              </button>
            </Link>

            <h1 className="whitespace-nowrap">{lang === "english" ? "Select Person" : "Choisissez la personne"}</h1>

            <div className="dropdown">
              <button
                align="end"
                className="right-0 mr-2 text-black hover:text-black "
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <AiOutlineMenu />
              </button>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenu2"
              >
                <Link to="/EditList">
                  <button className={theme === "dark" ? "dropdown-item bg-gray-900 text-white hover:bg-gray-800":"dropdown-item"}>{lang === "english" ? "Edit Person" : "Modifier la personne"}</button>
                </Link>
                <Link to="/History">
                  <button className="dropdown-item" type="button">
                  {lang === "english" ? "History" : "Histoire"}
                  </button>
                </Link>
                
                <Link to="/Settings">
                  <button className="dropdown-item">
                  {lang === "english" ? "Settings" : "Paramètres"}</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {selectEditPersonList ? (
        <>
          <div
            className="align-items-center mb-5 flex h-10 w-full items-center items-stretch justify-between border-t-2 border-b-2 text-2xl font-bold "
            id="headbar"
          >
            <Link to="/Home">
              <button className="ml-2 text-black hover:text-black">
                <IoIosArrowBack />
              </button>
            </Link>

            <h1 className="whitespace-nowrap">{lang === "english" ? "Edit Person" : "Modifier la personne"}</h1>

            <div className="dropdown">
              <button
                className="mr-2 text-black hover:text-black"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <AiOutlineMenu />
              </button>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenu2"
              >
                <Link to="/SplitBill">
                  <button className="dropdown-item">{lang === "english" ? "New Receipt" : "Nouveau reçu"}</button>
                </Link>
                <Link to="/History">
                  <button className="dropdown-item">{lang === "english" ? "History" : "Histoire"}</button>
                </Link>
                
                <Link to="/Settings">
                  <button className="dropdown-item"> {lang === "english" ? "Settings" : "Paramètres"}</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {selectPersonReceipt ? (
        <div
          className="align-items-center mb-5 flex h-10 w-full items-center items-stretch justify-between border-t-2 border-b-2 text-2xl font-bold "
          id="headbar"
        >
          <Link to="/SplitBIll">
            <button className="ml-2 text-black hover:text-black">
              <IoIosArrowBack />
            </button>
          </Link>
          <h1 className="whitespace-nowrap">{lang === "english" ? "Select a Method" : "Sélectionnez une méthode"}</h1>

          <div className="dropdown">
            <button
              className="mr-2 text-black hover:text-black"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <AiOutlineMenu />
            </button>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenu2"
            >
              <Link to="/SplitBill">
                <button className="dropdown-item">{lang === "english" ? "New Receipt" : "Nouveau reçu"}</button>
              </Link>
              <Link to="/EditList">
                <button className="dropdown-item">{lang === "english" ? "Edit Person" : "Modifier la personne"}</button>
              </Link>

              <Link to="/History">
                <button className="dropdown-item">{lang === "english" ? "History" : "Histoire"}</button>
              </Link>
              
              <Link to="/Settings">
                  <button className="dropdown-item">{lang === "english" ? "Settings" : "Paramètres"}</button>
                </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {selectMethodManual ? (
        <div
          className="align-items-center mb-2 flex h-10 w-full items-center items-stretch justify-between border-t-2 border-b-2 text-2xl font-bold "
          id="headbar"
        >
          <Link to="/SplitBill">
            <button
              className="ml-2 text-black hover:text-black "
              onClick={() => handleResetTotals()}
            >
              <IoIosArrowBack />
            </button>
          </Link>
          <h1 className="whitespace-nowrap">{lang === "english" ? "Enter Details" : "Entrez les détails"}</h1>

          <div className="dropdown">
            <button
              className="mr-2 text-black hover:text-black"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <AiOutlineMenu />
            </button>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenu2"
            >
              <Link to="/SplitBill">
                <button className="dropdown-item">{lang === "english" ? "New Receipt" : "Nouveau reçu"}</button>
              </Link>
              <Link to="/EditList">
                <button className="dropdown-item">{lang === "english" ? "Edit Person" : "Modifier la personne"}</button>
              </Link>

              <Link to="/History">
                <button className="dropdown-item">{lang === "english" ? "History" : "Histoire"}</button>
              </Link>
              
              <Link to="/Settings">
                  <button className="dropdown-item">{lang === "english" ? "Settings" : "Paramètres"}</button>
                </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {selectMethodPicture ? (
        <div
          className="align-items-center mb-5 flex h-10 w-full items-center items-stretch justify-between border-t-2 border-b-2 text-2xl font-bold "
          id="headbar"
        >
          <Link to="/SplitBill">
            <button
              className="ml-2 text-black hover:text-black"
              onClick={(e) => handleResetTotals(e)}
            >
              <IoIosArrowBack />
            </button>
          </Link>
          <h1 className="whitespace-nowrap">{lang === "english" ? "Upload Picture" : "Charger une photo"}</h1>

          <div className="dropdown">
            <button
              className="mr-2 text-black hover:text-black"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <AiOutlineMenu />
            </button>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenu2"
            >
              <Link to="/SplitBill">
                <button className="dropdown-item">{lang === "english" ? "New Receipt" : "Nouveau reçu"}</button>
              </Link>
              <Link to="/EditList">
                <button className="dropdown-item">{lang === "english" ? "Edit Person" : "Modifier la personne"}</button>
              </Link>

              <Link to="/History">
                <button className="dropdown-item">{lang === "english" ? "History" : "Histoire"}</button>
              </Link>
              
              <Link to="/Settings">
                  <button className="dropdown-item">{lang === "english" ? "Settings" : "Paramètres"}</button>
                </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
            {showSettings ? (
        <>
          <div
            className="align-items-center mb-5 flex h-10 w-full items-center items-stretch justify-between border-t-2 border-b-2 text-2xl font-bold "
            id="headbar"
          >
            <Link to="/Home">
              <button className="ml-2 text-black hover:text-black">
                <IoIosArrowBack />
              </button>
            </Link>
            <h1 className="whitespace-nowrap">{lang === "english" ? "Settings" : "Paramètres"}</h1>
            <div className="dropdown">
              <button
                className="mr-2 text-black hover:text-black"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <AiOutlineMenu />
              </button>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenu2"
              >
                <Link to="/SplitBill">
                  <button className="dropdown-item">{lang === "english" ? "New Receipt" : "Nouveau reçu"}</button>
                </Link>
                <Link to="/EditList">
                  <button className="dropdown-item">{lang === "english" ? "Edit Person" : "Modifier la personne"}</button>
                </Link>
                <Link to="/History">
                <button className="dropdown-item">{lang === "english" ? "History" : "Histoire"}</button>
              </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {showHistory ? (
        <>
          <div
            className="align-items-center mb-5 flex h-10 w-full items-center items-stretch justify-between border-t-2 border-b-2 text-2xl font-bold "
            id="headbar"
          >
            <Link to="/Home">
              <button className="ml-2 text-black hover:text-black">
                <IoIosArrowBack />
              </button>
            </Link>
            <h1 className="whitespace-nowrap">{lang === "english" ? "History" : "Histoire"}</h1>
            <div className="dropdown">
              <button
                className="mr-2 text-black hover:text-black"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <AiOutlineMenu />
              </button>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenu2"
              >
                <Link to="/SplitBill">
                  <button className="dropdown-item">{lang === "english" ? "New Receipt" : "Nouveau reçu"}</button>
                </Link>
                <Link to="/EditList">
                  <button className="dropdown-item">{lang === "english" ? "Edit Person" : "Modifier la personne"}</button>
                </Link>
                <Link to="/Settings">
                  <button className="dropdown-item">{lang === "english" ? "Settings" : "Paramètres"}</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
