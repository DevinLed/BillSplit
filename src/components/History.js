import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function History({ receipts, selectedValue }) {
  const { id } = useParams();

  const receiptList = useMemo(() => {
    return receipts.map((receipt, index) => {
      const personOwes = receipt.personReceiptAmount < 0;

      return (
        <li
          className={`py-2 ${
            personOwes ? "border-red-500" : "border-blue-500"
          }`}
          key={index}
        >
          You submitted a receipt with {receipt.personName}, where{" "}
          {selectedValue === "you"
            ? personOwes
              ? "they owe"
              : "you owe"
            : personOwes
            ? "you owe"
            : "they owe"}{" "}
          <span className="font-bold">
            {personOwes ? "-$" : "$"}
            {Math.abs(parseFloat(receipt.personReceiptAmount)).toFixed(2)}
          </span>
          .
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
