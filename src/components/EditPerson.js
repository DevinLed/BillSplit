import React from "react";
import { useState } from "react";
import "./../index.css";
import { IoSaveOutline } from "react-icons/io5";

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
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4"
        style={{ marginTop: "-90px" }}
      >
        <div className="relative w-full max-w-sm">
          <div
            className={
              theme === "dark"
                ? "overflow-hidden rounded-lg border border-gray-300 bg-gray-800 shadow-lg"
                : "overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg"
            }
          >
            <div className="flex items-center justify-evenly border-b border-gray-300 p-3">
              <h3 className="text-xl font-semibold">Edit Person</h3>
            </div>

            <div className="p-4">
              <div className="text-center">
                <div className="mb-2">
                  <label htmlFor="colFormLabel" className="sr-only">
                    Name
                  </label>
                  <input
                    type="name"
                    className="form-control w-full rounded-lg py-2 px-3 focus:border-blue-300 focus:outline-none focus:ring"
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
                    autoComplete="off"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="colFormLabel" className="sr-only">
                    Phone
                  </label>
                  <input
                    type="phone"
                    className={`form-control w-full rounded-lg py-2 px-3 focus:outline-none focus:ring ${
                      isValidPhoneNumber ? "ring-green-300" : "ring-red-300"
                    } ${
                      personPhone.length >= 10 && !isValidPhoneNumber
                        ? "ring-red-300"
                        : ""
                    }`}
                    id="colFormLabel"
                    placeholder="Phone Number"
                    value={formSubmitted ? "" : personPhone}
                    onChange={handlePhoneNumberChange}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="colFormLabel" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control w-full rounded-lg py-2 px-3 focus:outline-none focus:ring ${
                      isValidEmail ? "ring-green-300" : "ring-red-300"
                    }`}
                    id="colFormLabel"
                    placeholder="Email"
                    value={formSubmitted ? "" : personEmail}
                    onChange={handleEmailChange}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="colFormLabel" className={theme === "dark"? "text-white label-one-line":"text-black label-one-line"}>
                    Balance?
                  </label>
                </div>

                <div className="mb-2 flex justify-center">
                  <div className="flex items-center">
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control max-six-digits rounded-start"
                        onKeyDown={handleKeyDown}
                        placeholder={
                          personOwing
                            ? parseFloat(personOwing).toFixed(2)
                            : "0.00"
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
                </div>

                <div className="mb-2 text-center text-sm text-red-500">
                  {errorMsg}
                </div>
              </div>
            </div>

            <div className="flex justify-center p-2">
              <label
                className={
                  theme === "dark"
                    ? "flex w-fit flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
                    : "flex w-fit flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-800 hover:no-underline"
                }
                onClick={(e) => {
                  if (errorBalance && errorPhone && errorEmail) {
                    handleSubmit(e);
                    setEditPerson(false);
                  } else {
                    setSubmissionError(false);
                  }
                }}
              >
                <IoSaveOutline size={24} />
              </label>
            </div>

            {!submissionError && (
              <p className="mb-2 text-center text-sm text-red-500">
                Please complete all fields correctly.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
