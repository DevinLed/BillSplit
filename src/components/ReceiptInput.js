import React, { useRef, useState, useEffect } from "react";
import Switch from "react-switch";
import Slider from "react-slider";
import { useParams } from "react-router-dom";
import AddPerson from "./AddPerson";
import Header from "./Header";
import { v4 as uuidv4 } from "uuid";
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
import { FaPlus, FaTrash } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

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
  startDate,
  setStartDate,
  merchantName,
  setMerchantName,
  invoiceNumber,
  setInvoiceNumber,
  personReceiptAmount,
  setPersonReceiptAmount,
  addNum,
  subNum,
  hasReceipt,
  setHasReceipt,
  handleValueChange,
}) {
  const [selectPersonReceipt, setSelectPersonReceipt] = useState(true);

  const [selectMethodManual, setSelectMethodManual] = useState(false);
  const { id } = useParams();
  const [receiptList, setReceiptList] = useState([]);
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleReceiptSubmit = (event) => {
    event.preventDefault();
    setItems([...items, { name: name, amount: amount }]);
    setName("");
    setAmount("");
  };

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  const getTotal = () => {
    let total = 0;
    for (const item of items) {
      total += parseInt(item.amount);
      setPersonReceiptAmount(total);
      addNum(id, personOwing, personReceiptAmount);
    }
    return total;
  };

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

              <div class="flex flex-col items-center w-96 justify-center bg-grey dark:bg-slate-900 rounded-lg px-6 py-6 ring-slate-900/5">
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
                    <div className="pr-5">Who paid?</div>
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
                <div class="w-full bg-white dark:bg-slate-900 rounded-lg py-1 ring-slate-900/5 m-0">
                  <div class="col-sm-15 mb-0">
                    <form onSubmit={handleReceiptSubmit}>
                      <table class="table-auto">
                        <thead className="table-fixed">
                          <tr>
                            <th className="px-15">Item</th>
                            <th className="px-15">Price</th>
                            <th className="px-1">You | Split | {personName}</th>
                          </tr>
                        </thead>

                        <tbody className="max-h-15 overflow-y-scroll">
                          <tr>
                            <td>
                              <input
                                type="amount"
                                class="form-control font-bold w-20"
                                id="colFormLabel"
                                placeholder="Item Name"
                                value={name}
                                onChange={handleNameChange}
                              />
                            </td>
                            <td>
                              <input
                                type="amount"
                                class="form-control font-bold w-20"
                                id="colFormLabel"
                                placeholder="Amount"
                                value={amount}
                                onChange={handleAmountChange}
                              />
                            </td>
                            <td>
                              
                    <Switch
                      onColor="#86d3ff"
                      offColor="#86d3ff"
                      handleDiameter={30}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 2px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 2px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={96}
                      className="react-switch mb-5"
                      id="material-switch"
                    />
                            </td>
                          </tr>
                        </tbody>
                        <button
                          type="submit"
                          className="add-button  text-black"
                        >
                          <FaPlus />
                        </button>
                      </table>
                    </form>
                    <table>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.amount}</td>
                            <td>
                              <button
                                className="delete-button bg-black-500 text-black"
                                onClick={() => handleDelete(index)}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="2">Total:</td>
                          <td>{getTotal()}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
              <div class="form-group row">
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
