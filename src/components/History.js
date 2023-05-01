import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ReceiptInput from "./ReceiptInput";
import html2canvas from 'html2canvas';

export default function History({
  receipts,
  displayAdd,
  setDisplayAdd,
  selectedValue,
}) {
  const { id } = useParams();
  const [historyList, setHistoryList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const receiptInputRef = useRef(null);

  useEffect(() => {
    const list = receipts.slice(-10).map((receipt) => {
      const personOwes = receipt.personReceiptAmount < 0;

      return (
        <li
          className={`py-2 ${
            personOwes ? "border-red-500" : "border-blue-500"
          }`}
          key={receipt.id}
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
          <button
            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={async () => {
              const canvas = await html2canvas(receiptInputRef.current);
              const dataUrl = canvas.toDataURL();
              setImageUrl(dataUrl);
            }}
          >
            Take Screenshot
          </button>
        </li>
      );
    });
    setHistoryList(list);
  }, [receipts, selectedValue]);

  return (
    <>
      <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
        <Header showHistory={true} />
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg px-3 py-2 shadow-md flex items-center justify-center mb-2">
            <ul>{historyList}</ul>
          </div>
          <div ref={receiptInputRef}>
            {displayAdd && (
              <ReceiptInput
                setDisplayAdd={setDisplayAdd}
                selectedValue={selectedValue}
              />
            )}
          </div>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Screenshot"
              onClick={() => setImageUrl(null)}
            />
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}
