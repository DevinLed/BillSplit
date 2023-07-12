import React, { useRef, useState, useEffect, onBlur, useCamera } from "react";
import { useParams } from "react-router-dom";
import { Camera } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import loading from "../img/loading.gif";
import Header from "./Header";
import ReceiptTable from "./ReceiptTable";
import { Link } from "react-router-dom";
import "../darkMode.css";
import { IoCameraSharp, IoEnterOutline } from "react-icons/io5";

import DatePicker from "react-datepicker";

import "rc-slider/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";

export default function ReceiptInput({
  personName,
  personOwing,
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
  value,
  addReceipt,
  selectedValue,
  setSelectedValue,
  displayMerchant,
  displayDate,
  displayInvoice,
  setDisplayMerchant,
  setDisplayDate,
  setDisplayInvoice,
  setIsReceiptSubmitted,
  youPictureTotal,
  splitPictureTotal,
  themPictureTotal,
  setYouPictureTotal,
  setSplitPictureTotal,
  setThemPictureTotal,
}) {
  const [selectPersonReceipt, setSelectPersonReceipt] = useState(true);
  const [selectMethodManual, setSelectMethodManual] = useState(false);
  const [selectMethodPicture, setSelectMethodPicture] = useState(false);
  const [photoData, setPhotoData] = useState(null);
  const [pictureTotal, setPictureTotal] = useState(0);
  const [pictureTax, setPictureTax] = useState(0);
  const [pictureConfidence, setPictureConfidence] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [showCameraImage, setShowCameraImage] = useState(false);
  const [showRedoButton, setShowRedoButton] = useState(false);
  const [displayPictureInfo, setDisplayPictureInfo] = useState(false);
  const [obtainedInfo, setObtainedInfo] = useState([]);
  const [isAddedManually, setIsAddedManually] = useState(false);
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTable, setShowTable] = useState("");
  const [youTotal, setYouTotal] = useState(0);
  const [splitTotal, setSplitTotal] = useState(0);
  const [themTotal, setThemTotal] = useState(0);
  const [combinedArray, setCombinedArray] = useState([]);
  const [selected, setSelected] = useState(null);

  // Picture handling API section
  const FormData = require("form-data");
  const apiKey = "561e58edb1c93ab9fec230c1439fbf48";
  const account = "mindee";
  const endpoint = "expense_receipts";
  const version = "5.0";
  const handleCapturePhoto = (dataUri) => {
    setPhotoData(dataUri);
    setShowCameraImage(true);
    setShowRedoButton(true);
  };
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
      const lineItems =
        responseData.document.inference.prediction.line_items.map((item) => ({
          ...item,
          confidence: item.confidence || 0, // Handle cases where confidence is missing
        }));
      setObtainedInfo(lineItems);
      setDisplayPictureInfo(true);

      const totalAmount =
        responseData.document.inference.prediction.total_amount.value || 0;
      const taxAmount =
        responseData.document.inference.prediction.total_tax.value;
      const taxConfidence =
        responseData.document.inference.prediction.total_tax.confidence;
      setMerchantName(
        responseData.document.inference.prediction.supplier_name.value
      );
      if (merchantName === null) {
        setDisplayMerchant(false);
      }

      console.log(responseData.document);
      setPictureConfidence(taxConfidence);
      setPictureTax(taxAmount || 0);
      setPictureTotal(totalAmount);
      setShowImage(false);
      setPhotoData(photoData);
      setSplitPictureTotal(totalAmount);
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  function resetReceiptForm() {
    setMerchantName("");
    setInvoiceNumber("");
    setStartDate(new Date());
  }

  // Handler for enter key on mobile collasping keyboard pop
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

  // Handlers for selected values, either me or them
  const handleButton1Click = () => {
    setSelected(1);
  };
  const handleButton2Click = () => {
    setSelected(2);
  };

  // Handler for adding items to the table array manually
  const handleReceiptPictureSubmit = (sliderValue) => {
    if (!name || !amount) {
      return;
    }
    const parsedAmount = parseFloat(amount).toFixed(2);

    setObtainedInfo((prevInfo) => [
      ...prevInfo,
      {
        name: name,
        amount: parsedAmount,
        sliderValue: sliderValue,
      },
    ]);

    switch (sliderValue) {
      case 0:
        setYouPictureTotal((prevTotal) =>
          (parseFloat(prevTotal) + parseFloat(parsedAmount)).toFixed(2)
        );
        break;
      case 55:
        setSplitPictureTotal((prevTotal) =>
          (parseFloat(prevTotal) + parseFloat(parsedAmount)).toFixed(2)
        );
        break;
      case 100:
        setThemPictureTotal((prevTotal) =>
          (parseFloat(prevTotal) + parseFloat(parsedAmount)).toFixed(2)
        );
        break;
      default:
        break;
    }

    setName("");
    setAmount("");
    setCurrentIndex(currentIndex + 1);
  };

  // Handler to reset table array on back/exit
  const handleResetTotals = () => {
    setObtainedInfo([]);
    setYouPictureTotal(0);
    setSplitPictureTotal(0);
    setThemPictureTotal(0);
    setPersonReceiptAmount(0);
    setPictureTax();
  };

  // Used to calculate the amount by adding up all the item.amount of entries in the table array
  const getPictureTotal = () => {
    let total =
      parseFloat(splitPictureTotal) +
      parseFloat(themPictureTotal) +
      parseFloat(youPictureTotal);

    let splitValue = parseFloat(splitPictureTotal) / 2;
    let themValue = parseFloat(themPictureTotal);
    let youValue = parseFloat(youPictureTotal);

    if (selectedValue === "you") {
      setPersonReceiptAmount(splitValue + themValue);
    } else if (selectedValue === "them") {
      setPersonReceiptAmount(splitValue + youValue);
    }
    return parseFloat(total).toFixed(2);
  };

  // Handler to push entries into the History tab array
  const handleHistorySubmit = () => {
    const newReceipt = {
      personName,
      personOwing,
      personReceiptAmount,
      selectedValue,
      merchantName,
      startDate,
      invoiceNumber,
      displayMerchant,
      displayDate,
      displayInvoice,
    };

    addReceipt(newReceipt);
  };

  // Used to update the balance of the person you are splitting receipt with
  const getFinalTotal = () => {
    if (selectedValue === "you") {
      console.log(personReceiptAmount);
      addNum(id, personOwing, personReceiptAmount);
    } else {
      console.log(personReceiptAmount);
      subNum(id, personOwing, personReceiptAmount);
    }
  };

  useEffect(() => {
    setObtainedInfo((prevInfo) =>
      prevInfo.map((item) => ({
        ...item,
        sliderValue: item.sliderValue || 55,
      }))
    );
  }, []);

  return (
    <>
      {selectPersonReceipt ? (
        <>
          <main className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl">
            <div className="flex flex-col items-center justify-center">
              <Header
                selectPersonReceipt={selectPersonReceipt}
                handleResetTotals={handleResetTotals}
              />

              <div className="flex flex-col items-center justify-center">
                <h1>Split a bill with {personName}</h1>
                <ul className="list-group items-center justify-center">
                  <Link className="flex flex-col items-center justify-center">
                    <label
                      className="mt-4 mb-4 mb-0 flex h-24 w-1/3 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-14 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
                      onClick={(e) => {
                        setSelectMethodManual(true);
                        setSelectPersonReceipt(false);
                      }}
                    >
                      <IoEnterOutline size={24} />
                      <li>Manual</li>
                    </label>
                  </Link>
                  <li className="flex flex-col items-center justify-center">
                    <label
                      className="mt-4 mb-4 mb-0 flex h-24 w-1/3 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-14 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
                      onClick={(e) => {
                        setSelectMethodPicture(true);
                        setSelectPersonReceipt(false);
                      }}
                    >
                      <IoCameraSharp size={24} />
                      Picture
                    </label>
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
              <Header
                selectMethodManual={selectMethodManual}
                handleResetTotals={handleResetTotals}
              />

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
                      <ReceiptTable
                        name={name}
                        amount={amount}
                        setAmount={setAmount}
                        items={items}
                        currentIndex={currentIndex}
                        getPictureTotal={getPictureTotal}
                        youTotal={youTotal}
                        themTotal={themTotal}
                        splitTotal={splitTotal}
                        handleReceiptPictureSubmit={handleReceiptPictureSubmit}
                        setIsAddedManually={setIsAddedManually}
                        combinedArray={combinedArray}
                        setCombinedArray={setCombinedArray}
                        pictureTotal={pictureTotal}
                        youPictureTotal={youPictureTotal}
                        splitPictureTotal={splitPictureTotal}
                        themPictureTotal={themPictureTotal}
                        obtainedInfo={obtainedInfo}
                        setObtainedInfo={setObtainedInfo}
                        selectMethodManual={selectMethodManual}
                        setThemPictureTotal={setThemPictureTotal}
                        setSplitPictureTotal={setSplitPictureTotal}
                        setYouPictureTotal={setYouPictureTotal}
                        selectedValue={selectedValue}
                        personName={personName}
                        personReceiptAmount={personReceiptAmount}
                        setPersonReceiptAmount={setPersonReceiptAmount}
                        setName={setName}
                      />
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
              <Header
                selectMethodPicture={selectMethodPicture}
                handleResetTotals={handleResetTotals}
              />
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
                            className="ml-auto mr-auto mt-4 mb-2 items-center justify-center rounded border-2 border-blue-500 bg-blue-500 py-2 px-4 font-bold shadow transition-all duration-300 hover:bg-white"
                            onClick={(e) =>
                              setShowCameraImage(false)(handleResetTotals(e))
                            }
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

                      <div className="ml-0 mr-0 mt-1 flex flex-col items-center justify-center">
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
                            <ReceiptTable
                              name={name}
                              amount={amount}
                              setAmount={setAmount}
                              items={items}
                              currentIndex={currentIndex}
                              getPictureTotal={getPictureTotal}
                              youTotal={youTotal}
                              themTotal={themTotal}
                              splitTotal={splitTotal}
                              handleReceiptPictureSubmit={
                                handleReceiptPictureSubmit
                              }
                              setIsAddedManually={setIsAddedManually}
                              combinedArray={combinedArray}
                              setCombinedArray={setCombinedArray}
                              pictureTotal={pictureTotal}
                              youPictureTotal={youPictureTotal}
                              splitPictureTotal={splitPictureTotal}
                              themPictureTotal={themPictureTotal}
                              setObtainedInfo={setObtainedInfo}
                              obtainedInfo={obtainedInfo}
                              selectMethodPicture={selectMethodPicture}
                              selectedValue={selectedValue}
                              personName={personName}
                              personReceiptAmount={personReceiptAmount}
                              setPersonReceiptAmount={setPersonReceiptAmount}
                              selectMethodManual={selectMethodManual}
                              setThemPictureTotal={setThemPictureTotal}
                              setSplitPictureTotal={setSplitPictureTotal}
                              setYouPictureTotal={setYouPictureTotal}
                              pictureTax={pictureTax}
                              setPictureTax={setPictureTax}
                              pictureConfidence={pictureConfidence}
                              setName={setName}
                            />
                          </div>

                          <div>
                            <Link to={`/ReceiptInput/${id}`}>
                              <button
                                className="mt-4 mb-5 rounded border-2 border-blue-500 bg-blue-500 py-2 px-4 font-bold shadow transition-all duration-300 hover:bg-white"
                                onClick={(e) => {
                                  getFinalTotal();
                                  setSelectMethodPicture(false);
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
