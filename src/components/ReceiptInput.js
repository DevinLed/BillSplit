import React, { useRef, useState, useEffect, onBlur, useCamera } from "react";
import Switch from "react-switch";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Camera } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import AddPerson from "./AddPerson";
import loading from "../img/loading.gif";
import Header from "./Header";
import { v4 as uuidv4 } from "uuid";
import SplitBill from "./SplitBill";
import "../index.css";
import History from "./History";
import {
  Route,
  Routes,
  Link,
  path,
  Navigate,
  Redirect,
} from "react-router-dom";
import "../darkMode.css";

import DatePicker from "react-datepicker";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus, FaTrash } from "react-icons/fa";
import { GrSubtractCircle } from "react-icons/gr";
import {
  IoMdAddCircleOutline,
  IoMdRemoveCircleOutline,
  IoMdCheckmark,
} from "react-icons/io";

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
  value,
  addReceipt,
  receipts,
  setReceipts,
  displayAdd,
  setDisplayAdd,
  selectedValue,
  setSelectedValue,
  displayMerchant,
  displayDate,
  displayInvoice,
  setDisplayMerchant,
  setDisplayDate,
  setDisplayInvoice,
  isReceiptSubmitted,
  setIsReceiptSubmitted,
  theme,
}) {
  const [selectPersonReceipt, setSelectPersonReceipt] = useState(true);

  const [selectMethodManual, setSelectMethodManual] = useState(false);
  const [selectMethodPicture, setSelectMethodPicture] = useState(false);

  const [receiptTotal, setReceiptTotal] = useState("");
  const axios = require("axios");
  const FormData = require("form-data");

  const apiKey = "561e58edb1c93ab9fec230c1439fbf48";
  const account = "mindee";
  const endpoint = "expense_receipts";
  const version = "5.0";

  const handleReceiptTotal = (total) => {
    setReceiptTotal(total);
  };
  const handleCapturePhoto = (dataUri) => {
    setPhotoData(dataUri);
    setShowCameraImage(true);
    setShowRedoButton(true);
  };
  const [photoData, setPhotoData] = useState(null);
  const [pictureTotal, setPictureTotal] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [showCameraImage, setShowCameraImage] = useState(false);
  const [showRedoButton, setShowRedoButton] = useState(false);
  const [obtainedSliderInfo, setObtainedSliderInfo] = useState([]);
  const [displayPictureInfo, setDisplayPictureInfo] = useState(false);
  const [obtainedInfo, setObtainedInfo] = useState([]);
  const handleCameraSubmit = async () => {
    setPhotoData(loading);
    setShowImage(true);
    try {
      const data = new FormData();
      data.append("document", photoData);

      const headers = new Headers();
      headers.append("Authorization", `Token ${apiKey}`);

      const config = {
        method: "POST",
        headers,
        body: data,
      };

      const response = await fetch(
        `https://api.mindee.net/v1/products/${account}/${endpoint}/v${version}/predict`,
        config
      );
      const responseData = await response.json();
      setObtainedInfo(
        responseData.document.inference.prediction.line_items.map(
          (item) => item
        )
      );
      setDisplayPictureInfo(true);
      const totalAmount =
        responseData.document.inference.prediction.total_amount.value;
      setMerchantName(
        responseData.document.inference.prediction.supplier_name.value
      );
      if (merchantName === null) {
        setDisplayMerchant(false);
      }
      console.log(responseData.document);

      setPictureTotal(totalAmount);
      setShowImage(false);
      setPhotoData(photoData);

      // Handle the response data as per your requirements
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };
  useEffect(() => {
    setObtainedInfo((prevInfo) =>
      prevInfo.map((item) => ({
        ...item,
        sliderValue: item.sliderValue || 55,
      }))
    );
  
    if (getPictureTotal() !== pictureTotal) {
      setGetPictureTotalPopup(true);
      setGetPictureTotalMessage("Missing items...");
    } else {
      setGetPictureTotalPopup(false);
      setGetPictureTotalMessage("");
    }
  }, []);
  
  const { id } = useParams();
  const [receiptList, setReceiptList] = useState([]);
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [addToValue, setAddToValue] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(55);
  const [youValue, setYouValue] = useState(0);
  const [splitValue, setSplitValue] = useState(0);
  const [themValue, setThemValue] = useState(0);
  const [showTable, setShowTable] = useState("");
  const [youTotal, setYouTotal] = useState(0);
  const [splitTotal, setSplitTotal] = useState(0);
  const [themTotal, setThemTotal] = useState(0);
  const [youPictureTotal, setYouPictureTotal] = useState(0);
  const [splitPictureTotal, setSplitPictureTotal] = useState(0);
  const [themPictureTotal, setThemPictureTotal] = useState(0);
  const [getPictureTotalPopup, setGetPictureTotalPopup] = useState(false);
  const [getPictureTotalMessage, setGetPictureTotalMessage] = useState("");

  const [receiptSubmitted, setReceiptSubmitted] = useState(false);
  const [totalToAdd, setTotalToAdd] = useState("");

  const [defValue, setDefValue] = useState(55);

  const [selected, setSelected] = useState(null);
  const handleButton1Click = () => {
    setSelected(1);
  };

  function resetReceiptForm() {
    setMerchantName("");
    setInvoiceNumber("");
    setStartDate(new Date());
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }
  const handleButton2Click = () => {
    setSelected(2);
  };
  const handleSliderChange = (value) => {
    setSliderValue(value);
  };
  const handlePictureSliderChange = (index, value) => {
    setObtainedInfo((prevInfo) => {
      const updatedInfo = [...prevInfo];
      updatedInfo[index] = {
        ...updatedInfo[index],
        sliderValue: value,
      };
      return updatedInfo;
    });
    switch (sliderValue) {
      case 0: {
        let a = parseFloat(amount).toFixed(2);
        let b = parseFloat(youPictureTotal).toFixed(2);
        let value = a + b;
        setYouPictureTotal(parseFloat(value).toFixed(2));
        break;
      }
      case 55: {
        let a = parseFloat(amount);
        let b = parseFloat(splitPictureTotal);
        let value = a + b;
        setSplitPictureTotal(value.toFixed(2));
        break;
      }
      case 100: {
        let a = parseFloat(amount).toFixed(2);
        let b = parseFloat(themPictureTotal).toFixed(2);
        let value = a + b;
        setThemPictureTotal(parseFloat(value).toFixed(2));
        break;
      }
      default:
        break;
    }
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
        let a = parseFloat(amount).toFixed(2);
        let b = parseFloat(youTotal).toFixed(2);
        let value = a + b;
        setYouTotal(parseFloat(value).toFixed(2));
        break;
      }
      case 55: {
        let a = parseFloat(amount);
        let b = parseFloat(splitTotal);
        let value = a + b;
        setSplitTotal(value.toFixed(2));
        break;
      }
      case 100: {
        let a = parseFloat(amount).toFixed(2);
        let b = parseFloat(themTotal).toFixed(2);
        let value = a + b;
        setThemTotal(parseFloat(value).toFixed(2));
        break;
      }
      default:
        break;
    }
    setName("");
    setAmount("");
    setCurrentIndex(currentIndex + 1);
  };

  const handleReceiptPictureSubmit = (sliderValue) => {
    if (!name || !amount) {
      return;
    }
    setObtainedInfo([
      ...obtainedInfo,
      {
        name: name,
        amount: parseFloat(amount).toFixed(2),
        sliderValue: sliderValue,
      },
    ]);
    switch (sliderValue) {
      case 0: {
        let a = parseFloat(amount).toFixed(2);
        let b = parseFloat(youPictureTotal).toFixed(2);
        let value = a + b;
        setYouPictureTotal(parseFloat(value).toFixed(2));
        break;
      }
      case 55: {
        let a = parseFloat(amount);
        let b = parseFloat(splitPictureTotal);
        let value = a + b;
        setSplitPictureTotal(value.toFixed(2));
        break;
      }
      case 100: {
        let a = parseFloat(amount).toFixed(2);
        let b = parseFloat(themPictureTotal).toFixed(2);
        let value = a + b;
        setThemPictureTotal(parseFloat(value).toFixed(2));
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
      total += parseFloat(item.amount);
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
  const getPictureTotal = () => {
    let total = 0;
    for (const item of obtainedInfo) {
      total += parseFloat(item.total_amount);
    }
    let splitValue = parseFloat(splitPictureTotal / 2).toFixed(2);
    let themValue = parseFloat(themPictureTotal).toFixed(2);
    let youValue = parseFloat(youPictureTotal).toFixed(2);
    if (selectedValue === "you") {
      setPersonReceiptAmount(parseFloat(splitValue) + parseFloat(themValue));
    } else if (selectedValue === "them") {
      setPersonReceiptAmount(parseFloat(splitValue) + parseFloat(youValue));
    }
    console.log(total);
    return parseFloat(total).toFixed(2);
  };

  const handleHistorySubmit = (e) => {
    addReceipt(
      personName,
      personReceiptAmount,
      selectedValue,
      merchantName,
      startDate,
      invoiceNumber,
      displayMerchant,
      displayDate,
      displayInvoice
    );
  };
  const getFinalTotal = () => {
    if (selectedValue === "you") {
      console.log(personReceiptAmount);
      addNum(id, personOwing, personReceiptAmount);
    } else {
      console.log(personReceiptAmount);
      subNum(id, personOwing, personReceiptAmount);
    }
  };
  
  const getFinalPictureTotal = () => {
    if (selectedValue === "you") {
      console.log(personReceiptAmount);
      addNum(id, personOwing, personReceiptAmount);
    } else {
      console.log(personReceiptAmount);
      subNum(id, personOwing, personReceiptAmount);
    }
  };
  return (
    <>
      {selectPersonReceipt ? (
        <>
          <main className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl">
            <div className="flex flex-col items-center justify-center">
              <Header selectPersonReceipt={selectPersonReceipt} />

              <div className="flex flex-col items-center justify-center">
                <h1>Split a bill with {personName}</h1>
                <p>
                  Currently Owes: $
                  {value
                    ? parseFloat(value).toFixed(2)
                    : parseFloat(personOwing).toString() === "NaN"
                    ? "0.00"
                    : parseFloat(personOwing).toFixed(2)}
                </p>
                <ul className="list-group items-center justify-center">
                  <Link
                    className="btn btn-primary btn-lg mt-5"
                    onClick={(e) => {
                      setSelectMethodManual(true);
                      setSelectPersonReceipt(false);
                    }}
                  >
                    <li>Manual</li>
                  </Link>
                  <li>
                    <button
                      className="btn btn-primary btn-lg mt-5 mb-5"
                      type="submit"
                      onClick={(e) => {
                        setSelectMethodPicture(true);
                        setSelectPersonReceipt(false);
                      }}
                    >
                      Picture
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </>
      ) : (
        ""
      )}
      {selectMethodManual ? (
        <>
          <main className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl">
            <div className="mt-0 flex flex-col items-center justify-center">
              <Header selectMethodManual={selectMethodManual} />

              <div className="l-36 bg-grey flex flex-col  items-center justify-center rounded-lg px-6 py-6 ring-slate-900/5 dark:bg-slate-900">
                <div className="max-w-fit">
                  <label
                    htmlFor="payment"
                    className="form-control justify-left mt-0 flex items-center px-2"
                  >
                    <div className="whitespace-no-wrap w-22 pl-2 ">
                      Who paid?
                    </div>
                    <div className="inline-flex px-2">
                      <button
                        className={`m-0 rounded-l bg-blue-500 py-1 px-2 font-bold text-white ${
                          selected === 1 ? "bg-blue-700" : ""
                        } h-8 w-16`}
                        onClick={() => {
                          handleButton1Click();
                          setSelectedValue("you");
                          setShowTable(true);
                          setDisplayMerchant(false);
                          setDisplayDate(false);
                          setDisplayInvoice(false);
                        }}
                      >
                        Me
                      </button>
                      <button
                        className={`m-0 rounded-r border-l bg-blue-500 py-1 px-3 font-bold text-white ${
                          selected === 2 ? "bg-blue-700" : ""
                        } min-w-16 max-w-24 h-8 overflow-hidden`}
                        onClick={() => {
                          handleButton2Click();
                          setSelectedValue("them");
                          setShowTable(true);
                        }}
                      >
                        {personName.length > 12
                          ? personName.slice(0, 12) + "..."
                          : personName}
                      </button>
                    </div>
                  </label>
                </div>
                {showTable ? (
                  <>
                    <div className="col-sm-10 mb-0 mt-3">
                      <input
                        type="amount"
                        className="form-control mb-5 h-10 text-center font-bold"
                        id="colFormLabel"
                        placeholder="Merchant Name"
                        onKeyDown={handleKeyDown}
                        onChange={(e) =>
                          setMerchantName(
                            e.target.value.replace(/\b\w/g, (c) =>
                              c.toUpperCase()
                            )
                          )
                        }
                        onClick={() => setDisplayMerchant(true)}
                      />
                      <div className="justify-left mt-3 flex h-11 items-center ">
                        <div className="z-50 mt-3 mb-3 text-center">
                          <label
                            htmlFor="colFormLabel"
                            className="col-form-label text-center text-black"
                          >
                            Date of Receipt
                          </label>
                          <DatePicker
                            defaultValue="Date of Receipt"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="bg-blue-100 text-center"
                            onFocus={(e) => e.target.blur()}
                            dateFormat="dd/MM/yyyy"
                            onClick={() => setDisplayDate(true)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="m-3">
                      <input
                        type="invoice"
                        className="form-control w-55 opacity-4 mb-2 mt-2 text-center font-bold"
                        id="colFormLabel"
                        placeholder="Invoice Number"
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        onClick={() => setDisplayInvoice(true)}
                      />
                    </div>
                    <div>
                      <div className="whitespace-no-wrap m-0 w-full max-w-min rounded-lg bg-white py-1 px-1 dark:bg-slate-900">
                        <div className="mx-auto mb-0 max-w-min">
                          <table className="m-auto max-w-min table-fixed border border-black">
                            <thead className="whitespace-no-wrap max-w-fit overflow-hidden truncate">
                              <tr className="whitespace-no-wrap max-w-fit overflow-hidden px-2">
                                <th className="px-15 text-black">Item</th>
                                <th className="px-15 text-black">Price</th>
                                <th
                                  className="px-1"
                                  colSpan={3}
                                  style={{ width: "33.33%" }}
                                >
                                  <span className="border-r border-black pr-2 pl-4 text-black">
                                    Me
                                  </span>
                                  <span className="border-r border-l border-black px-2 text-black">
                                    Split
                                  </span>
                                  <span className="border-l border-black pl-2 text-black">
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
                                    className="form-control mb-1 w-20 px-1 text-xs font-bold"
                                    id="colFormLabel"
                                    placeholder="Item Name"
                                    value={name}
                                    onKeyDown={handleKeyDown}
                                    onChange={handleNameChange}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="amount"
                                    className="form-control mb-1 w-20 px-1 text-xs font-bold"
                                    id="colFormLabel"
                                    placeholder="Amount"
                                    value={amount}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      const isValid = /^\d+(\.\d{0,2})?$/.test(
                                        value
                                      );

                                      if (isValid || value === "") {
                                        // Allow empty value
                                        setAmount(value);
                                        console.log("amount verified");
                                      } else {
                                        console.log("amount not verified");
                                      }
                                    }}
                                  />
                                </td>
                                <td colSpan="3" className="px-2">
                                  <div
                                    style={{ width: "auto", margin: "auto" }}
                                  >
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

                              <tr className="add-button m-2 items-center justify-center text-center text-black">
                                <button
                                  className="add-button m-2 items-center justify-center text-center text-2xl text-gray-500"
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
                                  <td className=" text-black">
                                    {item.name.replace(/\b\w/g, (c) =>
                                      c.toUpperCase()
                                    )}
                                  </td>
                                  <td className="mr-2 flex items-center text-sm">
                                    <button
                                      className="add-button m-2 items-center justify-center text-center text-2xl text-gray-500"
                                      onClick={() => handleDelete(index)}
                                    >
                                      <IoMdRemoveCircleOutline />
                                    </button>
                                    <span className="ml-2 text-black">
                                      ${item.amount}
                                    </span>
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
                                  className="px-2 py-1 text-black"
                                  style={{ width: "33.33%" }}
                                >
                                  Total:
                                </td>
                                <td
                                  className="mr-2 px-2 py-1 text-right  text-black"
                                  style={{ width: "33.33%" }}
                                >
                                  ${getTotal()}
                                </td>
                                <td
                                  className="border-l border-gray-500 px-2 py-1 text-center text-xs  text-black"
                                  style={{ width: "33.33%" }}
                                >
                                  {parseFloat(youTotal).toFixed(2)}
                                </td>
                                <td
                                  className="border-l border-gray-500 px-2 py-1 text-center text-xs  text-black"
                                  style={{ width: "33.33%" }}
                                >
                                  {parseFloat(splitTotal).toFixed(2)}
                                </td>
                                <td
                                  className="border-l border-gray-500 px-2 py-1 text-center text-xs  text-black"
                                  style={{ width: "33.33%" }}
                                >
                                  {parseFloat(themTotal).toFixed(2)}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-center rounded-lg bg-white px-3 py-2 shadow-md">
                        <label className="text-center text-lg font-medium">
                          {selectedValue === "you" ? (
                            <>
                              {personName} owes you $
                              {parseFloat(personReceiptAmount).toFixed(2)}
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

                    <div className="col-sm-10 ml-0 mr-0 mt-3 flex flex-col items-center justify-center">
                      <div>
                        <Link to={`/ReceiptInput/${id}`}>
                          <button
                            className="mt-4 mb-5 rounded border-2 border-blue-500 bg-blue-500 py-2 px-4 font-bold shadow transition-all duration-300 hover:bg-white"
                            onClick={(e) => {
                              getFinalTotal();
                              setSelectMethodManual(false);
                              setSelectPersonReceipt(true);
                              handleHistorySubmit(e);
                              resetReceiptForm();
                              setIsReceiptSubmitted(true);
                            }}
                          >
                            Add Another Receipt
                          </button>
                        </Link>
                      </div>

                      <div>
                        <Link to="/SplitBill">
                          <button
                            type="submit"
                            className="mb-5 rounded border-2 border-blue-500 bg-blue-500 py-2 px-4 font-bold shadow transition-all duration-300 hover:bg-white"
                            onClick={(e) => {
                              getFinalTotal();
                              handleHistorySubmit(e);
                              resetReceiptForm();
                              setIsReceiptSubmitted(true);
                            }}
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
      {selectMethodPicture ? (
        <>
          <main className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl">
            <div className="mt-0 flex flex-col items-center justify-center">
              <Header selectMethodPicture={selectMethodPicture} />
              <div className="l-36 bg-grey flex flex-col  items-center justify-center rounded-lg px-6 py-6 ring-slate-900/5 dark:bg-slate-900">
                <div className="max-w-fit">
                  <label
                    htmlFor="payment"
                    className="form-control justify-left mt-0 flex items-center px-2"
                  >
                    <div className="whitespace-no-wrap w-22 pl-2 ">
                      Who paid?
                    </div>
                    <div className="inline-flex px-2">
                      <button
                        className={`m-0 rounded-l bg-blue-500 py-1 px-2 font-bold text-white ${
                          selected === 1 ? "bg-blue-700" : ""
                        } h-8 w-16`}
                        onClick={() => {
                          handleButton1Click();
                          setSelectedValue("you");
                          setShowTable(true);
                          setDisplayMerchant(false);
                          setDisplayDate(false);
                          setDisplayInvoice(false);
                        }}
                      >
                        Me
                      </button>
                      <button
                        className={`m-0 rounded-r border-l bg-blue-500 py-1 px-3 font-bold text-white ${
                          selected === 2 ? "bg-blue-700" : ""
                        } min-w-16 max-w-24 h-8 overflow-hidden`}
                        onClick={() => {
                          handleButton2Click();
                          setSelectedValue("them");
                          setShowTable(true);
                        }}
                      >
                        {personName.length > 12
                          ? personName.slice(0, 12) + "..."
                          : personName}
                      </button>
                    </div>
                  </label>
                </div>
                {showTable ? (
                  <>
                    <div>
                      {showCameraImage ? (
                        <div className="ml-0 mr-0 mt-3 flex flex-col items-center justify-center">
                          <img src={photoData} alt="Captured Receipt" />
                          <button
                            className="ml-auto mr-auto mt-4 mb-5 items-center justify-center rounded border-2 border-blue-500 bg-blue-500 py-2 px-4 font-bold shadow transition-all duration-300 hover:bg-white"
                            onClick={() => setShowCameraImage(false)}
                          >
                            Redo picture
                          </button>
                        </div>
                      ) : (
                        <Camera
                          idealFacingMode="environment"
                          onTakePhoto={(dataUri) => handleCapturePhoto(dataUri)}
                        />
                      )}

                      <div className="ml-0 mr-0 mt-3 flex flex-col items-center justify-center">
                        <button
                          className="ml-auto mr-auto mt-4 mb-5 items-center justify-center rounded border-2 border-blue-500 bg-blue-500 py-2 px-4 font-bold shadow transition-all duration-300 hover:bg-white"
                          onClick={handleCameraSubmit}
                        >
                          Process Receipt Image
                        </button>
                      </div>
                    </div>
                    {displayPictureInfo ? (
                      <>
                        <div className="col-sm-10 ml-0 mr-0 mt-3 flex flex-col items-center justify-center">
                          <div className="col-sm-10 mb-0 mt-3">
                            <input
                              type="amount"
                              className="form-control mb-5 h-10 text-center font-bold"
                              id="colFormLabel"
                              placeholder={merchantName}
                              onKeyDown={handleKeyDown}
                              onChange={(e) =>
                                setMerchantName(
                                  e.target.value.replace(/\b\w/g, (c) =>
                                    c.toUpperCase()
                                  )
                                )
                              }
                            />
                            <div className="mt-3 flex h-11 items-center justify-center ">
                              <div className="z-50 mt-3 mb-3 text-center">
                                <label
                                  htmlFor="colFormLabel"
                                  className="col-form-label text-center text-black"
                                >
                                  Date of Receipt
                                </label>
                                <DatePicker
                                  defaultValue="Date of Receipt"
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                  className="bg-blue-100 text-center"
                                  onFocus={(e) => e.target.blur()}
                                  dateFormat="dd/MM/yyyy"
                                  onClick={() => setDisplayDate(true)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="whitespace-no-wrap m-0 mt-3 w-full max-w-min rounded-lg bg-white py-1 px-1 dark:bg-slate-900">
                            <div className="mx-auto mb-0 max-w-min">
                              <table className="m-auto max-w-min table-fixed border border-black">
                                <thead className="whitespace-no-wrap max-w-fit overflow-hidden truncate">
                                  <tr className="whitespace-no-wrap max-w-fit overflow-hidden px-2">
                                    <th className="px-15 text-black">Item</th>
                                    <th className="px-15 text-black">Price</th>
                                    <th
                                      className="px-1"
                                      colSpan={3}
                                      style={{ width: "33.33%" }}
                                    >
                                      <span className="border-r border-black pr-2 pl-4 text-black">
                                        Me
                                      </span>
                                      <span className="border-r border-l border-black px-2 text-black">
                                        Split
                                      </span>
                                      <span className="border-l border-black pl-2 text-black">
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
                                        className="form-control mb-1 w-20 px-1 text-xs font-bold"
                                        id="colFormLabel"
                                        placeholder="Item Name"
                                        value={name}
                                        onKeyDown={handleKeyDown}
                                        onChange={handleNameChange}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="amount"
                                        className="form-control mb-1 w-20 px-1 text-xs font-bold"
                                        id="colFormLabel"
                                        placeholder="Amount"
                                        value={amount}
                                        onKeyDown={handleKeyDown}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const isValid =
                                            /^\d+(\.\d{0,2})?$/.test(value);

                                          if (isValid || value === "") {
                                            // Allow empty value
                                            setAmount(value);
                                            console.log("amount verified");
                                          } else {
                                            console.log("amount not verified");
                                          }
                                        }}
                                      />
                                    </td>
                                    <td colSpan="3" className="px-2">
                                      <div
                                        style={{
                                          width: "auto",
                                          margin: "auto",
                                        }}
                                      >
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

                                  <tr className="add-button m-2 items-center justify-center text-center text-black">
                                    <button
                                      className="add-button m-2 items-center justify-center text-center text-2xl text-gray-500"
                                      onClick={() => {
                                        handleReceiptPictureSubmit(sliderValue);
                                        handleSaveClick();
                                      }}
                                    >
                                      <IoMdAddCircleOutline />
                                    </button>
                                  </tr>
                                  {obtainedInfo.map((item, index) => (
                                    <tr
                                      key={index}
                                      className={
                                        index % 2 === currentIndex % 2
                                          ? "bg-blue-100"
                                          : ""
                                      }
                                    >
                                      <td className=" text-black">
                                        {item.description.replace(
                                          /\b\w/g,
                                          (c) => c.toUpperCase()
                                        )}
                                      </td>
                                      <td className="mr-2 flex items-center text-sm">
                                        <button
                                          className="add-button m-2 items-center justify-center text-center text-2xl text-gray-500"
                                          onClick={() => handleDelete(index)}
                                        >
                                          <IoMdRemoveCircleOutline />
                                        </button>
                                        <span className="ml-2 text-black">
                                          $
                                          {parseFloat(
                                            item.total_amount
                                          ).toFixed(2)}
                                        </span>
                                      </td>{" "}
                                      <td colSpan="3" className="px-2">
                                        <div
                                          style={{
                                            width: "auto",
                                            margin: "auto",
                                          }}
                                        >
                                          <Slider
                                            defaultValue={55} // Set default value to 55 if not present
                                            min={0}
                                            max={100}
                                            step={55}
                                            value={item.sliderValue}
                                            onChange={(value) =>
                                              handlePictureSliderChange(
                                                index,
                                                value
                                              )
                                            }
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
                                  <tr>  {getPictureTotalPopup && (
        <div className="popup">
          <p>{getPictureTotalMessage}</p>
        </div>
      )}</tr>
                                  <tr className="border-t border-gray-500 bg-blue-200">
                                    <td
                                      className="px-2 py-1 text-black"
                                      style={{ width: "33.33%" }}
                                    >
                                      Total:
                                    </td>
                                    <td
                                      className="mr-2 px-2 py-1 text-right  text-black"
                                      style={{ width: "33.33%" }}
                                    >
                                      ${getPictureTotal()}
                                    </td>
                                    <td
                                      className="border-l border-gray-500 px-2 py-1 text-center text-xs  text-black"
                                      style={{ width: "33.33%" }}
                                    >
                                      {parseFloat(youPictureTotal).toFixed(2)}
                                    </td>
                                    <td
                                      className="border-l border-gray-500 px-2 py-1 text-center text-xs  text-black"
                                      style={{ width: "33.33%" }}
                                    >
                                      {parseFloat(splitPictureTotal).toFixed(2)}
                                    </td>
                                    <td
                                      className="border-l border-gray-500 px-2 py-1 text-center text-xs  text-black"
                                      style={{ width: "33.33%" }}
                                    >
                                      {parseFloat(themPictureTotal).toFixed(2)}
                                    </td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-center rounded-lg bg-white px-3 py-2 shadow-md">
                            <label className="text-center text-lg font-medium">
                              Receipt Total: ${pictureTotal}
                            </label>
                          </div>
                          <div>
                            <Link to={`/ReceiptInput/${id}`}>
                              <button
                                className="mt-4 mb-5 rounded border-2 border-blue-500 bg-blue-500 py-2 px-4 font-bold shadow transition-all duration-300 hover:bg-white"
                                onClick={(e) => {
                                  getFinalPictureTotal();
                                  setSelectMethodManual(false);
                                  setSelectPersonReceipt(true);
                                  handleHistorySubmit(e);
                                  resetReceiptForm();
                                  setIsReceiptSubmitted(true);
                                }}
                              >
                                Add Another Receipt
                              </button>
                            </Link>
                          </div>

                          <div>
                            <Link to="/SplitBill">
                              <button
                                type="submit"
                                className="mb-5 rounded border-2 border-blue-500 bg-blue-500 py-2 px-4 font-bold shadow transition-all duration-300 hover:bg-white"
                                onClick={(e) => {
                                  getFinalTotal();
                                  handleHistorySubmit(e);
                                  resetReceiptForm();
                                  setIsReceiptSubmitted(true);
                                }}
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
