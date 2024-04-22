import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Routes, Link } from "react-router-dom";
import AddPerson from "./AddPerson";
import Header from "./Header";
import { IoPersonAddSharp } from "react-icons/io5";
import Avatar from "react-avatar";
import { CSSTransition } from "react-transition-group";
import { API } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

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
  setLang,
  loggedInUsername,
  loggedInUserEmail,
  dataThrow,
  API_URL,
  user,
  handleAddSelfSubmit,
  selectSelf,
  selfExpense,
  setSelfExpense,
}) {
  const [selectPersonList, setSelectPersonList] = useState(true);
  const selfContactId = user.attributes.sub;
  const [selfAdded, setSelfAdded] = useState(false);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigation = async () => {
    navigate(`/App/ReceiptInput/${user.attributes.sub}`);
  };
  useEffect(() => {
    setSelfExpense(false);
  }, []);

  return (
    <>
      <main
        className="xs:max-w-xl bg-white-500 mt-1 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
        style={{ maxWidth: "600px" }}
      >
        <Header selectPersonList={selectPersonList} lang={lang} theme={theme} />
        <div className="flex flex-col items-center justify-center">
          <ul className="m-0 py-1 w-3/4">
            {/* Table generator for people added */}
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
                <React.Fragment key={index}>
                  {item.Name ? (
                    <Link
                      to={`/App/ReceiptInput/${item.ContactId}`}
                      onClick={() => selectPerson(item.ContactId)}
                      className="no-underline py-1"
                    >
                      <li
                        className={
                          "list-group-item flex justify-between m-1 p-2 rounded-lg shadow-sm " +
                          (theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800")
                        }
                      >
                        <div className="flex items-center">
                          <Avatar name={item.Name} size={32} round />
                          <span className="ml-1">
                            {item.Name.length > 8
                              ? `${item.Name.substring(0, 8)}...`
                              : item.Name}
                          </span>
                        </div>
                        <span
                          className={`badge badge-pill rounded px-1 pt-2 ml-2 text-xs ${
                            parseFloat(item.Owing) < 0
                              ? "bg-red-500 text-black"
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          ${parseFloat(item.Owing).toFixed(2)}
                        </span>
                      </li>
                    </Link>
                  ) : null}
                </React.Fragment>
              ))}
          </ul>

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
                {lang === "english" ? "Add Person" : "Ajouter Une Personne"}
              </span>
            </div>
          </Button>
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
          ></AddPerson>
        </CSSTransition>
      </main>
    </>
  );
}
