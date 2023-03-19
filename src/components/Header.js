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
  selectEditPersonList
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
                <Link to="/EditList">
                <button class="dropdown-item">
                  Edit Person
                </button>
                </Link>
                <Link to="/History">
                <button
                  class="dropdown-item"
                  type="button">
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
                <button class="dropdown-item">
                  New Receipt
                </button>
                </Link>
                <Link to="/History">
                <button class="dropdown-item">
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
      {selectPersonReceipt ? (
        <div className="flex items-stretch font-bold bg-gray-200 h-10 align-items-center w-full items-center text-2xl mb-5 justify-between">
          <button
            className="text-black hover:text-black ml-2"
            onClick={() => {
              setPersonEdit(true);
              setSelectPersonReceipt(false);
            }}
          >
            <Link to="/Home"></Link>
            <IoIosArrowBack />
          </button>
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
              <button
                onClick={() => {
                  setPersonEdit(true);
                  setSelectPersonReceipt(false);
                  setSelectPersonEdit(false);
                }}
                class="dropdown-item"
              >
                New Receipt
              </button><Link to="/EditPerson">
                <button class="dropdown-item">
                  Edit Person
                </button>
                </Link>
              <button
                onClick={() => {
                  setHistory(true);
                  setSelectPersonReceipt(false);
                }}
                class="dropdown-item"
                type="button"
              >
                History
              </button>
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
                <button class="dropdown-item">
                  New Receipt
                </button>
                </Link>
                <Link to="/EditList">
                <button class="dropdown-item">
                  Edit Person
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
