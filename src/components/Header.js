import React from "react";
import { IoIosArrowBack } from "react-icons/io";

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
  return (
    <>
      {startBill ? (
        <header className="flex flex-col items-center text-2xl mb-5 xs:flex-row xs:justify-center md:flex-row md:justify-center xl:flex-row xl:justify-center">
          <h1>
            Bill Splitter
          </h1>
        </header>
      ) : (
        ""
      )}
      {showPersonEdit ? (
        <>
          <div className="flex flex-col items-center text-2xl mb-5 xs:flex-row xs:justify-center md:flex-row md:justify-center xl:flex-row xl:justify-center">
            <button
              onClick={() => {
                setStartBill(true);
                setPersonEdit(false);
              }}
            >
              <IoIosArrowBack />
            </button>
            <h1>Select Person or Group</h1>
          </div>
        </>
      ) : (
        ""
      )}

      {setSelectPersonEdit ? (
        <>
          <div className="flex flex-col items-center text-2xl mb-5 xs:flex-row xs:justify-center md:flex-row md:justify-center xl:flex-row xl:justify-center">
            <button
              onClick={() => {
                setStartBill(true);
                setSelectPersonEdit(false);
              }}
            >
              <IoIosArrowBack />
            </button>
            <h1>Edit Person</h1>
          </div>
        </>
      ) : (
        ""
      )}
      {groupEdit ? (
        <>
          <div className="flex flex-col items-center text-2xl mb-5 xs:flex-row xs:justify-center md:flex-row md:justify-center xl:flex-row xl:justify-center">
            <button
              onClick={() => {
                setStartBill(true);
                setGroupEdit(false);
              }}
            >
              <IoIosArrowBack />
            </button>
            <h1>Edit a group</h1>
          </div>
        </>
      ) : (
        ""
      )}
      {showHistory ? (
        <>
          <div className="flex flex-col items-center text-2xl mb-5 xs:flex-row xs:justify-center md:flex-row md:justify-center xl:flex-row xl:justify-center">
            <button
              onClick={() => {
                setStartBill(true);
                setHistory(false);
              }}
            >
              <IoIosArrowBack />
            </button>
            <h1>History</h1>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
