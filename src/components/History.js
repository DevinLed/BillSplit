import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

export default function History({ theme, lang }) {
  const { id } = useParams();
  const [selectedPerson, setSelectedPerson] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://48f95wy514.execute-api.us-east-1.amazonaws.com/prod/transaction");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredTransactions = useMemo(() => {
    if (selectedPerson) {
      return transactions.filter((transaction) => transaction.personName === selectedPerson);
    } else {
      return transactions;
    }
  }, [transactions, selectedPerson]);

  const transactionList = useMemo(() => {
    return filteredTransactions.slice(-10).reverse().map((transaction, index) => {
      const startDate =
        transaction.startDate instanceof Date ? transaction.startDate.toLocaleDateString("en-US") : "";

      return (
        <div key={index} className="border-b border-gray-300 py-2 my-2 px-8">
          <div>
            <div className="flex justify-center items-center">
              <p className="font-bold">{transaction.personName}</p>
            </div>

            <div className="flex justify-center items-center mt-2">
              {transaction.merchantName && <p>{`${transaction.merchantName}`}</p>}
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
            ) : ""}
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
    const uniquePersons = Array.from(new Set(transactions.map((transaction) => transaction.personName)));
    return uniquePersons;
  }, [transactions]);

  const handlePersonNameChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  return (
    <>
      <main
        className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
        style={{ maxWidth: "600px" }}
      >
        <Header showHistory={true} theme={theme} lang={lang} />

        <div className="flex flex-col items-center justify-center">
          <div className="rounded-lg px-3 py-2 shadow-md mb-4 mx-auto">
            <div className="flex items-center justify-end mb-2">
              <label
                htmlFor="filterSelect"
                className={
                  "mr-2 " + (theme === "dark" ? "text-white" : "text-gray-800")
                }
              >
                {lang === "english"
                  ? "Filter by Person"
                  : "Filtrer par personne"}
              </label>

              <select
                id="filterSelect"
                className={
                  theme === "dark"
                    ? "bg-gray-900 px-2 py-1 border border-gray-300 rounded"
                    : "bg-gray-200 px-2 py-1 border border-gray-300 rounded"
                }
                value={selectedPerson}
                onChange={handlePersonNameChange}
              >
                <option value="">{lang === "english" ? "All" : "Tout"}</option>
                {personNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {transactionList.length > 0 ? transactionList : noTransactionsMessage}
          </div>
        </div>
      </main>
    </>
  );
}
