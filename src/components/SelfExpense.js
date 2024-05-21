import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Routes, Link } from "react-router-dom";
import AddPerson from "./AddPerson";
import Header from "./Header";
import { IoPersonAddSharp, IoEye } from "react-icons/io5";
import Avatar from "react-avatar";
import { IoReceiptOutline } from "react-icons/io5";
import { GrView } from "react-icons/gr";
import { CSSTransition } from "react-transition-group";
import { API } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export default function SelfExpense({
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
  editSelf,
  selfValue,
  setSelfValue,
  selfExpense,
  setSelfExpense,
  toggleTheme
}) {
  const [selectPersonList, setSelectPersonList] = useState(true);
  const selfContactId = user.attributes.sub;
  const [selfAdded, setSelfAdded] = useState(false);

  const navigate = useNavigate();
  const selfId = user.attributes.sub;
  const [loading, setLoading] = useState(false);
  const handleSelfAdded = async () => {
    setSelfAdded(true);
    handlePersonalExpenseClick();
  };
  const handleNavigation = async () => {
    navigate(`/App/ReceiptInput/${user.attributes.sub}`);
  };
  const handlePersonalExpenseClick = async () => {
    setSelfExpense(true);
    const personalExpenseEntry = dataThrow.find(
      (item) =>
        item.UserEmail === loggedInUserEmail && item.Email === loggedInUserEmail
    );

    if (personalExpenseEntry) {
      selectSelf(user.attributes.sub);
      navigate(`/App/ReceiptInput/${user.attributes.sub}`);
    } else {
      try {
        const owingValue = 0;
        const itemData = {
          Name: loggedInUsername,
          Email: loggedInUserEmail,
          Phone: "5555555555",
          Owing: owingValue,
          UserEmail: loggedInUserEmail,
          UserName: loggedInUsername,
        };

        await handleAddSelfSubmit(itemData);
        await handleNavigation();
      } catch (error) {
        console.error("Error creating item:", error);
      }
    }
  };
  return (
    <>
      <main
        className="xs:max-w-xl bg-white-500 mt-1 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
        style={{ maxWidth: "600px" }}
      >
        <Header selectPersonList={selectPersonList} lang={lang} theme={theme} toggleTheme={toggleTheme}/>
        <div className="flex flex-col items-center justify-center">
          <Button
            variant="gradient"
            className="gradient-btn mb-2 flex items-center justify-center"
            style={{ margin: "auto" }}
            onClick={handlePersonalExpenseClick}
          >
            <div className="flex items-center justify-center flex-grow">
              <IoReceiptOutline size={32}/>
              <span className="ml-2">
                {lang === "english" ? "New Expense" : "Nouvelle dépense"}
              </span>
            </div>
          </Button>

          <ul className="m-0 py-1 w-2/5">
            <React.Fragment key={"save-with-myself"}>
              <Link
                setSelfValue={setSelfValue}
                selfValue={selfValue}
                loggedInUsername={loggedInUsername}
                to={{
                  pathname: "/App/ContactHistoryEdit",
                  state: {
                    personName: loggedInUsername,
                    personEmail: loggedInUserEmail,
                    personPhone: "5555555555",
                    personOwing: personOwing,
                    ContactId: selfId,
                    UserEmail: loggedInUserEmail,
                  },
                }}
                onClick={() => {
                  setSelfValue(true);
                  editSelf(selfId, loggedInUserEmail);
                }}
              >
                <Button
                  variant="gradient"
                  className="gradient-btn mb-2 flex items-center justify-center"
                  style={{ margin: "auto" }}
                >
                  <div className="flex items-center justify-center flex-grow">
              <IoEye size={32}/>
                    <span className="ml-2">
                      {lang === "english"
                        ? "View Expenses"
                        : "Afficher les dépenses"}
                    </span>
                  </div>
                </Button>
              </Link>
            </React.Fragment>
          </ul>
        </div>
      </main>
    </>
  );
}
