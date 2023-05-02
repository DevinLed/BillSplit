import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ReceiptInput from "./ReceiptInput";

export default function History({ receipts, displayAdd, setDisplayAdd, selectedValue }) {
  const { id } = useParams();

  const receiptList = useMemo(() => {
    return receipts.slice(-10).map((receipt, index) => {
      const personOwes = receipt.personReceiptAmount < 0;
      const personOwesText = personOwes ? "they owe" : "you owe";
      const selectedValueText = selectedValue === "you" ? "you" : "they";
<ReceiptInput selectedValue={selectedValue}/>
      return (
        <li
          className={`py-2 ${
            personOwes ? "border-red-500" : "border-blue-500"
          }`}
          key={index}
        >
          You submitted a receipt with {receipt.personName}, where{" "}
          {personOwesText}{" "}
          <span className="font-bold">
            {selectedValueText === "you" ? "$" : "-$"}
            {Math.abs(parseFloat(receipt.personReceiptAmount)).toFixed(2)}
          </span>
          {selectedValueText === "you" ? " to them." : " from them."}
        </li>
      );
    });
  }, [receipts, selectedValue]);

  return (
    <>
      <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
        <Header showHistory={true} />
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg px-3 py-2 shadow-md flex items-center justify-center mb-2">
            <ul>{receiptList}</ul>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
