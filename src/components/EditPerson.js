import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { confirmAlert } from "react-confirm-alert"; // Import
import { BrowserRouter, Switch, Route, Routes, Link } from "react-router-dom";
import "./../index.css"

export default function EditPerson({
  personName,
  personPhone,
  personEmail,
  personOwing,
  setEditPerson,
  setPersonName,
  setPersonPhone,
  setPersonEmail,
  setPersonOwing,
  handleSubmit,
  handleEditSubmit,
  setIsSelected,
  list,
  setList,
  setIsEditing,
  formSubmitted,
  theme,
}) {
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorBalance, setErrorBalance] = useState(true);
  const [errorPhone, setErrorPhone] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [submissionError, setSubmissionError] = useState(true);

  const handlePhoneNumberChange = (event) => {
    const inputValue = event.target.value;
    let formattedValue = inputValue;
    const phoneNumberRegex = /^[0-9]{10}$/; // matches a phone number in the format of XXX-XXX-XXXX
    const isValid = phoneNumberRegex.test(inputValue);
    const containsOnlyDigits = /^\d+$/.test(inputValue); // checks if the input contains only digits
    setIsValidPhoneNumber(isValid && containsOnlyDigits);
    setErrorPhone(false);

    // Check if the input is a valid phone number after the 10th digit is typed
    if (inputValue.length >= 10 && isValid && containsOnlyDigits) {
      setErrorPhone(true); // sets error if the input is not a valid phone number or contains non-digits
      console.log("phone accepted");
    } else {
      setIsValidPhoneNumber(false);
      setErrorPhone(false);
      console.log("error in phone input");
    }

    setPersonPhone(formattedValue);
  };
  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setPersonEmail(inputEmail);
    setErrorEmail(false);

    // Check if email contains "@"
    if (inputEmail.includes("@")) {
      setIsValidEmail(true);
      setErrorEmail(true);
      console.log("email verified");
    } else {
      setIsValidEmail(false);
    }
  };
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

  return (
    <>
      <div className="p-8 justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          {/*content*/}
          <div
            className={
              theme === "dark"
                ? "bg-gray-500 border-8 border-black-500 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none"
                : "bg-white border-8 border-black-500 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none"
            }
          >
            {/*header*/}
            <div className="flex items-center justify-evenly p-3 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold text-black">Edit Person</h3>
            </div>
            {/*body*/}

            <div className="relative p-6 flex-auto justify-center items-center">
              <div className="text-center">
                <div className="form-group row mb-3  flex justify-center items-center">
                  <label
                    htmlFor="colFormLabel"
                    className="col-sm-2 col-form-label mr-2"
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    className="form-control w-2/4 ml-2 mb-2"
                    id="colFormLabel"
                    placeholder="Name"
                    value={personName}
                    onChange={(e) => {
                      setPersonName(
                        e.target.value.charAt(0).toUpperCase() +
                          e.target.value.slice(1)
                      );
                      setErrorBalance(true);
                    }}
                  />
                </div>

                <div className="form-group row mb-3 flex justify-center items-center">
                  <label
                    htmlFor="colFormLabel"
                    className="col-sm-2 col-form-label mr-2"
                  >
                    Phone
                  </label>
                  <input
                    type="phone"
                    className={`form-control mb-2 ml-2 w-2/4 ${
                      isValidPhoneNumber ? "valid" : "invalid"
                    } ${
                      personPhone.length >= 10 && !isValidPhoneNumber
                        ? "red"
                        : ""
                    }`}
                    id="colFormLabel"
                    placeholder="Phone Number"
                    value={formSubmitted ? "" : personPhone}
                    onChange={handlePhoneNumberChange}
                  />

                </div>

                <div className="form-group row mb-3 flex justify-center items-center">
                  <label
                    htmlFor="colFormLabel"
                    className="col-sm-2 col-form-label mr-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    
                    className={`form-control mb-2 ml-2 w-2/4 ${
                      isValidEmail ? "valid" : "invalid"
                    } `}
                    id="colFormLabel"
                    placeholder="Email"
                    value={formSubmitted ? "" : personEmail}
                    onChange={handleEmailChange}
                  />

                                 </div>

                <div className="form-group row mb-0 text-center justify-center items-center">
                  <label
                    htmlFor="colFormLabel"
                    className="col-form-label label-one-line"
                  >
                    Balance?
                  </label>
                </div>

                <div className="form-group row mb-0 flex justify-center items-center">
                  <div className="flex justify-center items-center">
                    <div className="input-group mb-3 flex justify-center items-center">
                      <span className="input-group-text ml-9">$</span>
                      <input
                        type="text"
                        className="form-control max-six-digits rounded-left w-1/3"
                        onKeyDown={handleKeyDown}
                        placeholder={
                          personOwing
                            ? parseFloat(personOwing).toFixed(2)
                            : "0.00 "
                        }
                        onClick={(e) => {
                          e.target.select();
                        }}
                        onChange={(e) => {
                          const value = e.target.value;
                          setPersonOwing(value);
                          const regex = /^[-\d{1,5}\.\d{0,2}]*$/;
                          if (regex.test(value)) {
                            setErrorBalance(true);
                            setPersonOwing(value);
                            setErrorMsg("");
                            if (isNaN(value)) {
                              setPersonOwing("0.00");
                            }
                          } else {
                            setErrorBalance(false);
                            setErrorMsg("Please enter a valid number");
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-center error-msg h-5"
                    style={{ color: "red" }}
                  >
                    {errorMsg}
                  </div>
                  <div className="flex items-center justify-center px-10">
                    <div>
                      <button
                        type="submit"
                        className="justify-center align-items-center mt-3 ml-2 bg-gray-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                        onClick={(e) => {
                          setPersonOwing("0.00");
                          setErrorBalance(true);
                        }}
                      >
                        Reset balance
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center  justify-center align-items-center pb-6 px-6 border-t border-solid border-slate-200 rounded-b">
              <button
                type="submit"
                className="justify-center mt-3 ml-2 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                onClick={(e) => {
                  if (errorBalance && errorPhone & errorEmail) {
                    handleSubmit(e);
                    setEditPerson(false);
                  } else {
                    setSubmissionError(false);
                  }
                }}
              >
                Save
              </button>
            </div>
            {!submissionError ? (
              <p
                className="items-center justify-center mx-auto"
                style={{ color: "red" }}
              >
                Please complete all fields correctly.
              </p>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
