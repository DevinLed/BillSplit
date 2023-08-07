import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

import { CSSTransition } from "react-transition-group";

export default function History({ receipts, theme, lang, setLang }) {
  const { id } = useParams();
  const [selectedPerson, setSelectedPerson] = useState("");

  const filteredReceipts = useMemo(() => {
    if (selectedPerson) {
      return receipts.filter(
        (receipt) => receipt.personName === selectedPerson
      );
    } else {
      return receipts;
    }
  }, [receipts, selectedPerson]);

  const receiptList = useMemo(() => {
    return filteredReceipts
      .slice(-10)
      .reverse()
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
                {receipt.selectedValue === "you" ? (lang === "english" ? "You are Owed" : "On vous doit") : (lang === "english" ? "You owe" : "Tu dois")}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <p className="font-bold">{`$${Math.abs(
                parseFloat(receipt.personReceiptAmount)
              ).toFixed(2)}`}</p>
            </div>

            <div className="flex justify-center items-center">
              <p className="text-sm">
                {receipt.selectedValue === "you"
                  ? (lang === "english" ? "Taxes owed: " : "Impôts dus: ")
                  : (lang === "english" ? "Taxes you owe: " : "Impôts que vous devez: ")}
                {`$${
                  isNaN(receipt.taxActual)
                    ? 0
                    : Math.abs(parseFloat(receipt.taxActual)).toFixed(2)
                }`}
              </p>
            </div>

            <div className="flex justify-center items-center mt-2">
              <p className="text-sm">
              {lang === "english" ? "Receipt Total" : "Total des reçus"}: ${receipt.receiptTotal || 0}
              </p>
            </div>
            <div className="flex justify-center items-center mt-2">
              {receipt.invoiceNumber && (
                <div>
                  <p className="text-sm mb-2">{`Invoice Number: ${receipt.invoiceNumber}`}</p>
                </div>
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
      new Set(receipts.map((receipt) => receipt.personName))
    );
    return uniquePersons;
  }, [receipts]);

  const handlePersonNameChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  return (
    <>
      <main
        className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
        style={{ maxWidth: "600px" }}
      >
        <Header showHistory={true} theme={theme}  lang={lang} />

        <div className="flex flex-col items-center justify-center">
          <div className="rounded-lg px-3 py-2 shadow-md mb-4 mx-auto">
            <div className="flex items-center justify-end mb-2">
              <label
                htmlFor="filterSelect"
                className={
                  "mr-2 " + (theme === "dark" ? "text-white" : "text-gray-800")
                }
              >
                {lang === "english" ? "Filter by Person" : "Filtrer par personne"}
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
