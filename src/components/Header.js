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
      {showPersonEdit ? (
        <>
          <div className="flex items-stretch font-bold bg-gray-200 h-10 align-items-center w-full items-center text-2xl mb-5 justify-between">
            <button
              className="text-black hover:text-black ml-2"
              onClick={() => {
                setStartBill(true);
                setPersonEdit(false);
              }}
            >
              <Link to="/Home"></Link>
              <IoIosArrowBack />
            </button>

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
                <button
                  onClick={() => {
                    setSelectPersonEdit(true);
                    setPersonEdit(false);
                  }}
                  class="dropdown-item"
                >
                  Edit Person
                </button>
                <button
                  onClick={() => {
                    setHistory(true);
                    setPersonEdit(false);
                    setSelectPersonEdit(false);
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
        </>
      ) : (
        ""
      )}

      {selectPersonEdit ? (
        <>
          <div className="flex items-stretch font-bold bg-gray-200 h-10 align-items-center w-full items-center text-2xl mb-5 justify-between">
            <button
              className="text-black hover:text-black ml-2"
              onClick={() => {
                setStartBill(true);
                setSelectPersonEdit(false);
              }}
            >
              <Link to="/Home"></Link>
              <IoIosArrowBack />
            </button>
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
                <button
                  onClick={() => {
                    setPersonEdit(true);
                    setSelectPersonEdit(false);
                  }}
                  class="dropdown-item"
                >
                  New Receipt
                </button>
                <button
                  onClick={() => {
                    setSelectPersonEdit(false);
                    setHistory(true);
                  }}
                  class="dropdown-item"
                  type="button"
                >
                  History
                </button>
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
              </button>
              <button
                onClick={() => {
                  setSelectPersonEdit(true);
                  setSelectPersonReceipt(false);
                }}
                class="dropdown-item"
                type="button"
              >
                Edit Person
              </button>
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
            
              <button
                className="text-black hover:text-black ml-2"
                onClick={() => {
                  setStartBill(true);
                  setHistory(false);
                }}
              ><Link to="/Home"></Link>
                <IoIosArrowBack />
              </button>
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
                <button
                  onClick={() => {
                    setPersonEdit(true);
                    setHistory(false);
                  }}
                  class="dropdown-item"
                >
                  New Receipt
                </button>
                <button
                  onClick={() => {
                    setSelectPersonEdit(true);
                    setHistory(false);
                  }}
                  class="dropdown-item"
                  type="button"
                >
                  Edit Person
                </button>
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
