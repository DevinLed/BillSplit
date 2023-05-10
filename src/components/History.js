import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function History({ theme, receipts, isReceiptSubmitted, setIsReceiptSubmitted }) {
  const { id } = useParams();

  const receiptList = useMemo(() => {
    return receipts.slice(-10).map((receipt, index) => {
      return (
        <div key={index} className="border-b border-gray-300 py-2 my-2 px-8">
          <div>
            <div className="flex justify-center items-center">
              <p className="font-bold">{receipt.personName}</p>
             </div>
            
            <div className="flex justify-center items-center mt-2">
              {receipt.merchantName && (
                <p>
                  {`${receipt.merchantName}`}
                </p>
              )}
            </div>
            
            <div className="flex justify-center items-center mt-2">
              <p className="text-sm">
                {receipt.startDate.toLocaleDateString("en-US")}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center mt-2">
            <p className="text-sm">
              {receipt.selectedValue === "you" ? "You are owed" : "You owe"}
            </p>
          </div>

          <div className="flex justify-center items-center">
            <p className="font-bold">
              {`$${Math.abs(parseFloat(receipt.personReceiptAmount)).toFixed(
                2
              )}`}
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
  }, [receipts]);

  return (
    <>
      <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
        <Header showHistory={true} />
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-lg px-3 py-2 shadow-md mb-4 mx-auto">
            {isReceiptSubmitted ? receiptList : "There are no receipts in history."}
            
          </div>
        </div>
      </main>
    </>
  );
}
