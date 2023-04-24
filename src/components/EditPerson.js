import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { confirmAlert } from 'react-confirm-alert'; // Import
import { BrowserRouter, Switch, Route, Routes, Link } from "react-router-dom";

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
}) {
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
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
            <div className="border-8 border-black-500 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center justify-evenly p-3 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl font-semibold">Edit Person</h3>
              </div>
              {/*body*/}

              <div className="relative p-6 flex-auto">
                <div class="form-group row">
                  <label for="colFormLabel" class="col-sm-2 col-form-label">
                    Name
                  </label>
                  <div class="col-sm-10 mb-0">
                    <input
                      type="name"
                      class="form-control"
                      id="colFormLabel"
                      placeholder="Name"
                      value={personName}
                      onChange={(e) => setPersonName(e.target.value)}
                    />
                  </div>
                </div>

                <div class="form-group row mb-3">
                <label for="colFormLabel" class="col-sm-2 col-form-label">
                  Phone
                </label>
                <div class="col-sm-10">
                  <input
                    type="phone"
                    class="form-control w-2/3 mb-2"
                    id="colFormLabel"
                    placeholder="Phone Number"
                    value={personPhone}
                    onChange={handlePhoneNumberChange}
                  />

                  {personPhone.length >= 10 && !isValidPhoneNumber && (
                    <span style={{ color: "red" }}>
                      Please enter a valid phone number.
                    </span>
                  )}
                </div>
              </div>

              <div class="form-group row mb-3">
                <label for="colFormLabel" class="col-sm-2 col-form-label">
                  Email
                </label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control w-2/3 mb-2"
                    id="colFormLabel"
                    placeholder="Email"
                    value={personEmail}
                    onChange={handleEmailChange}
                  />

                  {personEmail.length >= 4 && !isValidEmail && (
                    <p style={{ color: "red" }}>
                      Please enter a valid email address.
                    </p>
                  )}
                </div>
              </div>

                <div class="form-group row mb-0">
                <label
                  for="colFormLabel"
                  class="col-sm-2 col-form-label label-one-line"
                >
                  Balance?
                </label>
                <div class="input-group mb-3">
                  <span class="input-group-text ml-11">$</span>
                  <input
                    type="text"
                    class="form-control max-six-digits rounded-left"
                    value={personOwing}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      const value = e.target.value;
                      const isValid = /^\d*$/.test(value); // check if the value contains only digits
                      const regex = /^[-\d{1,5}.\d{0,2}]*$/;
                      if (regex.test(value)) {
                        console.log("test");
                          setErrorBalance(true);
                          setPersonOwing(value);
                          setErrorMsg("");
                          console.log("balance verified");
                          if(isNaN){
                            setPersonOwing("0.00");
                          }
                      }
                      else{
                        setErrorBalance(false);
                        setErrorMsg("Please enter a valid number");
                                          }}}
                  />
                </div>
                <div class="flex items-center items-center m-auto justify-center  error-msg h-5" style={{ color: "red" }}>
                  {errorMsg}
                </div>
                  <div className="flex items-center m-auto justify-center align-items-center px-10 ">
                    <div>
                      <button
                        type="submit"
                        className="justify-center align-items-center mt-3 ml-2 bg-gray-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                        onClick={(e) => {
                                  setPersonOwing("0.00");setErrorBalance(true);}}
                      >
                        Reset balance
                      </button>
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
                    } 
                    else{
                      
                    setSubmissionError(false);
                    }
                  }}
                                  >
                  Save
                </button>
              </div>{!submissionError ? (
                    <p class="items-center justify-center mx-auto"style={{ color: "red" }}>
                      Please complete all fields correctly.
                    </p>
                  ) : <div/>}
            </div>
          </div>
        </div>
    </>
  );
}
