import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Switch, Route, Routes, Link } from "react-router-dom";
import AddPerson from "./AddPerson";
import Header from "./Header";
import { IoPersonAddSharp } from "react-icons/io5";
import Avatar from "react-avatar";
import { CSSTransition } from "react-transition-group";
import { API } from "aws-amplify"; 


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
  handleAddSubmit,
  lang,
  setLang,
  loggedInUsername,
  loggedInUserEmail
}) {
  const [selectPersonList, setSelectPersonList] = useState(true);
  const API_URL =
  "https://wwbikuv18g.execute-api.us-east-1.amazonaws.com/prod/users";
const [dataThrow, setDataThrow] = useState([]);

useEffect(() => {
  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setDataThrow(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData(); 

  // Set up an interval to fetch data every 2 seconds
  const intervalId = setInterval(fetchData, 2000);

  return () => clearInterval(intervalId);
}, []);

  return (
    <>
      <main
        className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
        style={{ maxWidth: "600px" }}
      >
        <Header selectPersonList={selectPersonList} lang={lang} theme={theme}/>
        <div className="flex flex-col items-center justify-center">
          {/* Table generator for people added */}
          <ul className="m-0 py-1 w-3/4">
  {dataThrow
    .filter(item => item.UserEmail?.S === loggedInUserEmail)
    .map((item, index) => (
      <React.Fragment key={index}>
        {item.PersonName && item.PersonOwing ? (
          <Link
            to={`/ReceiptInput/${index}`}
            onClick={() => selectPerson(index)}
            className="no-underline py-1"
          >
            <li
              className={
                "list-group-item flex justify-between m-1 p-2 rounded-lg shadow-sm " +
                (theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800")
              }
            >
              <div className="flex items-center">
                <Avatar name={item.PersonName.S} size={32} round />
                <span className="ml-1">
                  {item.PersonName.S.length > 8
                    ? `${item.PersonName.S.substring(0, 8)}...`
                    : item.PersonName.S}
                </span>
              </div>
              <span
                className={`badge badge-pill rounded px-1 pt-2 ml-2 text-xs ${
                  parseFloat(item.PersonOwing.S) < 0
                    ? "bg-red-500 text-black"
                    : "bg-blue-500 text-white"
                }`}
              >
                ${parseFloat(item.PersonOwing.S).toFixed(2)}
              </span>
            </li>
          </Link>
        ) : null}
      </React.Fragment>
    ))}
</ul>



          <label
            className={
              "mt-4 mb-4 mb-0 flex h-24 w-fit flex-col items-center justify-center rounded-lg border " +
              (theme === "dark"
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 bg-white text-gray-800") +
              " py-4 px-10 text-sm font-semibold shadow-md hover:bg-gray-800 hover:no-underline"
            }
            onClick={() => {
              setAddPerson(true);
              setFormSubmitted(true);
            }}
          >
            <IoPersonAddSharp size={24} />
          </label>
        </div>

        <CSSTransition
          in={addPerson}
          timeout={300} // Adjust the duration of the transition as needed
          classNames="fade"
          unmountOnExit
        >
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
            handleAddSubmit={handleAddSubmit}
            lang={lang}
            loggedInUserEmail={loggedInUserEmail}
          ></AddPerson>
        </CSSTransition>
      </main>
    </>
  );
}