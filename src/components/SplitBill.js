import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Switch, Route, Routes, Link } from "react-router-dom";
import AddPerson from "./AddPerson";
import Header from "./Header";
import { IoPersonAddSharp } from "react-icons/io5";

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
                <ul className="list-group m-0 py-1">
                  <Link
                    to={`/ReceiptInput/${id}`}
                    onClick={() => selectPerson(id)}
                  >
                    <li className="flex items-center justify-between border-b border-gray-300 bg-white p-4 hover:bg-gray-100">
                      <span className="text-primary font-medium">
                        {personName}
                      </span>
                      <span
                        className={`badge badge-primary badge-pill rounded px-1 py-1 ${
                          personOwing < 0
                            ? "bg-red-500 text-black"
                            : "bg-blue-500 text-white"
                        }`}
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
              ) : null}
            </React.Fragment>
          ))}

<label
  className={
    "mt-4 mb-4 mb-0 flex h-24 w-1/3 flex-col items-center justify-center rounded-lg border " +
    (theme === "dark" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white text-gray-800") +
    " py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
  }
  onClick={() => {
    setAddPerson(true);
    setFormSubmitted(true);
  }}
>
  <IoPersonAddSharp size={24} />
  Add Person
</label>

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
