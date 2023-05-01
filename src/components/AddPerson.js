import { React, useState, useEffect } from "react";
import History from "./History";

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
  setIsSelected,
  value,
  setValue,
  addNum,
  personReceiptAmount,
  formSubmitted,
  setFormSubmitted,
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
  const [isLoaded, setIsLoaded] = useState(true);
  function handleKeyDown(event) {
    // Handle key events
  }

  function handleYesButtonClick() {
    setShowInput(true);
    setInputWidth(document.querySelector(".form-control").offsetWidth);
  }
  function handleNoButtonClick() {
    setShowInput(false);
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
    setPersonOwing(0);
    setErrorPhone(false);
    setErrorEmail(false);
    setErrorBalance(false);
    setErrorMsg("");
  }
  useEffect(() => {
    setPersonName("");
    setPersonPhone("");
    setPersonEmail("");
    setPersonOwing(""); // reset the input value to an empty string when the component mounts
  }, []);
  return (
    <>
      <div className="p-8 justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-md flex justify-center items-center">
          <div className="border-8 border-black-500 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
            <div className="flex items-center justify-evenly p-3 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">Add A Person</h3>
            </div>

            <div className="relative p-6 flex-auto justify-center items-center">
              <div className="text-center">
                <div class="form-group row mb-3">
                  <label
                    for="colFormLabel"
                    class="col-sm-2 col-form-label mr-2"
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    class="form-control w-2/3 ml-2 mb-2"
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

                <div class="form-group row mb-3">
                  <label
                    for="colFormLabel"
                    class="col-sm-2 col-form-label mr-2"
                  >
                    Phone
                  </label>
                  <input
                    type="phone"
                    class="form-control w-2/3 mb-2 ml-2"
                    id="colFormLabel"
                    placeholder="Phone Number"
                    value={formSubmitted ? "" : personPhone}
                    onChange={handlePhoneNumberChange}
                  />

                  {personPhone.length >= 10 && !isValidPhoneNumber && (
                    <span style={{ color: "red" }}>
                      Please enter a valid phone number.
                    </span>
                  )}
                </div>

                <div class="form-group row mb-3">
                  <label
                    for="colFormLabel"
                    class="col-sm-2 col-form-label mr-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control w-2/3 mb-2 ml-2"
                    id="colFormLabel"
                    placeholder="Email"
                    value={formSubmitted ? "" : personEmail}
                    onChange={handleEmailChange}
                  />

                  {personEmail.length >= 4 && !isValidEmail && (
                    <p style={{ color: "red" }}>
                      Please enter a valid email address.
                    </p>
                  )}
                </div>

                <div class="form-group row mb-0 text-center justify-center items-center">
                  <label
                    for="colFormLabel"
                    class="col-form-label label-one-line"
                  >
                    Starting balance?
                  </label>
                </div>
                <div className="form-group row mt-1 mb-3 d-flex justify-content-center align-items-center">
                  <div className="col-md-3 mb-3 mb-md-0">
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

                  <div className="col-md-3 ">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={handleYesButtonClick}
                      disabled={showInput}
                    >
                      Yes
                    </button>
                  </div>
                  <div className="col-md-6 mb-3 mb-md-0">
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
                  {errorMsg && (
                    <div
                      className="flex items-center items-center m-auto justify-center error-msg h-5"
                      style={{ color: "red" }}
                    >
                      {errorMsg}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/*footer*/}
            <div className="flex items-center  justify-content-between align-items-center pb-6 px-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="justify-center mt-3 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                onClick={(e) => {
                  setAddPerson(false);
                  setFormSubmitted(true);

                  resetForm();
                }}
              >
                Close
              </button>
              <button
                className="justify-center mt-3 ml-2 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
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
                class="items-center justify-center mx-auto"
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
