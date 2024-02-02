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
  passedId,
  setPassedId,
  updateDataHandler,
  user,
  API_URL,
  updateEditHandler,
  combinedArray,
  submissionArray,
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
    console.log("selectedPerson?", selectedPerson);
  }, [personEmail, selectedPerson]);
  const filteredTransactions = useMemo(() => {
    if (selectedPerson) {
      return transactions.filter(
        (transaction) => transaction.personEmail === selectedPerson
      );
    } else {
      return transactions;
    }
  }, [transactions, selectedPerson]);

  const [loading, setLoading] = useState(true);
  
  const transactionList = useMemo(() => {
    return filteredTransactions.map((transaction, index) => {
      const startDate =
        transaction.startDate instanceof Date
          ? transaction.startDate.toLocaleDateString("en-US")
          : "";

      return (
        <div
          key={index}
          className=" th-py-2 th-my-2 th-px-0"
          id="th-invoice-POS"
        >
          <div>
            <div className="flex justify-center items-center">
              <p className="font-bold">{transaction.personName}</p>
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
              <h2 className="th-h2">%</h2>
            </td>
            <td className="th-Rate">
              <h2 className="th-h2">Total</h2>
            </td>
          </tr>

          {transaction.submissionArray.map((item, index) => (
            <tr className="th-service" key={index}>
              <td className="th-tableitem">
                <p className="th-itemtext1">{item.name}</p>
              </td>
              <td className="th-tableitem">
                <p className="th-itemtext">{item.sliderValue}%</p>
              </td>
              <td className="th-tableitem">
                <p className="th-itemtext3">{item.amount}</p>
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
      );
    });
  }, [filteredTransactions]);

  const noTransactionsMessage = useMemo(() => {
    if (filteredTransactions.length === 0) {
      return <p>No transactions found.</p>;
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
        className="flex flex-col items-center justify-center w-full max-w-xl mx-auto bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:max-w-2xl lg:max-w-4xl"
        style={{ maxWidth: "600px" }}
      >
        <Header
          selectEditPersonList={selectEditPersonList}
          theme={theme}
          lang={lang}
        />
        <button
          onClick={toggleEditPerson}
          className={
            "mt-4 mb-4 mb-0 flex h-24 w-fit flex-col items-center justify-center rounded-lg border " +
            (theme === "dark"
              ? "border-gray-900 bg-gray-900 text-white"
              : "border-gray-200 bg-white text-gray-800") +
            " py-4 px-10 text-sm font-semibold shadow-md hover:bg-gray-800 hover:no-underline"
          }
        >
          Edit Contact Details
        </button>
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
            handleEditSubmit={handleEditSubmit}
            setPersonState={setPersonState}
            personState={personState}
            setIsSelected={setIsSelected}
            setEditPerson={setEditPerson}
            theme={theme}
            editPerson={editPerson}
            handleDeletePerson={handleDeletePerson}
            lang={lang}
            passedId={passedId}
            setPassedId={setPassedId}
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
        <div className="custom-rounded px-3 py-2 mb-4 mx-auto">
   <div className="flex items-center justify-end mb-2"></div>

            {transactionList.length > 0
              ? transactionList
              : noTransactionsMessage}
          </div>
        </div>
      </main>
    </>
  );
}
