import { React, useState, useEffect } from "react";
import "../index.css";
import { CSSTransition } from "react-transition-group";
import { IoSaveOutline, IoCloseCircleOutline } from "react-icons/io5";

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
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-opacity-50 bg-gray-900"
        style={{ marginTop: "-90px" }}
      >
        <div className="relative w-full max-w-md">
          <div
            className={
              theme === "dark"
                ? "bg-gray-800 border border-gray-300 rounded-lg shadow-lg overflow-hidden"
                : "bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
            }
          >
            <div className="flex items-center justify-evenly p-4 border-b border-gray-300">
              <h3 className="text-xl font-semibold">Add A Person</h3>
            </div>

            <div className="p-4">
              <div className="text-center">
                <div className="mb-4">
                  <label htmlFor="colFormLabel" className="sr-only">
                    Name
                  </label>
                  <input
                    type="name"
                    className="form-control w-full py-2 px-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
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

                <div className="mb-4">
                  <label htmlFor="colFormLabel" className="sr-only">
                    Phone
                  </label>
                  <input
                    autoComplete="off"
                    type="phone"
                    className={`form-control w-full py-2 px-3 rounded-lg focus:outline-none focus:ring ${
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
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="colFormLabel" className="sr-only">
                    Email
                  </label>
                  <input
                    autoComplete="off"
                    type="email"
                    className={`form-control w-full py-2 px-3 rounded-lg focus:outline-none focus:ring ${
                      isValidEmail ? "ring-green-300" : "ring-red-300"
                    }`}
                    id="colFormLabel"
                    placeholder="Email"
                    onKeyDown={handleKeyDown}
                    value={formSubmitted ? "" : personEmail}
                    onChange={handleEmailChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="colFormLabel"
                    className={
                      "label-one-line " +
                      (theme === "dark" ? "text-white" : "text-gray-800")
                    }
                  >
                    Starting balance?
                  </label>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-center mb-2">
                  <label className="inline-flex items-center cursor-pointer">
  <input
    type="radio"
    className={`form-radio h-4 w-4 text-blue-500 ${
      showInput ? "border-blue-500" : "border-gray-400"
    }`}
    onClick={(e) => {
      setShowInput(false);
      handleNoButtonClick(e);
      setErrorBalance(true);
      setPersonOwing("0.00");
    }}
    disabled={!showInput}
    checked={!showInput}
  />
  <span
    className={`ml-2 ${
      theme === "dark"
        ? showInput
          ? "text-gray-400"
          : "text-white"
        : showInput
        ? "text-gray-400"
        : "text-black"
    }`}
  >
    No
  </span>
</label>

<label className="ml-8 inline-flex items-center cursor-pointer">
  <input
    type="radio"
    className={`form-radio h-4 w-4 text-blue-500 ${
      showInput ? "border-gray-400" : "border-blue-500"
    }`}
    onClick={() => setShowInput(true)}
    disabled={showInput}
    checked={showInput}
  />
  <span
    className={`ml-2 ${
      theme === "dark"
        ? showInput
          ? "text-white"
          : "text-gray-400"
        : showInput
        ? "text-black"
        : "text-gray-400"
    }`}
  >
    Yes
  </span>
</label>

                  </div>

                  <CSSTransition
                    in={showInput}
                    timeout={300} // Adjust the duration of the transition as needed
                    classNames="fade"
                    unmountOnExit
                  >
                    <div
                      className="mb-2 flex items-center justify-center"
                      style={{ height: "40px" }}
                    >
                      {/* Set a fixed height for the div */}
                      <div className="flex items-center align-items-center">
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
                          className={`form-control max-six-digits mb-0 rounded-start ${
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
                    </div>
                  </CSSTransition>
                </div>

                {errorMsg && (
                  <div className="text-red-500 text-sm text-center mb-2">
                    {errorMsg}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center p-2 space-x-4">
  <label
    className={
      theme === "dark"
        ? "flex w-fit flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
        : "flex w-fit flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-800 hover:no-underline"
    }
    onClick={(e) => {
      setAddPerson(false);
      setFormSubmitted(true);
      resetForm();
    }}
  >
    <IoCloseCircleOutline size={24} />
  </label>

  <label
    className={
      theme === "dark"
        ? "flex w-fit flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
        : "flex w-fit flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-800 hover:no-underline"
    }
    onClick={(e) => {
      if (errorBalance && errorPhone && errorEmail) {
        handleSubmit(e);
        setFormSubmitted(true);
        resetForm();
      } else {
        console.log("nop");
        setSubmissionError(false);
      }
    }}
  >
    <IoSaveOutline size={24} />
  </label>
</div>


            {!submissionError && (
              <p className="text-red-500 text-sm text-center mb-2">
                Please complete all fields correctly.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
