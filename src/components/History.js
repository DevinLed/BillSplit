import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Routes, Link } from "react-router-dom";
import Header from './Header'

export default function History() {

const [showHistory, setShowHistory] = useState(true);
  return (
    <>
    
    <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
    <Header showHistory={showHistory} />
    <div>
              <article className="flex flex-col items-center justify-center ">
                <p className="mb-5 ">Show history of past few weeks</p>
              </article>
            </div>

        </main>
    
    
    
    </>
  )
}
