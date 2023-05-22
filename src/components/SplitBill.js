import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Switch, Route, Routes, Link } from "react-router-dom";
import AddPerson from "./AddPerson";
import Header from "./Header";

export default function SplitBill({
  addPerson,
  setAddPerson,
  selectPerson,
  personName,
  personEmail,
  personPhone,
  personOwing,
  setPersonName,
  setPersonEmail,
  setPersonPhone,
  setPersonOwing,
  handleSubmit,
  setPersonState,
  personState,
  setIsSelected,
  list,
  setEditPerson,
  value,
  setValue,
  addNum,
  subNum,
  personReceiptAmount,
  formSubmitted, 
  setFormSubmitted,
  theme
}) {
  const [selectPersonList, setSelectPersonList] = useState(true);

  return (
    <>
      <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
        <Header selectPersonList={selectPersonList} />
        <div className="flex flex-col items-center justify-center">
          {/*Table generator for people added*/}
          {list.map(({ id, personName, personOwing }) => (
            <React.Fragment key={id}>
              {personName.length ? (
                <ul className="list-group m-0">
                  <Link
                    to={`/ReceiptInput/${id}`}
                    onClick={() => selectPerson(id)}
                  >
                    <li className="outline-none text-primary focus:outline-none list-group-item d-flex l-500 justify-content-between align-items-center">
                      {personName}

                      <span
                        className="badge badge-primary badge-pill"
                        style={{
                          backgroundColor: personOwing < 0 ? "red" : "",
                          color: personOwing < 0 ? "black" : "white",
                        }}
                      >
                        $
                        {value
                          ? parseFloat(value).toFixed(2)
                          : parseFloat(personOwing).toString() === "NaN"
                          ? "0.00"
                          : parseFloat(personOwing).toFixed(2)}
                      </span>
                    </li>
                  </Link>
                </ul>
              ) : (
                ""
              )}
            </React.Fragment>
          ))}
          <button
            className="mt-4 bg-blue-500 font-bold py-2 px-4 mb-5 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
            onClick={() => {setAddPerson(true);setFormSubmitted(true);}}
          >
            Add Person
          </button>
        </div>
        {addPerson ? (
          <AddPerson
            addPerson={addPerson}
            setAddPerson={setAddPerson}
            personName={personName}
            setPersonName={setPersonName}
            setPersonPhone={setPersonPhone}
            setPersonEmail={setPersonEmail}
            setPersonOwing={setPersonOwing}
            personEmail={personEmail}
            personPhone={personPhone}
            personOwing={personOwing}
            handleSubmit={handleSubmit}
            setPersonState={setPersonState}
            personState={personState}
            setIsSelected={setIsSelected}
            value={value}
            setValue={setValue}
            addNum={addNum}
            subNum={subNum}
            personReceiptAmount={personReceiptAmount}
            setFormSubmitted={setFormSubmitted}
            theme={theme}
          ></AddPerson>
        ) : (
          ""
        )}
      </main>
    </>
  );
}