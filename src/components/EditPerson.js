import React from "react";
import { useState, useRef } from "react";
import "./../index.css";
import { IoSaveOutline, IoCloseCircleOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";
import { API, graphqlOperation, Amplify } from "aws-amplify";

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
  setList,
  lang,
  handleEditSubmit,
  passedEmail,
  dataThrow,
  setDataThrow,
  loggedInUserEmail,
  passedId,
  setPassedId,
  API_URL,
  updateDataHandler,
  updateEditHandler,
}) {
  const myElementRef = useRef(null);
  const handleResetBalance = () => {
    setPersonOwing("0.00");
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }
  const handleDeletePrompt = () => {
    console.log(passedId);
    setShowConfirmation(true);
  };
  const handleCancelDeletePrompt = () => {
    // Close the confirmation popup without deleting
    setShowConfirmation(false);
  };
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorBalance, setErrorBalance] = useState(true);
  const [errorName, setErrorName] = useState(true);
  const [errorPhone, setErrorPhone] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [submissionError, setSubmissionError] = useState(true);

  const handleNameChange = async (e, ContactId, ) => {
    const inputName = e.target.value;
    setPersonName(inputName);
    setErrorName(false);
  
    if (inputName.trim().length >= 1) {
      setIsValidName(true);
      setErrorName(true);
  
       
      try {
        const response = await fetch(`${API_URL}/${ContactId}`);

        if (response.status === 200) {
          console.log("User name updated");
        } else {
          console.error("Error updating user name");
        }
      } catch (error) {
        console.error("Error updating user name:", error);
      }
    } else {
      setIsValidPhoneNumber(false);
      setErrorPhone(false);
      console.log("Error in name input");
    }
  };
  
    

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

  const handleDeletePerson = (ContactId, passedId) => {
    const url = `${API_URL}/${ContactId}`;
    console.log(url);
    console.log(ContactId);

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          console.log("Person deleted successfully");
          console.log(passedId);
          const updatedData = dataThrow.filter(
            (item) => item.ContactId !== passedId
          );
          setDataThrow(updatedData);
          setEditPerson(false);
          updateEditHandler();
        } else {
          console.error("Failed to delete person");
        }
      })
      .catch((error) => {
        console.error("Error deleting person:", error);
      });
      
  };

  const handlePhoneNumberChange = async (
    event,
    ContactId,
  ) => {
    const inputValue = event.target.value;
    const formattedValue = formatPhoneNumber(inputValue);
    setPersonPhone(formattedValue);

    const phoneNumberRegex = /^\(\d{3}\) \d{3}-\d{4}$/; // matches a phone number in the format of (XXX) XXX-XXXX
    const isValid = phoneNumberRegex.test(formattedValue);
    setIsValidPhoneNumber(isValid);

    // Check if the input is a valid phone number
    if (isValid) {
      setErrorPhone(true);
      console.log("Phone accepted");

      try {
        const response = await fetch(`${API_URL}/${ContactId}`);

        if (response.status === 200) {
          console.log("User phone number updated");
        } else {
          console.error("Error updating user phone number");
        }
      } catch (error) {
        console.error("Error updating user phone number:", error);
      }
    } else {
      setIsValidPhoneNumber(false);
      setErrorPhone(false);
      console.log("Error in phone input");
    }
  };

  const handleEmailChange = async (
    event,
    ContactId,
    Name,
    Phone,
    Owing
  ) => {
    const inputEmail = event.target.value;
    setPersonEmail(inputEmail);
    setErrorEmail(false);

    // Check if email contains "@" (basic email format validation)
    if (inputEmail.includes("@")) {
      setIsValidEmail(true);
      setErrorEmail(true);
      console.log("Email verified");

      // Create an object with the updated email
      const updatedUserData = {
        id: ContactId,
        personName: Name,
        personPhone: Phone,
        personEmail: inputEmail,
        personOwing: Owing,
      };

      try {
        const response = await fetch(`${API_URL}/${ContactId}`);

        if (response.status === 200) {
          console.log("User email updated");
        } else {
          console.error("Error updating user email");
        }
      } catch (error) {
        console.error("Error updating user email:", error);
      }
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
              <h3 className="text-xl font-semibold">
                {lang === "english" ? "Edit Person" : "Modifier le contact"}
              </h3>
            </div>

            <div className="p-4">
              <div className="text-center">
                <div className="mb-2">
                  <label htmlFor="colFormLabel" className="sr-only">
                    {lang === "english" ? "Name" : "Nom"}
                  </label>
                  <input
                    type="name"
                    className={`form-control w-full rounded-lg py-2 px-3 focus:border-blue-300 focus:outline-none focus:ring ${
                      isValidName ? "ring-green-300" : "ring-red-300"
                    }`}
                    id="colFormLabel"
                    placeholder={lang === "english" ? "Name" : "Nom"}
                    value={personName}
                    onChange={handleNameChange}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="colFormLabel" className="sr-only">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className={`form-control w-full rounded-lg py-2 px-3 focus:outline-none focus:ring ${
                      isValidPhoneNumber ? "ring-green-300" : "ring-red-300"
                    } ${
                      personPhone.length >= 14 && !isValidPhoneNumber
                        ? "ring-red-300"
                        : ""
                    }`}
                    id="colFormLabel"
                    placeholder="(123) 456-7890"
                    value={formSubmitted ? "" : personPhone}
                    onChange={handlePhoneNumberChange}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="colFormLabel" className="sr-only">
                    E-mail
                  </label>
                  <input
                    type="email"
                    className={`form-control w-full rounded-lg py-2 px-3 focus:outline-none focus:ring ${
                      isValidEmail ? "ring-green-300" : "ring-red-300"
                    }`}
                    id="colFormLabel"
                    placeholder="E-mail"
                    value={formSubmitted ? "" : personEmail}
                    onChange={handleEmailChange}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="colFormLabel"
                    className={
                      theme === "dark"
                        ? "text-white label-one-line"
                        : "text-black label-one-line"
                    }
                  >
                    {lang === "english" ? "Balance?" : "Solde actuel?"}
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
                            setErrorMsg(
                              lang === "english"
                                ? "Please enter a valid number"
                                : "S'il vous plait, entrez un nombre valide"
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    className={
                      theme === "dark"
                        ? "flex w-fit flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-2 px-4 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
                        : "flex w-fit text-black flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-2 px-4 text-sm font-semibold shadow-md hover:bg-gray-800 hover:no-underline"
                    }
                    onClick={handleResetBalance} // Step 5: Call the function to reset the balance
                  >
                    {lang === "english" ? "Clear" : "Solde actuel vide"}
                  </button>
                </div>

                <div className="mb-2 text-center text-sm text-red-500">
                  {errorMsg}
                </div>
              </div>
            </div>
            <div className="flex justify-center p-2 space-x-4">
              <div className="flex justify-center p-2 space-x-4">
                <label
                  className={
                    theme === "dark"
                      ? "flex w-fit flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
                      : "flex w-fit flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-800 hover:no-underline"
                  }
                  onClick={(e) => handleDeletePrompt(passedId)}
                >
                  <AiOutlineDelete size={24} />
                </label>
              </div>
              <div className="flex justify-center p-2">
                <label
                  className={
                    theme === "dark"
                      ? "flex w-fit flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
                      : "flex w-fit flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-800 hover:no-underline"
                  }
                  onClick={(e) => {
                    if (errorBalance && errorPhone && errorEmail && errorName) {
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
              <div className="flex justify-center p-2">
                <label
                  className={
                    theme === "dark"
                      ? "flex w-fit flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
                      : "flex w-fit flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-800 hover:no-underline"
                  }
                  onClick={(e) => {
                      setEditPerson(false);
                  }}
                >
                  <IoCloseCircleOutline size={24} />
                </label>
              </div>
            </div>
            <CSSTransition
              in={showConfirmation}
              timeout={500}
              classNames="fade"
              unmountOnExit
              nodeRef={myElementRef}
            >
              <div
                ref={myElementRef}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
              >
                <div
                  className={
                    "p-6 rounded shadow-md " +
                    (theme === "dark" ? "bg-gray-800" : "bg-gray-100")
                  }
                >
                  <p>
                    {lang === "english"
                      ? "Are you sure you want to delete this person?"
                      : "Voulez-vous vraiment supprimer cette personne ?"}
                  </p>
                  <div className="flex justify-end mt-4">
                    <button
                      className={
                        "px-4 py-2 mr-2 rounded hover:bg-gray-900 " +
                        (theme === "dark"
                          ? "bg-gray-300 text-gray-800"
                          : "bg-gray-800")
                      }
                      onClick={(e) => {
                        setPersonEmail(passedEmail);
                        handleDeletePerson(passedId);
                        console.log(passedId);
                      }}
                    >
                      {lang === "english" ? "Yes" : "Oui"}
                    </button>
                    <button
                      className={
                        "px-4 py-2 rounded hover:bg-gray-900 " +
                        (theme === "dark"
                          ? "bg-gray-300 text-gray-800"
                          : "bg-gray-800")
                      }
                      onClick={handleCancelDeletePrompt}
                    >
                      {lang === "english" ? "No" : "Non"}
                    </button>
                  </div>
                </div>
              </div>
            </CSSTransition>
            {!submissionError && (
              <p className="mb-2 text-center text-sm text-red-500">
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
