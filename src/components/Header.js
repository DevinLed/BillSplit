import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import {
  IoArrowBackCircleOutline,
  IoArrowBackCircleSharp,
} from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import App from "../App";

import "../darkMode.css";
export default function Header({
  personName,
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
  setLang,
  signOut,
  user,
  loggedInUsername,
}) {
  return (
    <>
      {startBill ? (
        <div>
          <div className="dropdown my-custom-dropdown">
            <button
              className={`${
                theme === "dark"
                  ? "right-0 mr-2 text-black hover:text-black accountmenudark"
                  : "right-0 mr-2 text-black hover:text-black accountmenu"
              } mt-2`}
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <AiOutlineMenu />
            </button>
            <div
              className="dropdown-menu dropdown-menu-right my-custom-dropdown-menu"
              aria-labelledby="dropdownMenuButton"
            >
              <h6 className="dropdown-header my-custom-dropdown-header">
                {user.attributes.name}
              </h6>

              <button
                className={`my-custom-dropdown-item ${theme === "dark" ? "dark-button" : "light-button"}`}
                onClick={signOut}
              >
                {lang === "english" ? "Sign Out" : "Se Déconnecter"}
              </button>
            </div>
          </div>

          <div className="mt-2 flex flex-col items-center justify-center mb-4">
            <header className="xs:flex-row xs:justify-center mr-3 flex flex-col items-center text-2xl md:flex-row md:justify-center xl:flex-row xl:justify-center">
              <h1 className="text-6xl font-bold text-white h-auto animate-pulse">
                <span
                  className={
                    theme === "dark"
                      ? "bg-gradient-to-r from-white via-gray-200 to-blue-300 text-transparent bg-clip-text"
                      : "bg-gradient-to-r from-gray-900 via-blue-800 to-black text-transparent bg-clip-text"
                  }
                >
                  Divvy
                </span>
              </h1>
            </header>
          </div>
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
            <Link to="/App/Home">
              <button className="ml-2 text-black hover:text-black">
                <IoIosArrowBack />
              </button>
            </Link>

            <h1 className="whitespace-nowrap">
              {lang === "english" ? "Select Person" : "Choisissez la personne"}
            </h1>

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
                <Link to="/App/EditList">
                  <button
                    className={
                      theme === "dark"
                        ? "dropdown-item bg-gray-900 text-white hover:bg-gray-800"
                        : "dropdown-item"
                    }
                  >
                    {lang === "english"
                      ? "Edit Person"
                      : "Modifier la personne"}
                  </button>
                </Link>

                <Link to="/App/Settings">
                  <button className="dropdown-item">
                    {lang === "english" ? "Settings" : "Paramètres"}
                  </button>
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
            <Link to="/App/Home">
              <button className="ml-2 text-black hover:text-black">
                <IoIosArrowBack />
              </button>
            </Link>

            <h1 className="whitespace-nowrap">
              {lang === "english" ? "Edit Person" : "Modifier la personne"}
            </h1>

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
                <Link to="/App/SplitBill">
                  <button className="dropdown-item">
                    {lang === "english" ? "New Receipt" : "Nouveau reçu"}
                  </button>
                </Link>

                <Link to="/App/Settings">
                  <button className="dropdown-item">
                    {" "}
                    {lang === "english" ? "Settings" : "Paramètres"}
                  </button>
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
          <Link to="/App/SplitBIll">
            <button className="ml-2 text-black hover:text-black">
              <IoIosArrowBack />
            </button>
          </Link>
          <h1 className="whitespace-nowrap">
            {lang === "english"
              ? "Select a Method"
              : "Sélectionnez une méthode"}
          </h1>

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
              <Link to="/App/SplitBill">
                <button className="dropdown-item">
                  {lang === "english" ? "New Receipt" : "Nouveau reçu"}
                </button>
              </Link>
              <Link to="/App/EditList">
                <button className="dropdown-item">
                  {lang === "english" ? "Edit Person" : "Modifier la personne"}
                </button>
              </Link>

              <Link to="/App/Settings">
                <button className="dropdown-item">
                  {lang === "english" ? "Settings" : "Paramètres"}
                </button>
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
          <Link to="/App/SplitBill">
            <button
              className="ml-2 text-black hover:text-black "
              onClick={() => handleResetTotals()}
            >
              <IoIosArrowBack />
            </button>
          </Link>
          {personName === loggedInUsername ? (
            <h1 className="whitespace-nowrap">
              {lang === "english"
                ? "Expense with yourself"
                : "Dépense avec toi-même"}
            </h1>
          ) : (
            <h1 className="whitespace-nowrap">
              {lang === "english"
                ? "Expense with " + personName
                : "Dépense avec " + personName}
            </h1>
          )}

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
              <Link to="/App/SplitBill">
                <button className="dropdown-item">
                  {lang === "english" ? "New Receipt" : "Nouveau reçu"}
                </button>
              </Link>
              <Link to="/App/EditList">
                <button className="dropdown-item">
                  {lang === "english" ? "Edit Person" : "Modifier la personne"}
                </button>
              </Link>

              <Link to="/App/Settings">
                <button className="dropdown-item">
                  {lang === "english" ? "Settings" : "Paramètres"}
                </button>
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
          <Link to="/App/SplitBill">
            <button
              className="ml-2 text-black hover:text-black"
              onClick={(e) => handleResetTotals(e)}
            >
              <IoIosArrowBack />
            </button>
          </Link>
          <h1 className="whitespace-nowrap">
            {lang === "english"
              ? "Expense with " + personName
              : "Dépense avec " + personName}
          </h1>

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
              <Link to="/App/SplitBill">
                <button className="dropdown-item">
                  {lang === "english" ? "New Receipt" : "Nouveau reçu"}
                </button>
              </Link>
              <Link to="/App/EditList">
                <button className="dropdown-item">
                  {lang === "english" ? "Edit Person" : "Modifier la personne"}
                </button>
              </Link>

              <Link to="/App/Settings">
                <button className="dropdown-item">
                  {lang === "english" ? "Settings" : "Paramètres"}
                </button>
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
            <Link to="/App/Home">
              <button className="ml-2 text-black hover:text-black">
                <IoIosArrowBack />
              </button>
            </Link>
            <h1 className="whitespace-nowrap">
              {lang === "english" ? "Settings" : "Paramètres"}
            </h1>
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
                <Link to="/App/SplitBill">
                  <button className="dropdown-item">
                    {lang === "english" ? "New Receipt" : "Nouveau reçu"}
                  </button>
                </Link>
                <Link to="/App/EditList">
                  <button className="dropdown-item">
                    {lang === "english"
                      ? "Edit Person"
                      : "Modifier la personne"}
                  </button>
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
            <Link to="/App/Home">
              <button className="ml-2 text-black hover:text-black">
                <IoIosArrowBack />
              </button>
            </Link>
            <h1 className="whitespace-nowrap">
              {lang === "english" ? "History" : "Historique"}
            </h1>
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
                <Link to="/App/SplitBill">
                  <button className="dropdown-item">
                    {lang === "english" ? "New Receipt" : "Nouveau reçu"}
                  </button>
                </Link>
                <Link to="/App/EditList">
                  <button className="dropdown-item">
                    {lang === "english"
                      ? "Edit Person"
                      : "Modifier la personne"}
                  </button>
                </Link>
                <Link to="/App/Settings">
                  <button className="dropdown-item">
                    {lang === "english" ? "Settings" : "Paramètres"}
                  </button>
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
