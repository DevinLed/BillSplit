import React from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function Header({
  showBill,
  setShowBill,
  personEdit,
  setPersonEdit,
  setSelectPersonEdit,
  selectPersonEdit,
  setGroupEdit,
  groupEdit,
  setHistory,
  showHistory,
}) {
  console.log(showBill);
  console.log(personEdit);
  console.log(groupEdit);
  return (
    <>
      {showBill ? (
        <header className="flex flex-col items-center justify-center mb-5 xl:flex-row xl:justify-between">
          <h1 className="font-bold uppercase tracking-wide text-4xl mb-3">
            Bill Splitter
          </h1>
        </header>
      ) : (
        ""
      )}
      {personEdit ? (
        <>
          <div className="flex flex-col items-center text-4xl mb-5 xs:flex-row xs:justify-center md:flex-row md:justify-center xl:flex-row xl:justify-center">
            <button
              onClick={() => {
                setShowBill(true);
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
          <div className="flex flex-col items-center text-4xl mb-5 xs:flex-row xs:justify-center md:flex-row md:justify-center xl:flex-row xl:justify-center">
            <button
              onClick={() => {
                setShowBill(true);
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
          <div className="flex flex-col items-center text-4xl mb-5 xs:flex-row xs:justify-center md:flex-row md:justify-center xl:flex-row xl:justify-center">
            <button
              onClick={() => {
                setShowBill(true);
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
          <div className="flex flex-col items-center text-4xl mb-5 xs:flex-row xs:justify-center md:flex-row md:justify-center xl:flex-row xl:justify-center">
            <button
              onClick={() => {
                setShowBill(true);
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
