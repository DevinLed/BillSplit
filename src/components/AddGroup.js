import React, { useState, useEffect } from "react";
import { IoSaveOutline, IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "@material-tailwind/react";
import { FaSpinner } from "react-icons/fa";

export default function AddGroup({
  setAddGroup,
  theme,
  handleAddGroupSubmit,
  lang,
  loggedInUserEmail,
}) {
  const initialPersonState = {
    name: "",
    phone: "",
    email: "",
  };

  const [numPeople, setNumPeople] = useState(1); // Number of people to add
  const [people, setPeople] = useState(Array.from({ length: numPeople }, () => ({ ...initialPersonState })));
  const [isValidPhoneNumbers, setIsValidPhoneNumbers] = useState(Array(numPeople).fill(false));
  const [isValidEmails, setIsValidEmails] = useState(Array(numPeople).fill(false));
  const [errors, setErrors] = useState(Array(numPeople).fill({ phone: false, email: false, sameUser: false }));
  const [submissionError, setSubmissionError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (index, value) => {
    const newPeople = [...people];
    newPeople[index] = { ...newPeople[index], name: value };
    setPeople(newPeople);
  };

  const handlePhoneNumberChange = (index, value) => {
    const newPeople = [...people];
    newPeople[index] = { ...newPeople[index], phone: value };
    setPeople(newPeople);

    const phoneNumberRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    const isValid = phoneNumberRegex.test(value);
    const newValidPhoneNumbers = [...isValidPhoneNumbers];
    newValidPhoneNumbers[index] = isValid;
    setIsValidPhoneNumbers(newValidPhoneNumbers);

    const newErrors = [...errors];
    newErrors[index] = { ...newErrors[index], phone: isValid };
    setErrors(newErrors);
  };

  const handleEmailChange = (index, value) => {
    const newPeople = [...people];
    newPeople[index] = { ...newPeople[index], email: value };
    setPeople(newPeople);

    const newErrors = [...errors];
    newErrors[index] = { ...newErrors[index], email: value.includes("@") && value !== loggedInUserEmail };
    newErrors[index].sameUser = value === loggedInUserEmail;
    setIsValidEmails(newErrors.map(error => error.email));

    setErrors(newErrors);
  };

  const resetForm = () => {
    setPeople(Array.from({ length: numPeople }, () => ({ ...initialPersonState })));
    setIsValidPhoneNumbers(Array(numPeople).fill(false));
    setIsValidEmails(Array(numPeople).fill(false));
    setErrors(Array(numPeople).fill({ phone: false, email: false, sameUser: false }));
    setSubmissionError(false);
  };

  useEffect(() => {
    resetForm();
  }, [numPeople]);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const allValid = errors.every(
        (error) => error.phone && error.email && !error.sameUser
      );
      if (allValid) {
        handleAddGroupSubmit(people);
        resetForm();
        setAddGroup(false);
      } else {
        setSubmissionError(true);
      }
    }, 2500);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-opacity-50 bg-gray-900">
        <div className="relative w-full max-w-md">
          <div className={`bg-${theme === "dark" ? "gray-800" : "white"} border border-gray-300 rounded-lg shadow-lg overflow-hidden`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
              <h3 className="text-xl font-semibold">
                {lang === "english" ? "Add a Group" : "Ajouter un groupe"}
              </h3>
              <button
                className="p-1 rounded hover:bg-gray-200"
                onClick={() => setAddGroup(false)}
              >
                <IoCloseCircleOutline size={24} />
              </button>
            </div>

            <div className="pt-4 pr-4 pl-4 pb-1">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "english" ? "Number of People" : "Nombre de personnes"}
                </label>
                <select
                  className="form-control w-full py-2 px-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2"
                  value={numPeople}
                  onChange={(e) => setNumPeople(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              {[...Array(numPeople)].map((_, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    className="form-control w-full py-2 px-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2"
                    placeholder={lang === "english" ? "Name" : "Nom"}
                    value={people[index] ? people[index].name : ""}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                  />

                  <input
                    type="tel"
                    className={`form-control w-full py-2 px-3 rounded-lg focus:outline-none focus:ring mb-2 ${isValidPhoneNumbers[index] ? "ring-green-300" : ""}`}
                    placeholder={lang === "english" ? "Phone Number" : "Numéro de téléphone"}
                    value={people[index] ? people[index].phone : ""}
                    onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                  />

                  <input
                    type="email"
                    className={`form-control w-full py-2 px-3 rounded-lg focus:outline-none focus:ring mb-2 ${isValidEmails[index] ? "ring-green-300" : ""}`}
                    placeholder="E-mail"
                    value={people[index] ? people[index].email : ""}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                  />

                  {errors[index] && errors[index].sameUser && (
                    <p className="text-red-500 text-sm text-center mb-2">
                      {lang === "english" ? "You can't add yourself." : "Tu ne peux pas t'ajouter."}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between p-4">
              <Button
                variant="gradient"
                className="gradient-btn flex items-center justify-center"
                onClick={() => setAddGroup(false)}
              >
                <IoCloseCircleOutline size={24} />
                <span className="text-white ml-2">
                  {lang === "english" ? "Cancel" : "Annuler"}
                </span>
              </Button>

              <Button
                variant="gradient"
                className="gradient-btn flex items-center justify-center"
                onClick={handleSubmit}
              >
                <IoSaveOutline size={24} />
                <span className="text-white ml-2">
                  {lang === "english" ? "Save" : "Enregistrer"}
                </span>
              </Button>
            </div>

            {submissionError && (
              <p className="text-red-500 text-sm text-center mb-2">
                {lang === "english" ? "Please complete all fields correctly." : "Veuillez remplir tous les champs correctement."}
              </p>
            )}
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg flex items-center justify-center">
            <FaSpinner className="animate-spin" size={48} color="darkblue" />
          </div>
        </div>
      )}
    </>
  );
}
