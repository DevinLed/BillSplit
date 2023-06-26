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
  value,
  setValue,
  addNum,
  subNum,
  personReceiptAmount,
  setFormSubmitted,
  theme,
}) {
  const [selectPersonList, setSelectPersonList] = useState(true);

  return (
    <>
      <main className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl">
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
                    <li className="text-primary list-group-item d-flex l-500 justify-content-between align-items-center outline-none focus:outline-none">
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
            className="mt-4 mb-5 rounded border-2 border-blue-500 bg-blue-500 py-2 px-4 font-bold shadow transition-all duration-300 hover:bg-white"
            onClick={() => {
              setAddPerson(true);
              setFormSubmitted(true);
            }}
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
