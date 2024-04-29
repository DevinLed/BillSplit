import { React, useState, useEffect } from "react";
import "../index.css";
import { CSSTransition } from "react-transition-group";
import { IoSaveOutline, IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "@material-tailwind/react";

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
  value,
  formSubmitted,
  setFormSubmitted,
  theme,
  handleAddSubmit,
  lang,
  loggedInUserEmail,
}) {
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [errorBalance, setErrorBalance] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorSameUser, setErrorSameUser] = useState(true);
  const [errorCurrentUser, setErrorCurrentUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submissionError, setSubmissionError] = useState(true);
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

  const formatPhoneNumber = (inputValue) => {
    const numbersOnly = inputValue.replace(/[^\d]/g, ""); // Remove all non-numeric characters
    if (numbersOnly.length <= 3) return numbersOnly;
    if (numbersOnly.length <= 6)
      return `(${numbersOnly.slice(0, 3)}) ${numbersOnly.slice(3)}`;
    return `(${numbersOnly.slice(0, 3)}) ${numbersOnly.slice(
      3,
      6
    )}-${numbersOnly.slice(6, 10)}`;
  };

  const handlePhoneNumberChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = formatPhoneNumber(inputValue);
    setPersonPhone(formattedValue);

    const phoneNumberRegex = /^\(\d{3}\) \d{3}-\d{4}$/; // matches a phone number in the format of (XXX) XXX-XXXX
    const isValid = phoneNumberRegex.test(formattedValue);
    setIsValidPhoneNumber(isValid);

    // Check if the input is a valid phone number
    if (isValid) {
      setErrorPhone(true);
      console.log("phone accepted");
    } else {
      setIsValidPhoneNumber(false);
      setErrorPhone(false);
      console.log("error in phone input");
    }
  };

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setPersonEmail(inputEmail);
    setErrorEmail(false);
    if (inputEmail === loggedInUserEmail) {
      setErrorSameUser(true);
      setErrorCurrentUser(true);
    } else {
      // Check if email contains "@"
      if (inputEmail.includes("@")) {
        setIsValidEmail(true);
        setErrorEmail(true);
        console.log("email verified");
      } else {
        setIsValidEmail(false);
      }
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
              <h3 className="text-xl font-semibold">
                {lang === "english" ? "Add a Person" : "Ajouter une personne"}
              </h3>
            </div>

            <div className="pt-4 pr-4 pl-4 pb-1">
              <div className="text-center">
                <div className="mb-4">
                  <label htmlFor="colFormLabel" className="sr-only">
                    {lang === "english" ? "Name" : "Nom"}
                  </label>
                  <input
                    type="name"
                    className="form-control w-full py-2 px-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    id="colFormLabel"
                    placeholder={lang === "english" ? "Name" : "Nom"}
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
                    {lang === "english"
                      ? "Phone Number"
                      : "Numéro de téléphone"}
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
                    placeholder={
                      lang === "english"
                        ? "Phone Number"
                        : "Numéro de téléphone"
                    }
                    value={formSubmitted ? "" : formatPhoneNumber(personPhone)}
                    onChange={handlePhoneNumberChange}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="colFormLabel" className="sr-only">
                    E-mail
                  </label>
                  <input
                    autoComplete="off"
                    type="email"
                    className={`form-control w-full py-2 px-3 rounded-lg focus:outline-none focus:ring ${
                      isValidEmail && !errorCurrentUser
                        ? "ring-green-300"
                        : "ring-red-300"
                    }`}
                    id="colFormLabel"
                    placeholder="E-mail"
                    onKeyDown={handleKeyDown}
                    value={formSubmitted ? "" : personEmail}
                    onChange={handleEmailChange}
                  />
                  {errorCurrentUser && (
                    <p className="text-red-500 text-sm text-center mb-2">
                      {lang === "english"
                        ? "You can't add yourself."
                        : "Tu ne peux pas t'ajouter."}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="colFormLabel"
                    className={
                      "label-one-line " +
                      (theme === "dark" ? "text-white" : "text-gray-800")
                    }
                  >
                    {lang === "english"
                      ? "Starting balance?"
                      : "Solde de départ?"}
                  </label>
                </div>

                <div className="mb-4">
                  <CSSTransition
                    in={true}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                  >
                    <div
                      className="flex items-center mb-3 justify-center"
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
                              setErrorMsg(
                                lang === "english"
                                  ? "Please enter a valid number"
                                  : "S'il vous plait, entrez un nombre valide"
                              );
                            }
                          }}
                          style={{ borderColor: "lightblue" }}
                        />
                      </div>
                    </div>
                  </CSSTransition>
                </div>

                {errorMsg && (
                  <div className="text-red-500 text-sm text-center mt-12">
                    {errorMsg}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center p-2 space-x-4">
              <Button
                variant="gradient"
                className="gradient-btn mb-2 flex items-center justify-center"
                style={{ margin: "auto" }}
                onClick={(e) => {
                  setAddPerson(false);
                  setFormSubmitted(true);
                  resetForm();
                }}
              >
                <div className="flex items-center">
                  <IoCloseCircleOutline size={24} />
                  <span className="text-white ml-2">
                    {lang === "english" ? "Cancel" : "Annuler"}
                  </span>
                </div>
              </Button>

              <Button
                variant="gradient"
                className="gradient-btn mb-2 flex items-center justify-center"
                style={{ margin: "auto" }}
                onClick={(e) => {
                  if (
                    errorBalance &&
                    errorPhone &&
                    errorEmail &&
                    errorSameUser
                  ) {
                    handleAddSubmit(e);
                    setFormSubmitted(true);
                    resetForm();
                  } else {
                    setSubmissionError(false);
                  }
                }}
              >
                <IoSaveOutline size={24} />
                <span className="text-white ml-2">
                  {lang === "english" ? "Save" : "Enregistrer"}
                </span>
              </Button>
            </div>

            {!submissionError && (
              <p className="text-red-500 text-sm text-center mb-2">
                {lang === "english"
                  ? "Please complete all fields correctly."
                  : "Veuillez remplir tous les champs correctement."}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
