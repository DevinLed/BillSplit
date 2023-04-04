import React, { useRef, useState, useEffect } from "react";
import Switch from "react-switch";
import { useParams } from "react-router-dom";
import AddPerson from "./AddPerson";
import Header from "./Header";
import SplitBill from "./SplitBill";
import Footer from "./Footer";
import "../index.css";
import {
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
  handleValueChange,
}) {
  const [selectPersonReceipt, setSelectPersonReceipt] = useState(true);
  const [selectMethodManual, setSelectMethodManual] = useState(false);
  const { id } = useParams();

  return (
    <>
      {selectPersonReceipt ? (
        <>
          <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
            <div className="flex flex-col items-center justify-center">
              <Header selectPersonReceipt={selectPersonReceipt} />

              <div className="flex flex-col items-center justify-center">
                <h1>Split a bill with {personName}</h1>
                <p>Currently Owes: {personOwing}</p>
                <ul class="list-group items-center justify-center">
                  <Link
                    class="btn btn-primary btn-lg mt-5"
                    onClick={(e) => {
                      setSelectMethodManual(true);
                      setSelectPersonReceipt(false);
                    }}
                  >
                    <li>Manual</li>
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
            <Footer />
          </main>
        </>
      ) : (
        ""
      )}
      {selectMethodManual ? (
        <>
          <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
            <div className="flex flex-col items-center justify-center mt-0">
              <Header selectMethodManual={selectMethodManual} />

              <div class="bg-grey dark:bg-slate-900 rounded-lg px-6 py-6 ring-slate-900/5">
                <div class="col-sm-10 mb-0">
                  <input
                    type="amount"
                    class="form-control font-bold mb-5 h-16"
                    id="colFormLabel"
                    placeholder="Merchant Name"
                    value={merchantName}
                    onChange={(e) => setMerchantName(e.target.value)}
                  />

                  <div class="flex items-center justify-left h-11 mb-1">
                    <div class="px-0 z-50">
                      <label
                        for="colFormLabel"
                        class="col-sm-20 col-form-label "
                      >
                        Date of Receipt
                      </label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="bg-blue300"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-sm-10 mb-0">
                  <input
                    type="invoice"
                    class="form-control font-bold w-55 mb-2 opacity-4"
                    id="colFormLabel"
                    placeholder="Invoice Number"
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>
                <div class="col-sm-10 mb-0">
                  <label
                    for="payment"
                    class="form-control flex items-center justify-left mt-0 pr-50"
                    id="colFormLabel"
                    placeholder="Who Paid?"
                  >
                  <div className="pr-5">
                    Who paid? 
                    </div>
                    You
                    <Switch
                      checked={subNum(id, personOwing, personReceiptAmount)}
                      onChange={addNum(id, personOwing, personReceiptAmount)}
                      onColor="#86d3ff"
                      offColor="#86d3ff"
                      handleDiameter={30}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 2px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 2px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                      className="react-switch "
                      id="material-switch"
                    />
                    {personName}
                    
                  </label>
                </div>
                <div class="bg-white dark:bg-slate-900 rounded-lg py-6 ring-slate-900/5 m-0">
                <div class="col-sm-10 mb-0">
                  <table>
                    
  <thead>
    <tr>
      <th>Song</th>
      <th>Artist</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
                  <input
                    type="amount"
                    class="form-control font-bold ml-12 w-50"
                    id="colFormLabel"
                    placeholder="Amount"
                    onChange={(e) => setPersonReceiptAmount(e.target.value)}
                  /></table>
                </div>
              </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-10 mb-0">
                  <label htmlFor="price">Total owing</label>
                  <p>{personOwing}</p>
                </div>
                <div class="col-sm-10 mb-0">
                  <Link to="/SplitBill">
                    <button className="mt-4 bg-blue-500 font-bold py-2 px-4 mb-5 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300">
                      Submit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        ""
      )}
    </>
  );
}
