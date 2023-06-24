import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function History({ theme, receipts, isReceiptSubmitted, setIsReceiptSubmitted }) {
  const { id } = useParams();
  const [selectedPerson, setSelectedPerson] = useState("");

  const filteredReceipts = useMemo(() => {
    if (selectedPerson) {
      return receipts.filter((receipt) => receipt.personName === selectedPerson);
    } else {
      return receipts;
    }
  }, [receipts, selectedPerson]);

  const receiptList = useMemo(() => {
    return filteredReceipts
      .slice(-10)
      .map((receipt, index) => {
        return (
          <div key={index} className="border-b border-gray-300 py-2 my-2 px-8">
            <div>
              <div className="flex justify-center items-center">
                <p className="font-bold">{receipt.personName}</p>
              </div>

              <div className="flex justify-center items-center mt-2">
                {receipt.merchantName && (
                  <p>{`${receipt.merchantName}`}</p>
                )}
              </div>

             
            </div>
            <div className="flex justify-center items-center mt-2">
              <p className="text-sm">
                {receipt.selectedValue === "you" ? "You are owed" : "You owe"}
              </p>
            </div>

            <div className="flex justify-center items-center">
              <p className="font-bold">
                {`$${Math.abs(parseFloat(receipt.personReceiptAmount)).toFixed(2)}`}
              </p>
            </div>
            <div className="flex justify-center items-center mt-2">
              {receipt.invoiceNumber && (
                <div>
                  <p className="text-sm mb-2">
                    {`Invoice Number: ${receipt.invoiceNumber}`}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      });
  }, [filteredReceipts]);

  const personNames = useMemo(() => {
    const uniquePersons = Array.from(new Set(receipts.map((receipt) => receipt.personName)));
    return uniquePersons;
  }, [receipts]);

  const handlePersonNameChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  return (
    <>
      <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
        <Header showHistory={true} />

        <div className="flex flex-col items-center justify-center">
          <div className="rounded-lg px-3 py-2 shadow-md mb-4 mx-auto">
            <div className="flex items-center justify-end mb-2">
              <label htmlFor="filterSelect" className="mr-2">
                Filter By Person:
              </label>
              <select
                id="filterSelect"
                className="px-2 py-1 border border-gray-300 rounded"
                value={selectedPerson}
                onChange={handlePersonNameChange}
              >
                <option value="">All</option>
                {personNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {receiptList.length > 0 ? (
              receiptList
            ) : (
              <p>No receipts found for the selected person.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
