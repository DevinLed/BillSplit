import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import Dropdown from "./Dropdown"

export default function Header({
  startBill,
  setStartBill,
  showPersonEdit,
  setPersonEdit,
  setSelectPersonEdit,
  setGroupEdit,
  groupEdit,
  setHistory,
  showHistory,
}) {

  const options = [
    {label: "New Receipt"},
    {label: "Edit Person"},
    {label: "Edit Group"},
    {label: "Update App"}
  ];

  
  return (
    <>
      {startBill ? (
        <header className="mr-3 flex flex-col items-center text-2xl font-bold mb-5 xs:flex-row xs:justify-center md:flex-row md:justify-center xl:flex-row xl:justify-center">
          <h1>
            Bill Splitter
          </h1>
        </header>
      ) : (
        ""
      )}
      {showPersonEdit ? (
        <>
          <div className="flex items-stretch font-bold bg-gray-200 h-10 align-items-center w-full items-center text-2xl mb-5 justify-between">
            <button className="text-black hover:text-black ml-2"
              onClick={() => {
                setStartBill(true);
                setPersonEdit(false);
              }}
            > 
              <IoIosArrowBack />
            </button>
            <h1 className="ml-2 mr-2">Select Person or Group</h1>
            <button className="text-black hover:text-black mr-2"><AiOutlineMenu /><selector></selector></button>
          </div>
        </>
      ) : (
        ""
      )}

      {setSelectPersonEdit ? (
        <>
          <div className="flex items-stretch font-bold bg-gray-200 h-10 align-items-center w-full items-center text-2xl mb-5 justify-between">
            <button className="text-black hover:text-black ml-2"
              onClick={() => {
                setStartBill(true);
                setSelectPersonEdit(false);
              }}
            >
              <IoIosArrowBack />
            </button>
            <h1 className="m-5">Edit Person</h1>
            <button className="text-black hover:text-black mr-2"><AiOutlineMenu /></button>
          </div>
        </>
      ) : (
        ""
      )}
      {groupEdit ? (
        <>
          <div className="flex items-stretch font-bold bg-gray-200 h-10 align-items-center w-full items-center text-2xl mb-5 justify-between">
            <button className="text-black hover:text-black ml-2"
              onClick={() => {
                setStartBill(true);
                setGroupEdit(false);
              }}
            >
              <IoIosArrowBack />
            </button>
            <h1 className="m-5">Edit a group</h1>
            <button className="text-black hover:text-black mr-2"><AiOutlineMenu /></button>
          </div>
        </>
      ) : (
        ""
      )}
      {showHistory ? (
        <>
          <div className="flex items-stretch font-bold bg-gray-200 h-10 align-items-center w-full items-center text-2xl mb-5 justify-between">
            <button className="text-black hover:text-black ml-2"
              onClick={() => {
                setStartBill(true);
                setHistory(false);
              }}
            >
              <IoIosArrowBack />
            </button>
            <h1 className="m-5">History</h1>
            <button className="text-black hover:text-black mr-2"><AiOutlineMenu /></button>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
