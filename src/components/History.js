import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { Amplify, Auth } from "aws-amplify";
import { CSSTransition } from "react-transition-group";
import awsconfig from "../aws-exports";
import axios from 'axios';
Amplify.configure(awsconfig);

export default function History({
  theme,
  lang,
  loggedInUsername,
  historyData,
  setHistoryData,
}) {
  const { id } = useParams();
  const [selectedPerson, setSelectedPerson] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const loggedInUsername = user.username;
  
        // Fetch history data for the selected person based on the person's ID
        const response = await axios.get(`https://tbmb99cx6i.execute-api.us-east-1.amazonaws.com/dev/history/${id}`);
        const historyDataList = response.data;
  
        setHistoryData(historyDataList);
      } catch (error) {
        console.error("Error fetching HistoryData", error);
      }
    };
  
    fetchData();
  }, [id, setHistoryData]);
  

  const filteredReceipts = useMemo(() => {
    if (!Array.isArray(historyData)) {
      console.error("historyData is not an array:", historyData);
      return [];
    }

    if (selectedPerson) {
      return historyData.filter(
        (data) =>
          data.personName === selectedPerson &&
          data.username === loggedInUsername
      );
    } else {
      return historyData.filter((data) => data.username === loggedInUsername);
    }
  }, [historyData, selectedPerson, loggedInUsername]);

  const receiptList = useMemo(() => {
    return filteredReceipts
      .reverse()
      .slice(-10)
      .map((receipt, index) => {
        const startDate =
          receipt.startDate instanceof Date
            ? receipt.startDate.toLocaleDateString("en-US")
            : "";

        return (
          <div key={index} className="border-b border-gray-300 py-2 my-2 px-8">
            <div>
              <div className="flex justify-center items-center">
                <p className="font-bold">{receipt.personName}</p>
              </div>

              <div className="flex justify-center items-center mt-2">
                {receipt.merchantName && <p>{`${receipt.merchantName}`}</p>}
              </div>

              <div className="flex justify-center items-center mt-2">
                <p className="text-sm">{startDate}</p>
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <p className="text-sm">
                {receipt.selectedValue === "you"
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
                  parseFloat(receipt.personReceiptAmount) +
                  parseFloat(receipt.taxActual)
                ).toFixed(2)}
              </p>
            </div>

            <div className="flex justify-center items-center">
              {receipt.taxActual !== 0 && (
                <p className="text-sm mt-2">
                  {lang === "english" ? "Taxes: " : "Impôts: "}
                  {`$${
                    isNaN(receipt.taxActual)
                      ? 0
                      : Math.abs(parseFloat(receipt.taxActual)).toFixed(2)
                  }`}
                </p>
              )}
            </div>

            <div className="flex justify-center items-center mt-2">
              <p className="text-sm">
                {lang === "english" ? "Receipt Total" : "Total des reçus"}: $
                {receipt.receiptTotal || 0}
              </p>
            </div>

            <div className="flex justify-center items-center mt-2">
              {receipt.invoiceNumber ? (
                <div>
                  <p className="text-sm mb-2">{`Invoice Number: ${receipt.invoiceNumber}`}</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      });
  }, [filteredReceipts]);

  const noReceiptsMessage = useMemo(() => {
    if (filteredReceipts.length === 0) {
      return <p>No receipts found.</p>;
    }
    return null;
  }, [filteredReceipts]);

  const personNames = useMemo(() => {
    const uniquePersons = Array.from(
      new Set(filteredReceipts.map((data) => data.personName))
    );
    return uniquePersons;
  }, [filteredReceipts]);

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

            {receiptList.length > 0 ? receiptList : noReceiptsMessage}
          </div>
        </div>
      </main>
    </>
  );
}
