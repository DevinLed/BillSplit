import React, { useRef, useState, useEffect } from "react";
import AddPerson from "./AddPerson";
import Header from "./Header";
import SplitBill from "./SplitBill";
import Footer from "./Footer";

export default function ReceiptInput({
  addPerson,
  setAddPerson,
  selectPerson,
  personName,
  personEmail,
  personPhone,
  personOwing,
  setPersonName,
  setPersonEmail,
  setPersonPhone,
  setPersonOwing,
  handleSubmit,
  setPersonState,
  personState,
  setIsSelected,
  list,
  setEditPerson
}) {
  const [selectPersonReceipt, setSelectPersonReceipt] = useState(true);
  return (
    <>
    <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
    <div className="flex flex-col items-center justify-center">
      <Header selectPersonReceipt={selectPersonReceipt} />
      
      <div className="flex flex-col items-center justify-center">
                <h1>Split a bill with {personName}</h1>
                <ul class="list-group items-center justify-center">
                  <li>
                    <button class="btn btn-primary btn-lg mt-5" type="submit">
                      Manual
                    </button>
                  </li>
                  <li>
                    <button
                      class="btn btn-primary btn-lg mt-5 mb-5"
                      type="submit"
                    >
                      Picture
                    </button>
                  </li>
                </ul>
              </div>
            </div>
      <Footer/>
      </main>
    </>
  );
}
