import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import AddPerson from "./AddPerson";
import Header from "./Header";
import { IoPersonAddSharp } from "react-icons/io5";
import Avatar from "react-avatar";
import { CSSTransition } from "react-transition-group";
import axios from 'axios'
import { Amplify, API } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);
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
}) {
  const [list, setList] = useState([]);
  const [selectPersonList, setSelectPersonList] = useState(true);
  
  const [users, setUsers] = useState([]);

  const API_URL = 'https://kdj7rkk1yl.execute-api.us-east-1.amazonaws.com/dev';

useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log('Response:', response); 

      if (response.status === 200 && response.data) {
        console.log('Response Data:', response.data); 
        setUsers(response.data);
      } else {
        console.error('API request failed with status code:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  getData();
}, []);


  

  return (
    <>
      <main
        className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
        style={{ maxWidth: "600px" }}
      >
        <Header selectPersonList={selectPersonList} lang={lang} theme={theme} />
        <div
          className={`flex flex-col items-center justify-center transition-opacity duration-300`}
        >
          <ul className="m-0 py-1 w-3/4">
          {users.map((user) => (
  <React.Fragment key={user.userId}>
    {user.personName ? (
      <Link
        to={`/ReceiptInput/${user.userId}`}
        onClick={() => selectPerson(user.userId)}
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
            <Avatar name={user.personName.S} size={32} round /> {/* Convert to string */}
            <span className="ml-1">
              {user.personName.S.length > 8
                ? `${user.personName.S.substring(0, 8)}...`
                : user.personName.S}
            </span>
          </div>
          <span
            className={`badge badge-pill rounded px-1 pt-2 ml-2 text-xs ${
              user.personOwing.N < 0 // Convert to string
                ? "bg-red-500 text-black"
                : "bg-blue-500 text-white"
            }`}
          >
            $
            {value
              ? parseFloat(value).toFixed(2)
              : parseFloat(user.personOwing.S).toString() === "NaN" // Convert to string
              ? "0.00"
              : parseFloat(user.personOwing.S).toFixed(2)} {/* Convert to string */}
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
          timeout={300}
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
          ></AddPerson>
        </CSSTransition>
      </main>
    </>
  );
}



/*
  BASE_URL = https://tbmb99cx6i.execute-api.us-east-1.amazonaws.com/dev
  resource
  http method
  path parameters
  query strings

  METHOD ${BASE_URL}/${resource}/${path_parameters}?${query_strings}

  url/bill/{id}
  GET url/user/1
   - HTTP Method is GET
   - resource is bill
   - path parameter is { id: 1,  }
   - no query strings


   client -> backend/server -> server processes -> database -> server return data
   react app -> rest api -> lambda function -> dynamo -> return data

*/