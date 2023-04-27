import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Routes, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function History({receipts, personName, personReceiptAmount}) {
  const [showHistory, setShowHistory] = useState(true);


  return (
    <>
      <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
        <Header showHistory={showHistory} />
        
        <div className="flex flex-col items-center justify-center">
  <h2 className="text-center mb-5">Receipt History</h2>
  <ul>
    {receipts.slice(0, 1).map((receipt, index) => (
      <li className="mb-3" key={index}>
         You submitted a receipt with {personName}, where you/they owe {personReceiptAmount}{console.log(index)}.
      </li>
    ))}
  </ul>
</div>
        <Footer />
      </main>
    </>
  );
}
