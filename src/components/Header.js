import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { Route, Routes, Link } from "react-router-dom";

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
  selectMethodManual
}) {
  return (
    <>
      {startBill ? (
        <header className="mr-3 flex flex-col items-center text-2xl font-bold mb-5 xs:flex-row xs:justify-center md:flex-row md:justify-center xl:flex-row xl:justify-center">
          <h1>Bill Splitter</h1>
        </header>
      ) : (
        ""
      )}
      {selectPersonList ? (
        <>
          <div className="flex items-stretch font-bold bg-gray-200 h-10 align-items-center w-full items-center text-2xl mb-5 justify-between">
            <Link to="/Home">
              <button className="text-black hover:text-black ml-2">
                <IoIosArrowBack />
              </button>
            </Link>

            <h1 className="ml-2 mr-2">Select Person</h1>

            <div class="dropdown">
              <button 
                align="end"
                className="text-black hover:text-black mr-2 right-0 "
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <AiOutlineMenu />
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <Link to="/EditList">
                  <button class="dropdown-item">Edit Person</button>
                </Link>
                <Link to="/History">
                  <button class="dropdown-item" type="button">
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
          <div className="flex items-stretch font-bold bg-gray-200 h-10 align-items-center w-full items-center text-2xl mb-5 justify-between">
            <Link to="/Home">
              <button className="text-black hover:text-black ml-2">
                <IoIosArrowBack />
              </button>
            </Link>

            <h1 className="m-5">Edit Person</h1>

            <div class="dropdown">
              <button
                className="text-black hover:text-black mr-2"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <AiOutlineMenu />
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <Link to="/SplitBill">
                  <button class="dropdown-item">New Receipt</button>
                </Link>
                <Link to="/History">
                  <button class="dropdown-item">History</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {selectPersonReceipt ? (
        <div className="flex items-stretch font-bold bg-gray-200 h-10 align-items-center w-full items-center text-2xl mb-5 justify-between">
          <Link to="/SplitBIll">
            <button className="text-black hover:text-black ml-2">
              <IoIosArrowBack />
            </button>
          </Link>
          <h1 className="m-5">Select a method</h1>

          <div class="dropdown">
            <button
              className="text-black hover:text-black mr-2"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <AiOutlineMenu />
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <Link to="/SplitBill">
                <button class="dropdown-item">New Receipt</button>
              </Link>
              <Link to="/EditList">
                <button class="dropdown-item">Edit Person</button>
              </Link>

              <Link to="/History">
                <button class="dropdown-item">History</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      
      {selectMethodManual ? (
        <div className="flex items-stretch font-bold bg-gray-200 h-10 align-items-center w-full items-center text-2xl mb-5 justify-between">
          <Link to="/SplitBill">
            <button className="text-black hover:text-black ml-2">
              <IoIosArrowBack />
            </button>
          </Link>
          <h1 className="m-5">Enter Receipt Details</h1>

          <div class="dropdown">
            <button
              className="text-black hover:text-black mr-2"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <AiOutlineMenu />
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <Link to="/SplitBill">
                <button class="dropdown-item">New Receipt</button>
              </Link>
              <Link to="/EditList">
                <button class="dropdown-item">Edit Person</button>
              </Link>

              <Link to="/History">
                <button class="dropdown-item">History</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {showHistory ? (
        <>
          <div className="flex items-stretch font-bold bg-gray-200 h-10 align-items-center w-full items-center text-2xl mb-5 justify-between">
            <Link to="/Home">
              <button className="text-black hover:text-black ml-2">
                <IoIosArrowBack />
              </button>
            </Link>
            <h1 className="m-5">History</h1>
            <div class="dropdown">
              <button
                className="text-black hover:text-black mr-2"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <AiOutlineMenu />
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <Link to="/SplitBill">
                  <button class="dropdown-item">New Receipt</button>
                </Link>
                <Link to="/EditList">
                  <button class="dropdown-item">Edit Person</button>
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
