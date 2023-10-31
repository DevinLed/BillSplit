import React, { useState, useEffect } from "react";
import AddPerson from "./AddPerson";
import Header from "./Header";
import EditPerson from "./EditPerson";
import { IoPersonAddSharp } from "react-icons/io5";
import { Amplify, Auth } from "aws-amplify";
import Avatar from "react-avatar";
import { CSSTransition } from "react-transition-group";
import axios from "axios";

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
}) {
  const API_URL =
    "https://wwbikuv18g.execute-api.us-east-1.amazonaws.com/prod/users";
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
  const handleDeletePerson = async () => {
    try {
      // Call your API to delete the user using the editPerson ID
      const response = await axios.delete(
        `https://tbmb99cx6i.execute-api.us-east-1.amazonaws.com/dev/user/${editPerson}`
      );

      // Handle the response as needed
      console.log("User deleted:", response);

      // Close the edit person popup
      setEditPerson(null); // Clear the editPerson state to exit editing mode
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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

    fetchData(); // Fetch data when component mounts

    // Set up an interval to fetch data every 2 seconds
    const intervalId = setInterval(fetchData, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <main
        className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
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
          {dataThrow
  .filter((item) => item.UserEmail?.S === loggedInUserEmail)
  .map((item) => (
    <React.Fragment key={item.id}> {/* Assuming there's a unique identifier like 'id' */}
      {item.PersonName && item.PersonOwing ? (
        <button
          className="text-primary outline-none focus:outline-none w-full"
          onClick={() => {
            editRow(item.PersonEmail.S); // Pass a unique identifier like email
          }}
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
        </button>
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
            theme={theme}
            handleAddSubmit={handleAddSubmit}
            setFormSubmitted={setFormSubmitted}
            lang={lang}
          ></AddPerson>
        </CSSTransition>
        <CSSTransition
          in={editPerson} // Only render when editPerson is true and userId is not null
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <EditPerson
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
            handleEditSubmit={handleEditSubmit}
            setPersonState={setPersonState}
            personState={personState}
            setIsSelected={setIsSelected}
            setEditPerson={setEditPerson}
            theme={theme}
            setList={setList}
            list={list}
            editPerson={editPerson}
            handleDeletePerson={handleDeletePerson}
            lang={lang}
            userId={userId}
          ></EditPerson>
        </CSSTransition>
      </main>
    </>
  );
}
