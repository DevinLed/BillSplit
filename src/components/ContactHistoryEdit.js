import React from "react";
import { useState, useRef, useEffect, useMemo } from "react";
import "./../index.css";
import { IoSaveOutline, IoCloseCircleOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";
import { useParams } from "react-router-dom";

import EditPerson from "./EditPerson";
import Header from "./Header";
export default function ContactHistoryEdit({
  theme,
  lang,
  addPerson,
  setAddPerson,
  selectPerson,
  personName,
  personEmail,
  personPhone,
  personOwing,
  ContactId,
  UserEmail,
  passedId,
  setPersonName,
  setPersonEmail,
  setPersonPhone,
  setPersonOwing,
  handleSubmit,
  handleEditSubmit,
  setPersonState,
  personState,
  setIsSelected,
  editPerson,
  setEditPerson,
  editRow,
  value,
  setValue,
  handleAddSubmit,
  setLang,
  loggedInUserEmail,
  setFormSubmitted,
  handleDeletePerson,
  dataThrow,
  setDataThrow,
  updateDataHandler,
  user,
  API_URL,
  updateEditHandler,
  combinedArray,
  submissionArray,
  setSelfValue,
  selfValue,
  loggedInUsername
}) {
  const [selectEditPersonList, setEditSelectPersonList] = useState(true);
  const { id } = useParams();
  const [selectedPerson, setSelectedPerson] = useState("");
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://48f95wy514.execute-api.us-east-1.amazonaws.com/prod/transaction"
        );
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSelectedPerson(personEmail);
  }, [personEmail, selectedPerson]);
  const filteredTransactions = useMemo(() => {
    if (selectedPerson && loggedInUserEmail) {
      return transactions.filter(
        (transaction) =>
          (transaction.personEmail === selectedPerson &&
            transaction.loggedInUserEmail === loggedInUserEmail) ||
          (transaction.personEmail === loggedInUserEmail &&
            transaction.loggedInUserEmail === selectedPerson)
      );
    } else {
      return transactions;
    }
  }, [transactions, selectedPerson, loggedInUserEmail]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const handleLabelClick = (transaction) => {
    setSelectedTransaction(transaction);
    toggleExpanded();
  };
  const transactionList = useMemo(() => {
    const sortedTransactions = [...filteredTransactions].sort(
      (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)
    );

    return sortedTransactions.map((transaction, index) => {
      const startDate =
        transaction.startDate instanceof Date
          ? transaction.startDate.toLocaleDateString("en-US")
          : "";

      return (
        <main key={index}>
          <div
            className=" th-py-2 th-my-2 th-px-0"
            id="th-invoice-POS"
            onClick={() => {
              handleLabelClick(transaction);
            }}
          >
            <div>
              <div className="flex justify-center items-center">
                <p className="font-bold">
                  {lang === "english" ? "Submitted By" : "Proposé par"}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <p className="font-bold">{transaction.loggedInUsername === loggedInUsername ? lang === "english" ? "you" : "vous" : transaction.loggedInUsername}</p>
              </div>

              <div className="flex justify-center items-center mt-2">
                {transaction.merchantName && (
                  <p>{`${transaction.merchantName}`}</p>
                )}
              </div>

              <div className="flex justify-center items-center mt-2">
                <p className="text-sm">{startDate}</p>
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <p className="text-sm">
                {transaction.selectedValue === "you"
                  ? lang === "english"
                    ? "You are Owed"
                    : "On vous doit"
                  : lang === "english"
                  ? "You owe"
                  : "Tu dois"}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <p className="font-bold">
                $
                {(
                  parseFloat(transaction.personReceiptAmount) +
                  parseFloat(transaction.taxActual)
                ).toFixed(2)}
              </p>
            </div>

            <div className="flex justify-center items-center">
              {transaction.taxActual !== 0 && (
                <p className="text-sm mt-2">
                  {lang === "english" ? "Taxes: " : "Impôts: "}
                  {`$${
                    isNaN(transaction.taxActual)
                      ? 0
                      : Math.abs(parseFloat(transaction.taxActual)).toFixed(2)
                  }`}
                </p>
              )}
            </div>
            <tr className="th-tabletitle">
              <td className="th-item">
                <h2 className="th-h2">Item</h2>
              </td>
              <td className="th-Hours">
                <h2 className="th-h21">%</h2>
              </td>
              <td className="th-Rate">
                <h2 className="th-h2">Total</h2>
              </td>
            </tr>

            {transaction.submissionArray.map((item, index) => (
              <tr className="th-service" key={index}>
                <td className="th-tableitem">
                  <p className="th-itemtext1">
                    {item.description
                      ? item.description.slice(0, 4) + ".."
                      : item.name.slice(0, 4) + ".."}
                  </p>
                </td>
                <td className="th-tableitem">
                  <p className="th-itemtext2">{item.sliderValue}%</p>
                </td>
                <td className="th-tableitem">
                  <p className="th-itemtext3">
                    {item.total_amount || item.amount}
                  </p>
                </td>
              </tr>
            ))}

            <div className="flex justify-center items-center mt-2">
              <p className="text-sm">
                {lang === "english" ? "Receipt Total" : "Total des reçus"}: $
                {transaction.receiptTotal || 0}
              </p>
            </div>

            <div className="flex justify-center items-center mt-2">
              {transaction.invoiceNumber ? (
                <div>
                  <p className="text-sm mb-2">{`Invoice Number: ${transaction.invoiceNumber}`}</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </main>
      );
    });
  }, [filteredTransactions]);

  const noTransactionsMessage = useMemo(() => {
    if (filteredTransactions.length === 0) {
      return (
        <p>
          {lang === "english"
            ? "No transactions found"
            : "Aucune transaction trouvée"}
        </p>
      );
    }
    return null;
  }, [filteredTransactions]);

  const personNames = useMemo(() => {
    const uniquePersons = Array.from(
      new Set(transactions.map((transaction) => transaction.personName))
    );
    return uniquePersons;
  }, [transactions]);

  const [showEditPerson, setShowEditPerson] = useState(false);
  const toggleEditPerson = () => {
    setShowEditPerson(!showEditPerson);
  };

  return (
    <>
      <main
        className="flex flex-col items-center justify-center w-full max-w-xl mx-auto bg-white-500 mt-1 rounded p-0 pt-3 shadow sm:max-w-xl md:max-w-2xl lg:max-w-4xl"
        style={{ maxWidth: "600px" }}
      >
        <Header
          selectEditPersonList={selectEditPersonList}
          theme={theme}
          lang={lang}
        />
        {!selfValue ? (<button
          onClick={toggleEditPerson}
          className={
            "mt-4 mb-4 mb-0 flex h-24 w-fit flex-col items-center justify-center rounded-lg border " +
            (theme === "dark"
              ? "border-gray-900 bg-gray-900 text-white"
              : "border-gray-200 bg-white text-gray-800") +
            " py-4 px-10 text-sm font-semibold shadow-md hover:bg-gray-800 hover:no-underline"
          }
        >
          {lang === "english"
            ? "Edit contact details"
            : "Modifier les coordonnées"}
        </button>) : ("") } 
        
        {showEditPerson && (
          <EditPerson
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
            passedId={passedId}
            handleEditSubmit={handleEditSubmit}
            setPersonState={setPersonState}
            personState={personState}
            setIsSelected={setIsSelected}
            setEditPerson={setEditPerson}
            theme={theme}
            editPerson={editPerson}
            handleDeletePerson={handleDeletePerson}
            lang={lang}
            dataThrow={dataThrow}
            setDataThrow={setDataThrow}
            loggedInUserEmail={loggedInUserEmail}
            API_URL={API_URL}
            updateDataHandler={updateDataHandler}
            updateEditHandler={updateEditHandler}
            user={user}
          ></EditPerson>
        )}
        <div className="flex flex-col items-center justify-center">
          <div
            className={
              "custom-rounded px-3 py-2 mb-4 mx-auto" +
              (theme === "dark"
                ? "bg-gray-800 text-black"
                : "bg-white text-gray-800")
            }
          >
            {transactionList.length > 0
              ? transactionList
              : noTransactionsMessage}
          </div>
        </div>
        <CSSTransition
          in={isExpanded}
          timeout={300}
          classNames="modal"
          unmountOnExit
        >
          <div className="modal-overlay">
            {selectedTransaction && (
              <div
                className={
                  " th-py-2 th-my-2 th-px-0 " +
                  (theme === "dark"
                    ? "bg-gray-800 text-black"
                    : "bg-white text-gray-800")
                }
                id="th-invoice-POS2"
                onClick={() => {
                  handleLabelClick(selectedTransaction);
                }}
              >
                <div>
                  <div className="flex justify-center items-center">
                    <p className="font-bold">Submitted by</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="font-bold">
                      {selectedTransaction.loggedInUsername}
                    </p>
                  </div>

                  <div className="flex justify-center items-center mt-2">
                    {selectedTransaction.merchantName && (
                      <p>{`${selectedTransaction.merchantName}`}</p>
                    )}
                  </div>

                  <div className="flex justify-center items-center mt-2">
                    <p className="text-sm">{selectedTransaction.startDate}</p>
                  </div>
                </div>
                <div className="flex justify-center items-center mt-2">
                  <p className="text-sm">
                    {selectedTransaction.selectedValue === "you"
                      ? lang === "english"
                        ? "You are Owed"
                        : "On vous doit"
                      : lang === "english"
                      ? "You owe"
                      : "Tu dois"}
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <p className="font-bold">
                    $
                    {(
                      parseFloat(selectedTransaction.personReceiptAmount) +
                      parseFloat(selectedTransaction.taxActual)
                    ).toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-center items-center">
                  {selectedTransaction.taxActual !== 0 && (
                    <p className="text-sm mt-2">
                      {lang === "english" ? "Taxes: " : "Impôts: "}
                      {`$${
                        isNaN(selectedTransaction.taxActual)
                          ? 0
                          : Math.abs(
                              parseFloat(selectedTransaction.taxActual)
                            ).toFixed(2)
                      }`}
                    </p>
                  )}
                </div>
                <table>
                  <tr className="th-tabletitle">
                    <td className="th-item">
                      <h2>Item</h2>
                    </td>
                    <td className="th-Hours">
                      <h2>%</h2>
                    </td>
                    <td className="th-Rate">
                      <h2>Total</h2>
                    </td>
                  </tr>

                  {selectedTransaction.submissionArray.map((item, index) => (
                    <tr className="th-service" key={index}>
                      <td className="th-tableitemEx">
                        <p className="th-itemtext1">
                          {item.description
                            ? item.description.slice(0, 8) + ".."
                            : item.name.slice(0, 4) + ".."}
                        </p>
                      </td>
                      <td className="th-tableitem">
                        <p className="th-itemtext2">{item.sliderValue}%</p>
                      </td>
                      <td className="th-tableitem">
                        <p className="th-itemtext3">
                          {item.total_amount || item.amount}
                        </p>
                      </td>
                    </tr>
                  ))}
                </table>

                <div className="flex justify-center items-center mt-2">
                  <p className="text-sm">
                    {lang === "english" ? "Receipt Total" : "Total des reçus"}:
                    ${selectedTransaction.receiptTotal || 0}
                  </p>
                </div>

                <div className="flex justify-center items-center mt-2">
                  {selectedTransaction.invoiceNumber ? (
                    <div>
                      <p className="text-sm mb-2">{`Invoice Number: ${selectedTransaction.invoiceNumber}`}</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
          </div>
        </CSSTransition>
      </main>
    </>
  );
}
