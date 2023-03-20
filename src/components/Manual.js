import React, { useRef, useState, useEffect } from "react";
import AddPerson from "./AddPerson";
import Header from "./Header";
import SplitBill from "./SplitBill";
import Footer from "./Footer";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Manual({
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
  startDate,
  setStartDate,
  merchantName,
  setMerchantName,
  invoiceNumber,
  setInvoiceNumber,
}) {
  const [selectMethodManual] = useState(true);
  return (
    <>
      <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
        <div className="flex flex-col items-center justify-center mt-0">
          <Header selectMethodManual={selectMethodManual} />

          <div class="form-group row">
            <div class="col-sm-10 mb-0">
              <input
                type="name"
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
              <label
                for="payment"
                class="form-control flex items-center justify-center mt-0"
                id="colFormLabel"
                placeholder="Who Paid?"
              >
                Who paid?
                <button class="btn btn-primary btn-lg m-2" type="submit">
                  You
                </button>
                <button class="btn btn-primary btn-lg mt-2 mb-2" type="submit">
                  {personName}
                </button>
              </label>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-10 mb-0">
              <button class="btn btn-primary btn-lg" type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
