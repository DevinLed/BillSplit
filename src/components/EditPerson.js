import React from "react";
import { useState } from "react";
import "./../index.css";

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

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-hidden p-8 focus:outline-none">
        <div className="relative my-6 mx-auto w-auto max-w-sm">
          {/*content*/}
          <div
            className={
              theme === "dark"
                ? "border-black-500 relative flex w-full flex-col rounded-lg border-8 bg-gray-500 shadow-lg outline-none focus:outline-none"
                : "border-black-500 relative flex w-full flex-col rounded-lg border-8 bg-white shadow-lg outline-none focus:outline-none"
            }
          >
            {/*header*/}
            <div className="flex items-center justify-evenly rounded-t border-b border-solid border-slate-200 p-3">
              <h3 className="text-2xl font-semibold text-black">Edit Person</h3>
            </div>
            {/*body*/}

            <div className="relative flex-auto items-center justify-center p-6">
              <div className="text-center">
                <div className="form-group row mb-3  flex items-center justify-center">
                  <label
                    htmlFor="colFormLabel"
                    className="col-sm-2 col-form-label mr-2"
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    className="form-control ml-2 mb-2 w-2/4"
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

                <div className="form-group row mb-3 flex items-center justify-center">
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

                <div className="form-group row mb-3 flex items-center justify-center">
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

                <div className="form-group row mb-0 items-center justify-center text-center">
                  <label
                    htmlFor="colFormLabel"
                    className="col-form-label label-one-line"
                  >
                    Balance?
                  </label>
                </div>

                <div className="form-group row mb-0 flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    <div className="input-group mb-3 flex items-center justify-center">
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
                    className="error-msg flex h-5 items-center justify-center"
                    style={{ color: "red" }}
                  >
                    {errorMsg}
                  </div>
                  <div className="flex items-center justify-center px-10">
                    <div>
                      <button
                        type="submit"
                        className="align-items-center mt-3 ml-2 justify-center rounded border-2 border-blue-500 bg-gray-500 py-2 px-4 font-bold shadow transition-all duration-300 hover:bg-white"
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
            <div className="align-items-center flex  items-center justify-center rounded-b border-t border-solid border-slate-200 px-6 pb-6">
              <button
                type="submit"
                className="mt-3 ml-2 justify-center rounded border-2 border-blue-500 bg-blue-500 py-2 px-4 font-bold shadow transition-all duration-300 hover:bg-white"
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
                className="mx-auto items-center justify-center"
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
