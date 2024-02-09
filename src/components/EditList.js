import React, { useState, useEffect } from "react";
import AddPerson from "./AddPerson";
import Header from "./Header";
import EditPerson from "./EditPerson";
import { IoPersonAddSharp } from "react-icons/io5";
import { Amplify, Auth } from "aws-amplify";
import Avatar from "react-avatar";
import { CSSTransition } from "react-transition-group";

import { Link } from "react-router-dom";

import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

export default function EditList({
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
  handleEditSubmit,
  setPersonState,
  personState,
  setIsSelected,
  editPerson,
  setEditPerson,
  editRow,
  value,
  setValue,
  theme,
  handleAddSubmit,
  lang,
  setLang,
  loggedInUserEmail,
  setFormSubmitted,
  handleDeletePerson,
  dataThrow,
  setDataThrow,
  passedId,
  setPassedId,
  updateDataHandler,
  user,
}) {
  const API_URL =
    "https://48f95wy514.execute-api.us-east-1.amazonaws.com/prod/contacts";
  const [list, setList] = useState([]);
  const [selectEditPersonList, setEditSelectPersonList] = useState(true);
  const [userId, setUserId] = useState(null); // Initialize userId as null

  const getUserId = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user.attributes.sub; // 'sub' is the unique user ID
    } catch (error) {
      // Handle authentication error
      console.error("Error getting user ID:", error);
      return null;
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setDataThrow(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const updateEditHandler = () => {
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <main
        className="xs:max-w-xl bg-white-500 mt-1 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
        style={{ maxWidth: "600px" }}
      >
        <Header
          selectEditPersonList={selectEditPersonList}
          theme={theme}
          lang={lang}
        />
        <div
          className={`flex flex-col items-center justify-center transition-opacity duration-300`}
        >
          <ul className="m-0 py-1 w-3/4">
            {dataThrow.length > 0 &&
              dataThrow
                .filter((item) => item.UserEmail === loggedInUserEmail)
                .map((item, index) => (
                  <React.Fragment key={index}>
                    {item.Name && item.Owing ? (
                      <Link to={{
                        pathname: "/ContactHistoryEdit",
                        state: {
                          personName: item.personName,
                          personEmail: item.personEmail,
                          personPhone: item.personPhone,
                          personOwing: item.personOwing,
                          ContactId: item.ContactId,
                          UserEmail: item.UserEmail,
                        }
                      }}
                      onClick={() => editRow(item.ContactId, item.UserEmail)}>
                      <li
                        className={
                          "list-group-item flex justify-between m-1 p-2 rounded-lg shadow-sm " +
                          (theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800")
                        }
                      >
                        <div className="flex items-center">
                          <Avatar name={item.Name} size={32} round />
                          <span className="ml-1">
                            {item.Name.length > 8
                              ? `${item.Name.substring(0, 8)}...`
                              : item.Name}
                          </span>
                        </div>
                        <span
                          className={`badge badge-pill rounded px-1 pt-2 ml-2 text-xs ${
                            parseFloat(item.Owing) < 0
                              ? "bg-red-500 text-black"
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          ${parseFloat(item.Owing).toFixed(2)}
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
              " py-4 px-10 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
            }
            onClick={() => setAddPerson(true)}
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
            theme={theme}
            handleAddSubmit={handleAddSubmit}
            setFormSubmitted={setFormSubmitted}
            lang={lang}
          ></AddPerson>
        </CSSTransition>
      </main>
    </>
  );
}
