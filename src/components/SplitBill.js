import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddPerson from "./AddPerson";
import AddGroup from "./AddGroup"; // Import AddGroup component
import Header from "./Header";
import { IoPersonAddSharp } from "react-icons/io5";
import Avatar from "react-avatar";
import { CSSTransition } from "react-transition-group";
import { Button } from "@material-tailwind/react";
import MethodSelect from "./MethodSelect";

export default function SplitBill({
  addPerson,
  setAddPerson,
  selectPerson,
  personName,
  personEmail,
  personPhone,
  personOwing,
  setPersonName,
  setPersonEmail,
  setPersonPhone,
  setPersonOwing,
  handleSubmit,
  setPersonState,
  personState,
  setIsSelected,
  list,
  value,
  setValue,
  addNum,
  subNum,
  personReceiptAmount,
  setFormSubmitted,
  theme,
  handleAddSubmit,
  lang,
  loggedInUserEmail,
  dataThrow,
  user,
  setSelfExpense,
  setPersonReceiptAmount,
  toggleTheme
}) {
  const [selectPersonReceipt, setSelectPersonReceipt] = useState(true);
  const [selectMethodManual, setSelectMethodManual] = useState(false);
  const [selectMethodPicture, setSelectMethodPicture] = useState(false);
  const [selectPersonList, setSelectPersonList] = useState(true);
  const [selectedModalPerson, setSelectedModalPerson] = useState();
  const [showMethodSelectModal, setShowMethodSelectModal] = useState(false);
  const [addGroup, setAddGroup] = useState(false); // State for AddGroup component
  const isEmptyDataThrow =
    !dataThrow ||
    dataThrow.filter(
      (item) =>
        item.UserEmail === loggedInUserEmail &&
        !(
          item.UserEmail === loggedInUserEmail &&
          item.Email === loggedInUserEmail
        )
    ).length === 0;

  useEffect(() => {
    setSelfExpense(false);
  }, []);

  return (
    <>
      <main
        className="xs:max-w-xl bg-white-500 mt-1 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
        style={{ maxWidth: "600px" }}
      >
        <Header selectPersonList={selectPersonList} lang={lang} theme={theme} toggleTheme={toggleTheme}/>
        <div className="flex flex-col items-center justify-center">
          {isEmptyDataThrow ? (
            <div className="mb-5">
              <Button
                variant="gradient"
                className="gradient-btn mb-2 flex items-center justify-center glow pulsing"
                style={{ margin: "auto" }}
                onClick={() => {
                  setAddPerson(true);
                  setFormSubmitted(true);
                }}
              >
                <div className="flex items-center">
                  <IoPersonAddSharp size={24} />
                  <span className="text-white ml-2">
                    {lang === "english" ? "Add a Friend First" : "Ajoutez d'abord un ami"}
                  </span>
                </div>
              </Button>
            </div>
          ) : (
            <>
              <ul className="max-w-md mb-3 p-2 divide-y divide-gray-200 dark:divide-gray-700 bg-gray-800 dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                {dataThrow
                  .filter(
                    (item) =>
                      item.UserEmail === loggedInUserEmail &&
                      !(
                        item.UserEmail === loggedInUserEmail &&
                        item.Email === loggedInUserEmail
                      )
                  )
                  .map((item, index) => (
                      <Link
                        onClick={() => {
                          selectPerson(item.ContactId);
                          setShowMethodSelectModal(true);
                          setSelectedModalPerson(item.ContactId);
                        }}
                        className="no-underline"
                      >
                    <li key={index} className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <div className="flex-shrink-0">
                            <Avatar name={item.Name} size={32} round />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-100 truncate dark:text-white">
                              {item.Name}
                            </p>
                            <p className="text-sm text-gray-400 truncate dark:text-gray-400">
                              {item.Email.length > 15
                                ? `${item.Email.substring(0, 15)}...`
                                : item.Email}
                            </p>
                          </div>
                          <div
                            className={`inline-flex items-center text-base font-semibold ${
                              parseFloat(item.Owing) < 0
                                ? "text-red-500"
                                : "text-blue-500"
                            }`}
                          >
                            ${parseFloat(item.Owing).toFixed(2)}
                          </div>
                        </div>
                    </li>
                      </Link>
                  ))}
              </ul>
              <div className="mb-5 flex space-x-4">
                <Button
                  variant="gradient"
                  className="gradient-btn mb-2 flex items-center justify-center"
                  style={{ margin: "auto" }}
                  onClick={() => {
                    setAddPerson(true);
                    setFormSubmitted(true);
                  }}
                >
                  <div className="flex items-center">
                    <IoPersonAddSharp size={24} />
                    <span className="text-white ml-2">
                      {lang === "english"
                        ? "Add Person"
                        : "Ajouter Une Personne"}
                    </span>
                  </div>
                </Button>
                <Button
                  variant="gradient"
                  className="gradient-btn mb-2 flex items-center justify-center"
                  style={{ margin: "auto" }}
                  onClick={() => {
                    setAddGroup(true);
                    setFormSubmitted(true);
                  }}
                >
                  <div className="flex items-center">
                    <IoPersonAddSharp size={24} />
                    <span className="text-white ml-2">
                      {lang === "english"
                        ? "Add Group"
                        : "Ajouter Un Groupe"}
                    </span>
                  </div>
                </Button>
              </div>
            </>
          )}
        </div>

        <CSSTransition
          in={addPerson}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <AddPerson
            addPerson={addPerson}
            setAddPerson={setAddPerson}
            personName={personName}
            setPersonName={setPersonName}
            setPersonPhone={setPersonPhone}
            setPersonEmail={setPersonEmail}
            setPersonOwing={setPersonOwing}
            personEmail={personEmail}
            personPhone={personPhone}
            personOwing={personOwing}
            handleSubmit={handleSubmit}
            setPersonState={setPersonState}
            personState={personState}
            setIsSelected={setIsSelected}
            value={value}
            setValue={setValue}
            addNum={addNum}
            subNum={subNum}
            personReceiptAmount={personReceiptAmount}
            setFormSubmitted={setFormSubmitted}
            theme={theme}
            handleAddSubmit={handleAddSubmit}
            lang={lang}
            loggedInUserEmail={loggedInUserEmail}
          />
        </CSSTransition>

        <CSSTransition
          in={addGroup}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <AddGroup
            setAddGroup={setAddGroup}
            theme={theme}
            handleAddGroupSubmit={(people) => {
              // Handle the group submission
              console.log('Group submitted:', people);
              // Add your logic to handle the group data
            }}
            lang={lang}
            loggedInUserEmail={loggedInUserEmail}
          />
        </CSSTransition>
      </main>
      {showMethodSelectModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"  style={{ marginTop: "-300px" }}>
          <div className="bg-white p-6 rounded-lg">
            <MethodSelect
              lang={lang}
              setSelectMethodManual={setSelectMethodManual}
              setSelectMethodPicture={setSelectMethodPicture}
              setSelectPersonReceipt={setSelectPersonReceipt}
              setPersonReceiptAmount={setPersonReceiptAmount}
              selectedModalPerson={selectedModalPerson}
              selectMethodPicture={selectMethodPicture}
              selectMethodManual={selectMethodManual}
              theme={theme}
            />
            <Button
              variant="gradient"
              className="gradient-btn mb-2 flex items-center justify-center"
              style={{ margin: "auto" }}
              onClick={() => setShowMethodSelectModal(false)}
            >
              <div className="flex items-center">
                <span className="text-white">
                  {lang === "english" ? "Close" : "Fermer"}
                </span>
              </div>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
