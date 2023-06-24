import React, { useRef, useState, useEffect } from "react"; 
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { Route, Routes, Link } from "react-router-dom";

import "../darkMode.css";
export default function Header({
  startBill,
  setStartBill,
  showPersonEdit,
  setPersonEdit,
  selectPersonEdit,
  setSelectPersonEdit,
  setHistory,
  showHistory,
  selectPersonReceipt,
  setSelectPersonReceipt,
  selectPersonList,
  selectEditPersonList,
  selectMethodManual,
  selectMethodPicture,
  resetReceiptForm,
  resetValues,
  handleResetTotals
}) {
  return (
    <>
      {startBill ? (
        <header className="xs:flex-row xs:justify-center mr-3 mb-5 flex flex-col items-center text-2xl font-bold md:flex-row md:justify-center xl:flex-row xl:justify-center">
          <h1>Bill Splitter</h1>
        </header>
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

            <h1 className="ml-2 mr-2">Select Person</h1>

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
                  <button className="dropdown-item">Edit Person</button>
                </Link>
                <Link to="/History">
                  <button className="dropdown-item" type="button">
                    History
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
            <Link to="/Home">
              <button className="ml-2 text-black hover:text-black" >
                <IoIosArrowBack />
              </button>
            </Link>

            <h1 class="m-5">Edit Person</h1>

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
                  <button className="dropdown-item">New Receipt</button>
                </Link>
                <Link to="/History">
                  <button className="dropdown-item">History</button>
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
          <h1 className="m-5">Select a method</h1>

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
                <button className="dropdown-item">New Receipt</button>
              </Link>
              <Link to="/EditList">
                <button className="dropdown-item">Edit Person</button>
              </Link>

              <Link to="/History">
                <button className="dropdown-item">History</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {selectMethodManual ? (
        <div
          className="align-items-center mb-5 flex h-10 w-full items-center items-stretch justify-between border-t-2 border-b-2 text-2xl font-bold "
          id="headbar"
        >
          <Link to="/SplitBill">
            <button className="ml-2 text-black hover:text-black " onClick={() => handleResetTotals()}>
              <IoIosArrowBack />
            </button>
          </Link>
          <h1 className="m-5">Enter Details</h1>

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
                <button className="dropdown-item">New Receipt</button>
              </Link>
              <Link to="/EditList">
                <button className="dropdown-item">Edit Person</button>
              </Link>

              <Link to="/History">
                <button className="dropdown-item">History</button>
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
            <button className="ml-2 text-black hover:text-black" onClick={(e) => handleResetTotals(e)}>
              <IoIosArrowBack />
            </button>
          </Link>
          <h1 className="m-5">Upload Picture</h1>

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
                <button className="dropdown-item">New Receipt</button>
              </Link>
              <Link to="/EditList">
                <button className="dropdown-item">Edit Person</button>
              </Link>

              <Link to="/History">
                <button className="dropdown-item">History</button>
              </Link>
            </div>
          </div>
        </div>
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
            <h1 className="m-5">History</h1>
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
                  <button className="dropdown-item">New Receipt</button>
                </Link>
                <Link to="/EditList">
                  <button className="dropdown-item">Edit Person</button>
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
