import React, { useRef, useState, useEffect } from "react";
import Switch from "react-switch";
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

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus, FaTrash } from "react-icons/fa";
import { GrSubtractCircle } from "react-icons/gr";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";

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
  const [addToValue, setAddToValue] = useState(false);
  const [selectedValue, setSelectedValue] = useState("you");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(55);
  const [youValue, setYouValue] = useState(0);
  const [splitValue, setSplitValue] = useState(0);
  const [themValue, setThemValue] = useState(0);
  const [showTable, setShowTable] = useState("");
  const [youTotal, setYouTotal] = useState(0);
  const [splitTotal, setSplitTotal] = useState(0);
  const [themTotal, setThemTotal] = useState(0);
  const [receiptSubmitted, setReceiptSubmitted] = useState(false);
  const [totalToAdd, setTotalToAdd] = useState("");

  const [defValue, setDefValue] = useState(55);

  const [selected, setSelected] = useState(null);
  const handleButton1Click = () => {
    setSelected(1);
  };

  const handleButton2Click = () => {
    setSelected(2);
  };
  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const renderYouColumn = () => {
    return <div>{}</div>;
  };

  const renderSplitColumn = () => {
    return <div>{}</div>;
  };

  const renderPersonNameColumn = () => {
    return <div>{}</div>;
  };

  const renderColumn = () => {
    if (sliderValue <= 33) {
      return renderYouColumn();
    } else if (sliderValue <= 66) {
      return renderSplitColumn();
    } else {
      return renderPersonNameColumn();
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleReceiptSubmit = (sliderValue) => {
    if (!name || !amount) {
      return;
    }
    setItems([
      ...items,
      {
        name: name,
        amount: parseFloat(amount).toFixed(2),
        sliderValue: sliderValue,
      },
    ]);
    switch (sliderValue) {
      case 0: {
        let a = parseInt(amount);
        let b = parseInt(youTotal);
        let value = a + b;
        setYouTotal(value);
        console.log(value);
        break;
      }
      case 55: {
        let a = parseInt(amount);
        let b = parseInt(splitTotal);
        let value = a + b;
        setSplitTotal(value);
        console.log(value);
        break;
      }
      case 100: {
        let a = parseInt(amount);
        let b = parseInt(themTotal);
        let value = a + b;
        setThemTotal(value);
        console.log(value);
        break;
      }
      default:
        break;
    }
    setName("");
    setAmount("");
    setCurrentIndex(currentIndex + 1);
  };
  const handleSaveClick = () => {
    setSliderValue(55); // Update the default value with the current value
  };
  const handleDelete = (index) => {
    const newItems = [...items];
    const deletedItem = newItems.splice(index, 1)[0]; // remove the deleted item from the list and get its details

    // update the corresponding total based on the deleted item's sliderValue
    switch (deletedItem.sliderValue) {
      case 0: {
        setYouTotal(youTotal - parseInt(deletedItem.amount));
        break;
      }
      case 55: {
        setSplitTotal(splitTotal - parseInt(deletedItem.amount));
        break;
      }
      case 100: {
        setThemTotal(themTotal - parseInt(deletedItem.amount));
        break;
      }
      default:
        break;
    }

    setItems(newItems);
  };
  const getTotal = () => {
    let total = 0;
    for (const item of items) {
      total += parseInt(item.amount);
    }

    let splitValue = parseFloat(splitTotal / 2).toFixed(2);
    let themValue = parseFloat(themTotal).toFixed(2);
    let youValue = parseFloat(youTotal).toFixed(2);
    if (selectedValue === "you") {
      setPersonReceiptAmount(parseFloat(splitValue) + parseFloat(themValue));
    } else if (selectedValue === "them") {
      setPersonReceiptAmount(parseFloat(splitValue) + parseFloat(youValue));
    }

    return parseFloat(total).toFixed(2);
  };

  const getFinalTotal = () => {
    if (selectedValue === "you") {
      addNum(id, personOwing, personReceiptAmount);
    } else {
      subNum(id, personOwing, personReceiptAmount);
    }
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

              <div class="flex flex-col items-center max-w-min justify-center bg-grey dark:bg-slate-900 rounded-lg px-6 py-6 ring-slate-900/5">
                
              <div className="max-w-fit">
                  <label
                    htmlFor="payment"
                    className="form-control flex items-center justify-left mt-0 px-2"
                  >
                    <div className="whitespace-no-wrap w-22 pl-2 ">
                      Who paid?
                    </div>
                    <div className="inline-flex px-2">
                      <button
                        className={`bg-blue-500 text-white font-bold py-1 px-2 rounded-l m-0 ${
                          selected === 1 ? "bg-blue-700" : ""
                        } h-8 w-16`}
                        onClick={() => {
                          handleButton1Click();
                          setSelectedValue("you");
                          setShowTable(true);
                        }}
                      >
                        You
                      </button>
                      <button
                        className={`bg-blue-500 text-white font-bold py-1 px-2 rounded-r border-l m-0 ${
                          selected === 2 ? "bg-blue-700" : ""
                        } h-8 w-16`}
                        onClick={() => {
                          handleButton2Click();
                          setSelectedValue("them");
                          setShowTable(true);
                        }}
                      >
                        {personName}
                      </button>
                    </div>
                  </label>
                </div>
                {showTable ? (
                  <>
                <div class="col-sm-10 mb-0 mt-3">
                <input
                  type="amount"
                  class="form-control font-bold mb-5 h-10"
                  id="colFormLabel"
                  placeholder="Merchant Name"
                  value={merchantName}
                  onChange={(e) =>
                    setMerchantName(
                      e.target.value.replace(/\b\w/g, (c) => c.toUpperCase())
                    )
                  }
                />

                <div class="flex items-center justify-left h-11 mb-1 ml-1">
                  <div class="px-0 z-50">
                    <label for="colFormLabel" class="col-form-label ">
                      Date of Receipt
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="bg-blue-100"
                    />
                  </div>
                </div>
              </div>

              <div class="mb-0">
                <input
                  type="invoice"
                  class="form-control font-bold w-55 mb-2 mt-2 opacity-4"
                  id="colFormLabel"
                  placeholder="Invoice Number"
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </div>
                  <div>
                    <div className="w-full bg-white dark:bg-slate-900 rounded-lg py-1 m-0 max-w-min px-1 whitespace-no-wrap">
                      <div class="mb-0 mx-auto max-w-min">
                        <table className="border border-black table-fixed max-w-min m-auto">
                          <thead className="whitespace-no-wrap overflow-hidden max-w-fit truncate">
                            <tr className="whitespace-no-wrap overflow-hidden max-w-fit px-2">
                              <th className="px-15">Item</th>
                              <th className="px-15">Price</th>
                              <th
                                className="px-1"
                                colSpan={3}
                                style={{ width: "33.33%" }}
                              >
                                <span className="pr-2 pl-4 border-r border-black">
                                  You
                                </span>
                                <span className="px-2 border-r border-l border-black">
                                  Split
                                </span>
                                <span className="pl-2 border-l border-black">
                                  Them
                                </span>
                              </th>
                            </tr>
                          </thead>

                          <tbody className="pt-5">
                            <tr>
                              <td>
                                <input
                                  type="amount"
                                  className="form-control font-bold w-20 px-1 text-xs mb-1"
                                  id="colFormLabel"
                                  placeholder="Item Name"
                                  value={name}
                                  onChange={handleNameChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="amount"
                                  className="form-control font-bold w-20 px-1 text-xs mb-1"
                                  id="colFormLabel"
                                  placeholder="Amount"
                                  value={amount}
                                  onChange={handleAmountChange}
                                />
                              </td>
                              <td colSpan="3" className="px-2">
                                <div style={{ width: "auto", margin: "auto" }}>
                                  <Slider
                                    defaultValue={55}
                                    min={0}
                                    max={100}
                                    value={sliderValue}
                                    step={55}
                                    onChange={(value) =>
                                      handleSliderChange(value)
                                    }
                                  />
                                  {renderColumn()}
                                </div>
                              </td>
                            </tr>

                            <tr className="add-button text-black m-2 text-center items-center justify-center">
                              <button
                                className="add-button text-gray-500 m-2 text-2xl text-center items-center justify-center"
                                onClick={() => {
                                  handleReceiptSubmit(sliderValue);
                                  handleSaveClick();
                                }}
                              >
                                <IoMdAddCircleOutline />
                              </button>
                            </tr>
                            {items.map((item, index) => (
                              <tr
                                key={index}
                                className={
                                  index % 2 === currentIndex % 2
                                    ? "bg-blue-100"
                                    : ""
                                }
                              >
                                <td>
                                  {item.name.replace(/\b\w/g, (c) =>
                                    c.toUpperCase()
                                  )}
                                </td>
                                <td className="text-sm flex items-center mr-2">
                                  <button
                                    className="add-button text-gray-500 m-2 text-2xl text-center items-center justify-center"
                                    onClick={() => handleDelete(index)}
                                  >
                                    <IoMdRemoveCircleOutline />
                                  </button>
                                  <span className="ml-2">${item.amount}</span>
                                </td>
                                <td colSpan={3}>
                                  <div
                                    style={{
                                      width: "auto",
                                      margin: "auto",
                                      padding: "8px",
                                    }}
                                  >
                                    <Slider
                                      defaultValue={item.sliderValue}
                                      min={0}
                                      max={100}
                                      step={0}
                                      disabled={true}
                                    />
                                    {renderColumn()}
                                  </div>
                                </td>
                                <td></td>
                                <td></td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-blue-200">
                            <tr className="border-t border-gray-500 bg-blue-200">
                              <td
                                className="px-2 py-1 "
                                style={{ width: "33.33%" }}
                              >
                                Total:
                              </td>
                              <td
                                className="px-2 mr-2 py-1 text-right"
                                style={{ width: "33.33%" }}
                              >
                                ${getTotal()}
                              </td>
                              <td
                                className="text-center px-2 py-1 border-l border-gray-500 text-xs"
                                style={{ width: "33.33%" }}
                              >
                                {youTotal}
                              </td>
                              <td
                                className="text-center px-2 py-1 border-l border-gray-500 text-xs"
                                style={{ width: "33.33%" }}
                              >
                                {splitTotal}
                              </td>
                              <td
                                className="text-center px-2 py-1 border-l border-gray-500 text-xs"
                                style={{ width: "33.33%" }}
                              >
                                {themTotal}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg px-3 py-2 shadow-md mt-3 flex items-center justify-center">
                      <label className="text-lg font-medium text-center">
                        {selectedValue === "you" ? (
                          <>
                            {personName} owes you {personReceiptAmount}
                          </>
                        ) : (
                          <>
                            You owe {personName} $
                            {parseFloat(personReceiptAmount).toFixed(2)}
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                  
                <div className="col-sm-10 ml-0 mr-0 flex flex-col items-center justify-center mt-3">
                  <div>
                    <Link to="/ReceiptInput/:id">
                      <button className="mt-4 bg-blue-500 font-bold py-2 px-4 mb-5 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300">
                        Add Another Receipt
                      </button>
                    </Link>
                  </div>
                  <div>
                    <Link to="/SplitBill">
                      <button
                        className="bg-blue-500 font-bold py-2 px-4 mb-5 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                        onClick={() => getFinalTotal()}
                      >
                        Submit
                      </button>
                    </Link>
                  </div>
                </div>
                  </>
                ) : (
                  ""
                )}
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
