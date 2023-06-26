import { React, useState, useEffect } from "react";
import "../index.css";

export default function AddPerson({
  personName,
  personPhone,
  personEmail,
  personOwing,
  setAddPerson,
  setPersonName,
  setPersonPhone,
  setPersonEmail,
  setPersonOwing,
  handleSubmit,
  value,
  formSubmitted,
  setFormSubmitted,
  theme,
}) {
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [errorBalance, setErrorBalance] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submissionError, setSubmissionError] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);

  function handleYesButtonClick() {
    setShowInput(true);
    setInputWidth(document.querySelector(".form-control").offsetWidth);
  }
  function handleNoButtonClick() {
    setShowInput(false);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }
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
  function resetForm() {
    setPersonName("");
    setPersonPhone("");
    setPersonEmail("");
    setPersonOwing("");
    setErrorPhone(false);
    setErrorEmail(false);
    setErrorBalance(false);
    setErrorMsg("");
  }
  useEffect(() => {
    setPersonName("");
    setPersonPhone("");
    setPersonEmail("");
    setPersonOwing("0.00"); // reset the input value to an empty string when the component mounts
  }, []);
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-hidden p-8 focus:outline-none">
        <div className="relative my-6 mx-auto flex w-auto max-w-md items-center justify-center">
          <div
            className={
              theme === "dark"
                ? "border-black-500 relative flex w-full flex-col rounded-lg border-8 bg-gray-500 shadow-lg outline-none focus:outline-none"
                : "border-black-500 relative flex w-full flex-col rounded-lg border-8 bg-white shadow-lg outline-none focus:outline-none"
            }
          >
            <div className="flex items-center justify-evenly rounded-t border-b border-solid border-slate-200 p-3">
              <h3 className="text-2xl font-semibold text-black">
                Add A Person
              </h3>
            </div>

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
                    onKeyDown={handleKeyDown}
                    value={formSubmitted ? "" : personEmail}
                    onChange={handleEmailChange}
                  />
                </div>

                <div className="form-group row mb-0 items-center justify-center text-center">
                  <label
                    htmlFor="colFormLabel"
                    className="col-form-label label-one-line"
                  >
                    Starting balance?
                  </label>
                </div>
                <div className="form-group row justify-content-center align-items-center mt-1 mb-3">
                  <div className="col-md-3 mb-md-0 d-flex justify-content-center mb-3">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={(e) => {
                        handleNoButtonClick(e);
                        setErrorBalance(true);
                        setPersonOwing("0.00");
                      }}
                      disabled={!showInput}
                    >
                      No
                    </button>
                  </div>
                </div>
                <div className="form-group row justify-content-center align-items-center mt-1 mb-3">
                  <div className="col-md-3 d-flex justify-content-center">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={handleYesButtonClick}
                      disabled={showInput}
                    >
                      Yes
                    </button>
                  </div>
                </div>
                <div className="form-group row justify-content-center align-items-center mt-1 mb-3">
                  <div className="col-md-6 mb-md-0 mb-3">
                    {showInput && (
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="text"
                          placeholder={
                            value
                              ? parseFloat(value).toFixed(2)
                              : parseFloat(personOwing).toString() === "NaN"
                              ? "0.00"
                              : parseFloat(personOwing).toFixed(2)
                          }
                          className={`form-control max-six-digits rounded-start ${
                            errorBalance ? "is-invalid" : ""
                          }`}
                          onClick={(e) => {
                            e.target.select();
                          }}
                          onKeyDown={handleKeyDown}
                          onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^[-\d{1,5}.\d{0,2}]*$/;
                            if (regex.test(value)) {
                              setErrorBalance(true);
                              setPersonOwing(value);
                              setErrorMsg("");
                            } else {
                              setErrorBalance(false);
                              setErrorMsg("Please enter a valid number");
                            }
                          }}
                          style={{ borderColor: "lightblue" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {errorMsg && (
                  <div
                    className="error-msg m-auto flex h-5 items-center items-center justify-center"
                    style={{ color: "red" }}
                  >
                    {errorMsg}
                  </div>
                )}
              </div>
            </div>

            {/*footer*/}
            <div className="justify-content-between align-items-center  flex items-center rounded-b border-t border-solid border-slate-200 px-6 pb-6">
              <button
                className="mt-3 justify-center rounded border-2 border-blue-500 bg-blue-500 py-2 px-4 font-bold shadow transition-all duration-300 hover:bg-white"
                onClick={(e) => {
                  setAddPerson(false);
                  setFormSubmitted(true);

                  resetForm();
                }}
              >
                Close
              </button>
              <button
                className="mt-3 ml-2 justify-center rounded border-2 border-blue-500 bg-blue-500 py-2 px-4 font-bold shadow transition-all duration-300 hover:bg-white"
                onClick={(e) => {
                  if (errorBalance & errorPhone & errorEmail) {
                    handleSubmit(e);
                    setFormSubmitted(true);
                    resetForm();
                  } else {
                    console.log("nop");
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
