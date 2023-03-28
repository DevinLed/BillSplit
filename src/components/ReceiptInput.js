import React, { useRef, useState, useEffect } from "react";
import AddPerson from "./AddPerson";
import Header from "./Header";
import SplitBill from "./SplitBill";
import Footer from "./Footer";import {
  Route,
  Routes,
  Link,
  path,
  Navigate,
  Redirect,
} from "react-router-dom";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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
  setEditPerson,
  value,
  startDate,
  setStartDate,
  merchantName,
  setMerchantName,
  invoiceNumber,
  setInvoiceNumber,
  personReceiptAmount,
  setPersonReceiptAmount,
  setValue,
  addNum,
  subNum,
  hasReceipt,
  setHasReceipt,
  handleValueChange
}) {
  const [selectPersonReceipt, setSelectPersonReceipt] = useState(true);
  const [selectMethodManual, setSelectMethodManual] = useState(false);



  return (
    <>
    {selectPersonReceipt ? (
      <>
    <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
    <div className="flex flex-col items-center justify-center">
      <Header selectPersonReceipt={selectPersonReceipt} />
      
      <div className="flex flex-col items-center justify-center">
                <h1>Split a bill with {personName}</h1>
                <ul class="list-group items-center justify-center">
                  <Link class="btn btn-primary btn-lg mt-5" onClick={(e) => {setSelectMethodManual(true);setSelectPersonReceipt(false);}}> 
                  <li>
                      Manual
                    </li>
                  </Link>
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
    ): ("")}
      {selectMethodManual ? (
        <>
      <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
      <div className="flex flex-col items-center justify-center mt-0">
        <Header selectMethodManual={selectMethodManual} />

        <div class="form-group row">
          <div class="col-sm-10 mb-0">
            <input
              type="amount"
              class="form-control"
              id="colFormLabel"
              placeholder="Merchant Name"
              value={merchantName}
              onChange={(e) => setMerchantName(e.target.value)}
            />
          </div>
        </div>

        <div class="flex flex-col items-center justify-center">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div class="form-group row">
          <div class="col-sm-10 mb-0">
            <label for="colFormLabel" class="col-sm-2 col-form-label">
              Invoice#
            </label>
            <input
              type="invoice"
              class="form-control"
              id="colFormLabel"
              placeholder="Invoice Number"
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10 mb-0">
            <label for="colFormLabel" class="col-sm-2 col-form-label">
              Amount
            </label>
            <input
              type="amount"
              class="form-control"
              id="colFormLabel"
              placeholder="0"
              onChange={(e) => setPersonReceiptAmount(e.target.value)}
            />
          </div>
          </div>
        <div class="form-group row">
          <div class="col-sm-10 mb-0">
            <label
              for="payment"
              class="form-control flex items-center justify-center mt-0"
              id="colFormLabel"
              placeholder="Who Paid?"
            >
              Who paid?
              <button class="btn btn-primary btn-lg m-2" type="submit" onClick={() => addNum(personOwing, personReceiptAmount)}>
                You
              </button>
              <button class="btn btn-primary btn-lg mt-2 mb-2" type="submit" onClick={() => subNum(personOwing, personReceiptAmount)}>
                {personName}
              </button>
            </label>
          </div>
        </div>

          <div class="form-group row">
          <div class="col-sm-10 mb-0">
            <label htmlFor="price">Total owing</label>
            <p>{value.length ? ({value}): ("")}</p>
          </div>
  
          <div class="col-sm-10 mb-0">
            <Link to="/SplitBill" onClick={(e) => addNum(personOwing,personReceiptAmount)}>
            <button
              className="mt-4 bg-blue-500 font-bold py-2 px-4 mb-5 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
              >
              Submit
            </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
    </>
    ) : ("")}
    </>
  );
}
