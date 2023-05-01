import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BrowserRouter, Switch, Route, Routes, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AddPerson from "./AddPerson";

export default function History({
  personName,
  personReceiptAmount,
  addReceipt,
  receipts,
  setReceipts,
  displayAdd,
  setDisplayAdd,
}) {
  const [showHistory, setShowHistory] = useState(true);
  const { id } = useParams();

  return (
    <>
      <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
        <Header showHistory={showHistory} />
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg px-3 py-2 shadow-md flex items-center justify-center mb-2">
            <ul>
              {receipts.map((receipt, index) => (
                <li
                  className={`py-2 ${
                    receipt.personReceiptAmount < 0
                      ? "border-red-500"
                      : "border-blue-500"
                  }`}
                  key={id}
                >
                  You submitted a receipt with {receipt.personName}, where 
                  {displayAdd ? (" they owe "): (" you owe ")}
                  <span className="font-bold">
                    {receipt.personReceiptAmount < 0 ? "-$" : "$"}
                    {Math.abs(parseFloat(receipt.personReceiptAmount)).toFixed(
                      2
                    )}
                  </span>
                  .
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
