import React, { useState} from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { IoEye, IoReceiptOutline } from "react-icons/io5";
import { Button } from "@material-tailwind/react";
import MethodSelect from "./MethodSelect";

export default function SelfExpense({
  personOwing,
  theme,
  lang,
  loggedInUsername,
  loggedInUserEmail,
  dataThrow,
  user,
  handleAddSelfSubmit,
  selectSelf,
  editSelf,
  setSelfExpense,
  toggleTheme,
  setPersonReceiptAmount,
}) {
  
  const [selectPersonReceipt, setSelectPersonReceipt] = useState(true);
  const [selectMethodManual, setSelectMethodManual] = useState(false);
  const [selectMethodPicture, setSelectMethodPicture] = useState(false);
  const [selectedModalPerson, setSelectedModalPerson] = useState();
  const [showMethodSelectModal, setShowMethodSelectModal] = useState(false);
  const [selectPersonList, setSelectPersonList] = useState(true);

  const selfId = user.attributes.sub;
  const handlePersonalExpenseClick = async () => {
    editSelf(selfId, loggedInUserEmail);
    setSelfExpense(true);
    const personalExpenseEntry = dataThrow.find(
      (item) =>
        item.UserEmail === loggedInUserEmail && item.Email === loggedInUserEmail
    );
  
    if (personalExpenseEntry) {
      selectSelf(user.attributes.sub);
      setShowMethodSelectModal(true); 
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
        setShowMethodSelectModal(true);
      } catch (error) {
        console.error("Error creating item:", error);
      }
    }
  };

  const handleSelfClick = () => {
    setShowMethodSelectModal(true);
    editSelf(selfId, loggedInUserEmail);
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
                onClick={handleSelfClick}
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
      {showMethodSelectModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{ marginTop: "-300px" }}>
          <div className="bg-white p-6 rounded-lg">
            <MethodSelect
              lang={lang}
              theme={theme}
              setSelectMethodManual={setSelectMethodManual}
              setSelectMethodPicture={setSelectMethodPicture}
              setSelectPersonReceipt={setSelectPersonReceipt}
              setPersonReceiptAmount={setPersonReceiptAmount}
              selectedModalPerson={selectedModalPerson}
              selectMethodPicture={selectMethodPicture}
              selectMethodManual={selectMethodManual}
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
