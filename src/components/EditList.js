import React, { useState, useEffect } from "react";
import AddPerson from "./AddPerson";
import Header from "./Header";
import { IoPersonAddSharp } from "react-icons/io5";
import { Amplify } from "aws-amplify";
import Avatar from "react-avatar";
import { CSSTransition } from "react-transition-group";
import { Button } from "@material-tailwind/react";

import { Link } from "react-router-dom";

import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

export default function EditList({
  addPerson,
  setAddPerson,
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
  editRow,
  theme,
  handleAddSubmit,
  lang,
  loggedInUserEmail,
  setFormSubmitted,
  dataThrow,
  setDataThrow,
  selfValue,
  setSelfValue,
  toggleTheme
}) {
    // Define the API URL for fetching contact data
    const API_URL = "https://48f95wy514.execute-api.us-east-1.amazonaws.com/prod/contacts";
    // State to toggle the edit person list view
    const [selectEditPersonList, setEditSelectPersonList] = useState(true);
  
    // Check if dataThrow is empty or only contains entries where the user is editing their own contact for self expenses
    const isEmptyDataThrow = !dataThrow || dataThrow.filter(
      (item) => item.UserEmail === loggedInUserEmail &&
        !(item.UserEmail === loggedInUserEmail && item.Email === loggedInUserEmail)
    ).length === 0;
  
    // Fetch contact data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setDataThrow(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    // Fetch data when the component mounts
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
          toggleTheme={toggleTheme}
        />
        <div
          className={`flex flex-col items-center justify-center transition-opacity duration-300`}
        >
          {isEmptyDataThrow ? (
            <div className="mb-5">
              <Button
                variant="gradient"
                className="gradient-btn mb-2 flex items-center justify-center glow pulsing"
                style={{ margin: "auto" }}
                onClick={() => {
                  setAddPerson(true);
                  setFormSubmitted(true);
                }}
              >
                <div className="flex items-center">
                  <IoPersonAddSharp size={24} />
                  <span className="text-white ml-2">
                    {lang === "english"
                      ? "Add a Friend First"
                      : "Ajoutez d'abord un ami"}
                  </span>
                </div>
              </Button>
            </div>
          ) : (
            <>
              <ul className="max-w-md mb-3 p-2 divide-y divide-gray-200 dark:divide-gray-700 bg-gray-800 dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                {dataThrow.length > 0 &&
                  dataThrow
                    .filter(
                      (item) =>
                        item.UserEmail === loggedInUserEmail &&
                        !(
                          item.UserEmail === loggedInUserEmail &&
                          item.Email === loggedInUserEmail
                        )
                    )
                    .map((item, index) => (
                      <React.Fragment key={index}>
                        {item.Name && item.Owing ? (
                          <Link
                            setSelfValue={setSelfValue}
                            selfValue={selfValue}
                            to={{
                              pathname: "/App/ContactHistoryEdit",
                              state: {
                                personName: item.personName,
                                personEmail: item.personEmail,
                                personPhone: item.personPhone,
                                personOwing: item.personOwing,
                                ContactId: item.ContactId,
                                UserEmail: item.UserEmail,
                              },
                            }}
                            onClick={() => {
                              setSelfValue(false);
                              editRow(item.ContactId, item.UserEmail);
                            }}
                            className="no-underline block"
                          >
                            <li className="py-3 sm:py-4">
                              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="flex-shrink-0">
                                  <Avatar name={item.Name} size={32} round />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-100 truncate dark:text-white">
                                    {item.Name.length > 8
                                      ? `${item.Name.substring(0, 8)}...`
                                      : item.Name}
                                  </p>
                                  <p className="text-sm text-gray-400 truncate dark:text-gray-400">
                                    {item.Email.length > 15
                                      ? `${item.Email.substring(0, 15)}...`
                                      : item.Email}
                                  </p>
                                </div>
                                <div
                                  className={`inline-flex items-center text-base font-semibold ${
                                    parseFloat(item.Owing) < 0
                                      ? "text-red-500"
                                      : "text-blue-500"
                                  }`}
                                >
                                  ${parseFloat(item.Owing).toFixed(2)}
                                </div>
                              </div>
                            </li>
                          </Link>
                        ) : null}
                      </React.Fragment>
                    ))}
              </ul>
              <div className="mb-5">
                <Button
                  variant="gradient"
                  className="gradient-btn mb-2 flex items-center justify-center"
                  style={{ margin: "auto" }}
                  onClick={() => {
                    setAddPerson(true);
                    setFormSubmitted(true);
                  }}
                >
                  <div className="flex items-center">
                    <IoPersonAddSharp size={24} />
                    <span className="text-white ml-2">
                      {lang === "english"
                        ? "Add Person"
                        : "Ajouter Une Personne"}
                    </span>
                  </div>
                </Button>
              </div>
            </>
          )}
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
