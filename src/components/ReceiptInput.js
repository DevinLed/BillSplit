import React, { useRef, useState, useEffect, onBlur, useCamera } from "react";
import { useParams } from "react-router-dom";
import { Camera } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import loading from "../img/loading.gif";
import Header from "./Header";
import ReceiptTable from "./ReceiptTable";
import { Link } from "react-router-dom";
import "../darkMode.css";
import {
  IoCameraSharp,
  IoEnterOutline,
  IoCardOutline,
  IoExitOutline,
  IoDuplicateOutline,
  IoRepeatSharp,
  IoCheckmarkCircle,
  IoHandLeftOutline
} from "react-icons/io5";

import DatePicker from "react-datepicker";
import { CSSTransition } from "react-transition-group";

import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
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
  theme,
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
  const [isMerchantNameFocused, setMerchantNameFocused] = useState(false);
  const [isInvoiceNumberFocused, setInvoiceNumberFocused] = useState(false);

  const [filledIn, setFilledIn] = useState(false);
  const handleMerchantNameFocus = () => {
    setMerchantNameFocused(true);
  };

  const handleInvoiceNumberFocus = () => {
    setInvoiceNumberFocused(true);
  };

  const handleScroll = () => {
    const scrollAmount = window.innerHeight * 1.5;
    const duration = 500; // Adjust the duration (in milliseconds) as needed
    const start = window.scrollY;
    const startTime = performance.now();

    // Smooth scrolling function
    function smoothScroll(currentTime) {
      const timeElapsed = currentTime - startTime;
      const scroll = easeInOutQuad(timeElapsed, start, scrollAmount, duration);
      window.scrollTo(0, scroll);
      if (timeElapsed < duration) {
        requestAnimationFrame(smoothScroll);
      }
    }

    // Easing function for smoother scrolling
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    // Initiate smooth scrolling
    requestAnimationFrame(smoothScroll);
  };

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
    document.body.classList.add("scroll-transition");
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
      handleScroll();
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  function resetReceiptForm() {
    setMerchantName("");
    setInvoiceNumber("");
    setStartDate(new Date());
    setSelectMethodManual(false);
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
                theme={theme}
              />

              <div className="flex flex-col items-center justify-center">
                <h1>Split a bill with {personName}</h1>
                <ul className="list-group items-center justify-center">
                  <Link className="flex flex-col items-center justify-center">
                    <label
                      className={
                        "mt-4 mb-4 mb-0 flex h-24 w-fit flex-col items-center justify-center rounded-lg border " +
                        (theme === "dark"
                          ? "border-gray-900 bg-gray-900 text-white hover:bg-gray-800"
                          : "border-gray-200 bg-white text-gray-800 hover:bg-gray-200") +
                        " py-4 px-10 text-sm font-semibold shadow-md hover:no-underline"
                      }
                      onClick={(e) => {
                        setSelectMethodManual(true);
                        setSelectPersonReceipt(false);
                      }}
                    >
                      <IoHandLeftOutline size={24} />
                    </label>
                  </Link>
                  <li className="flex flex-col items-center justify-center">
                    <label
                      className={
                        "mt-1 mb-4 mb-0 flex h-24 w-fit flex-col items-center justify-center rounded-lg border " +
                        (theme === "dark"
                          ? "border-gray-900 bg-gray-900 text-white hover:bg-gray-800"
                          : "border-gray-200 bg-white text-gray-800 hover:bg-gray-200") +
                        " py-4 px-10 text-sm font-semibold shadow-md hover:no-underline"
                      }
                      onClick={(e) => {
                        setSelectMethodPicture(true);
                        setSelectPersonReceipt(false);
                      }}
                    >
                      <IoCameraSharp size={24} />
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
      <CSSTransition
        in={selectMethodManual}
        timeout={500} // Adjust the duration of the transition as needed
        classNames="fade"
        unmountOnExit
      >
        <main className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl">
          <div className="mt-0 flex flex-col items-center justify-center">
            <Header
              selectMethodManual={selectMethodManual}
              handleResetTotals={handleResetTotals}
            />

            <div className="container mx-auto px-2 py-8 ">
              <div className="overflow-hidden rounded-lg shadow">
                <div
                  className={
                    theme === "dark" ? "bg-gray-900 px-6 " : "bg-gray-900 px-6 "
                  }
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <input
                        type="amount"
                        className="form-control mt-3 h-10 bg-gray-900 text-left font-bold text-gray-300 outline-none"
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
                      <div>
                        <input
                          type="invoice"
                          className="form-control opacity-4 mb-3 w-40 bg-gray-900 text-left font-bold text-gray-300 outline-none"
                          id="colFormLabel"
                          placeholder="Invoice Number"
                          onKeyDown={handleKeyDown}
                          onChange={(e) => setInvoiceNumber(e.target.value)}
                          onClick={() => setDisplayInvoice(true)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    theme === "dark"
                      ? "bg-gray-900 px-2 sm:px-6"
                      : "bg-white px-2 sm:px-6"
                  }
                >
                  <div className="mb-4">
                    <h2
                      className={
                        theme === "dark"
                          ? "text-xl font-bold text-white"
                          : "text-xl font-bold text-black"
                      }
                    >
                      Split with:
                    </h2>
                    <p
                      className={
                        theme === "dark"
                          ? "text-xl font-bold text-white"
                          : "text-xl font-bold text-black"
                      }
                    >
                      {personName}
                    </p>
                  </div>
                  <div className="max-w-fit">
                    <label
                      htmlFor="payment"
                      className={
                        theme === "dark"
                          ? "form-control mt-0 mb-0 flex items-center justify-center   bg-gray-600  px-0"
                          : "form-control mt-0 mb-0 flex items-center   justify-center  px-0"
                      }
                    >
                      <div
                        className={
                          theme === "dark"
                            ? "whitespace-no-wrap w-12 pl-2 text-white"
                            : "whitespace-no-wrap w-12 pl-2"
                        }
                      >
                        <IoCardOutline size={36} />
                      </div>
                      <div className="inline-flex px-2">
                        <button
                          className={`m-0 rounded-l ${
                            selected === 1 ? "bg-gray-500" : "bg-gray-900"
                          } h-8 w-16 py-1 px-2 font-bold text-white`}
                          onClick={() => {
                            handleButton1Click();
                            setSelected(1);
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
                          className={`m-0 rounded-r border-l ${
                            selected === 2 ? "bg-gray-500" : "bg-gray-900"
                          } min-w-16 max-w-24 h-8 overflow-hidden py-1 px-3 font-bold text-white`}
                          onClick={() => {
                            handleButton2Click();
                            setSelected(2);
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
                  <CSSTransition
                    in={showTable}
                    timeout={500} // Adjust the duration of the transition as needed
                    classNames="fade"
                    unmountOnExit
                  >
                    <div>
                      <div className="mt-0">
                        <label
                          htmlFor="colFormLabel"
                          className={
                            theme === "dark"
                              ? "col-form-label text-center text-white"
                              : "col-form-label text-center text-black"
                          }
                        >
                          Date of Receipt
                        </label>
                        <div className="justify-left z-50 mt-3 mb-3 text-center">
                          <DatePicker
                            defaultValue="Date of Receipt"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="justify-left bg-blue-100 text-center"
                            onFocus={(e) => e.target.blur()}
                            dateFormat="dd/MM/yyyy"
                            onClick={() => setDisplayDate(true)}
                          />
                        </div>
                      </div>

                      <div className="flex-column flex items-center justify-center">
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
                          filledIn={filledIn}
                          setFilledIn={setFilledIn}
                          theme={theme}
                        />
                      </div>
                    </div>
                  </CSSTransition>
                </div>
                <div
  className={
    theme === "dark"
      ? "grid grid-cols-2 gap-y-0 bg-gray-900 py-4 justify-center"
      : "grid grid-cols-2 gap-y-0 bg-white py-4 justify-center"
  }
>
  <div className="m-2 mb-4 flex flex-col justify-center items-center sm:flex-row">
    <Link to={`/ReceiptInput/${id}`}>
      <label
        className={
          "flex h-24 w-28 flex-col items-center justify-center rounded-lg border border-gray-200 py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline " +
          (theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-800")
        }
        onClick={(e) => {
          getFinalTotal();
          setSelectMethodPicture(false);
          setSelectPersonReceipt(true);
          handleHistorySubmit(e);
          resetReceiptForm();
          setIsReceiptSubmitted(true);
        }}
      >
        <IoDuplicateOutline size={24} />
      </label>
    </Link>
  </div>
  <div className="m-2 mb-4 flex flex-col justify-center items-center sm:flex-row">
    <Link to="/SplitBill">
      <label
        className={
          "flex h-24 w-28 flex-col items-center justify-center rounded-lg border border-gray-200 py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline " +
          (theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-800")
        }
        onClick={(e) => {
          getFinalTotal();
          handleHistorySubmit(e);
          resetReceiptForm();
          setIsReceiptSubmitted(true);
        }}
      >
        <IoExitOutline size={24} />
      </label>
    </Link>
  </div>
</div>
</div>
            </div>
          </div>
        </main>
      </CSSTransition>
      <CSSTransition
        in={selectMethodPicture}
        timeout={500} // Adjust the duration of the transition as needed
        classNames="fade"
        unmountOnExit
      >
        <main className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl">
          <div className="mt-0 flex flex-col items-center justify-center">
            <Header
              selectMethodPicture={selectMethodPicture}
              handleResetTotals={handleResetTotals}
              theme={theme}
            />
            <div className="l-36 bg-grey flex flex-col  items-center justify-center rounded-lg px-6 ring-slate-900/5 dark:bg-slate-900">
              <div className="max-w-fit">
                <label
                  htmlFor="payment"
                  className="justify-left mt-0 mb-3 flex items-center px-2"
                >
                  <div className="whitespace-no-wrap w-22 pl-2 text-black">
                    <IoCardOutline size={24} />
                  </div>
                  <div className="inline-flex px-2">
                    <button
                      className={`m-0 rounded-l ${
                        selected === 1 ? "bg-gray-500" : "bg-gray-900"
                      } h-8 w-16 py-1 px-2 font-bold text-white`}
                      onClick={() => {
                        handleButton1Click();
                        setSelected(1);
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
                      className={`m-0 rounded-r border-l ${
                        selected === 2 ? "bg-gray-500" : "bg-gray-900"
                      } min-w-16 max-w-24 h-8 overflow-hidden py-1 px-3 font-bold text-white`}
                      onClick={() => {
                        handleButton2Click();
                        setSelected(2);
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
                        <img
                          src={photoData}
                          alt="Captured Receipt"
                          className={photoData === loading ? "w-32" : "w-72"}
                        />
                        <label
                          className={
                            theme === "dark"
                              ? "mt-2 flex h-24 w-fit cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 py-4 px-6 text-sm font-semibold text-white shadow-md hover:bg-gray-700 hover:no-underline"
                              : "mt-2 flex h-24 w-fit cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
                          }
                          onClick={(e) =>
                            setShowCameraImage(false)(handleResetTotals(e))
                          }
                        >
                          <IoRepeatSharp size={24} />
                          Redo picture
                        </label>
                      </div>
                    ) : (
                      <div className="w-96 rounded-lg ">
                        <Camera
                          idealFacingMode="environment"
                          onTakePhoto={(dataUri) => handleCapturePhoto(dataUri)}
                          className="rounded-lg"
                        />
                      </div>
                    )}

                    <div className="ml-0 mr-0 mt-1 flex flex-col items-center justify-center">
                      <label
                        className={
                          theme === "dark"
                            ? "flex h-24 w-fit cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 py-4 px-6 text-sm font-semibold text-white shadow-md hover:bg-gray-700 hover:no-underline"
                            : "flex h-24 w-fit cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
                        }
                        onClick={handleCameraSubmit}
                      >
                        <IoCheckmarkCircle size={24} />
                        Process Receipt Image
                      </label>
                    </div>
                  </div>
                  {displayPictureInfo ? (
                    <>
                      <div className="container mx-auto px-2 py-8">
                        <div className="overflow-hidden rounded-lg shadow">
                          <div
                            className={
                              theme === "dark"
                                ? "bg-gray-900 px-6 "
                                : "bg-gray-900 px-6 "
                            }
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <input
                                autoComplete="off"
                                  type="amount"
                                  className="form-control mt-3 h-10 bg-gray-900 text-left font-bold text-gray-300 outline-none"
                                  id="colFormLabel"
                                  placeholder={merchantName || "Merchant Name"}
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
                                <div>
                                  <input
                                  autoComplete="off"
                                    type="invoice"
                                    className="form-control opacity-4 mb-3 w-40 bg-gray-900 text-left font-bold text-gray-300 outline-none"
                                    id="colFormLabel"
                                    placeholder="Invoice Number"
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) =>
                                      setInvoiceNumber(e.target.value)
                                    }
                                    onClick={() => setDisplayInvoice(true)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={
                              theme === "dark"
                                ? "bg-gray-900 px-2 sm:px-6"
                                : "bg-white px-2 sm:px-6"
                            }
                          >
                            <div className="mb-4">
                              <h2
                                className={
                                  theme === "dark"
                                    ? "text-xl font-bold text-white"
                                    : "text-xl font-bold text-black"
                                }
                              >
                                Split with:
                              </h2>
                              <p
                                className={
                                  theme === "dark"
                                    ? "text-xl font-bold text-white"
                                    : "text-xl font-bold text-black"
                                }
                              >
                                {personName}
                              </p>
                            </div>
                            <div className="max-w-fit">
                              <label
                                htmlFor="payment"
                                className={
                                  theme === "dark"
                                    ? "form-control mt-0 mb-0 flex items-center justify-center bg-gray-600  px-0"
                                    : "form-control mt-0 mb-0 flex items-center justify-center px-0"
                                }
                              >
                                <div
                                  className={
                                    theme === "dark"
                                      ? "whitespace-no-wrap w-12 pl-2 text-white"
                                      : "whitespace-no-wrap w-12 pl-2"
                                  }
                                >
                                  <IoCardOutline size={36} />
                                </div>
                                <div className="inline-flex px-2">
                                  <button
                                    className={`m-0 rounded-l ${
                                      selected === 1
                                        ? "bg-gray-500"
                                        : "bg-gray-900"
                                    } h-8 w-16 py-1 px-2 font-bold text-white`}
                                    onClick={() => {
                                      handleButton1Click();
                                      setSelected(1);
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
                                    className={`m-0 rounded-r border-l ${
                                      selected === 2
                                        ? "bg-gray-500"
                                        : "bg-gray-900"
                                    } min-w-16 max-w-24 h-8 overflow-hidden py-1 px-3 font-bold text-white`}
                                    onClick={() => {
                                      handleButton2Click();
                                      setSelected(2);
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
                            <CSSTransition
                              in={showTable}
                              timeout={500} // Adjust the duration of the transition as needed
                              classNames="fade"
                              unmountOnExit
                            >
                              <div>
                                <div className="mt-0">
                                  <label
                                    htmlFor="colFormLabel"
                                    className={
                                      theme === "dark"
                                        ? "col-form-label text-center text-white"
                                        : "col-form-label text-center text-black"
                                    }
                                  >
                                    Date of Receipt
                                  </label>
                                  <div className="justify-left z-50 mt-3 mb-3 text-center">
                                    <DatePicker
                                      defaultValue="Date of Receipt"
                                      selected={startDate}
                                      onChange={(date) => setStartDate(date)}
                                      className="justify-left bg-blue-100 text-center"
                                      onFocus={(e) => e.target.blur()}
                                      dateFormat="dd/MM/yyyy"
                                      onClick={() => setDisplayDate(true)}
                                    />
                                  </div>
                                </div>

                                <div className="flex-column flex items-center justify-center">
      
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
                                      obtainedInfo={obtainedInfo}
                                      setObtainedInfo={setObtainedInfo}
                                      selectMethodManual={selectMethodManual}
                                      setThemPictureTotal={setThemPictureTotal}
                                      setSplitPictureTotal={
                                        setSplitPictureTotal
                                      }
                                      setYouPictureTotal={setYouPictureTotal}
                                      selectedValue={selectedValue}
                                      personName={personName}
                                      personReceiptAmount={personReceiptAmount}
                                      setPersonReceiptAmount={
                                        setPersonReceiptAmount
                                      }
                                      setName={setName}
                                      filledIn={filledIn}
                                      setFilledIn={setFilledIn}
                                      theme={theme}
                                    />
                                  </div>
                                </div>
                              </div>
                            </CSSTransition>
                          </div>
                          <div
                            className={
                              theme === "dark"
                                ? "flex item-center justify-center gap-y-0 bg-gray-900 py-4"
                                : "flex item-center justify-center gap-y-0 bg-white py-4"
                            }
                          >
                            <div className="max-w-20 m-2 mb-4 flex flex-col justify-center sm:flex-row">
                              <Link to={`/ReceiptInput/${id}`}>
                                <button
                                  className={
                                    "flex h-24 w-fit flex-col items-center justify-center rounded-lg border border-gray-200 py-4 px-10 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline " +
                                    (theme === "dark"
                                      ? "bg-gray-900 text-white"
                                      : "bg-white text-gray-800")
                                  }
                                  onClick={(e) => {
                                    getFinalTotal();
                                    setSelectMethodPicture(false);
                                    setSelectPersonReceipt(true);
                                    handleHistorySubmit(e);
                                    resetReceiptForm();
                                    setIsReceiptSubmitted(true);
                                  }}
                                >
                                  <IoDuplicateOutline size={24} />
                                                                </button>
                              </Link>
                            </div>
                            <div className="max-w-20 m-2 mb-4 flex flex-col justify-center sm:flex-row">
                              <Link to="/SplitBill">
                                <button
                                  className={
                                    "flex h-24 w-fit flex-col items-center justify-center rounded-lg border border-gray-200 py-4 px-10 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline " +
                                    (theme === "dark"
                                      ? "bg-gray-900 text-white"
                                      : "bg-white text-gray-800")
                                  }
                                  onClick={(e) => {
                                    getFinalTotal();
                                    handleHistorySubmit(e);
                                    resetReceiptForm();
                                    setIsReceiptSubmitted(true);
                                  }}
                                >
                                  <IoExitOutline size={24} />
                                </button>
                              </Link>
                            </div>
                          </div>
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
      </CSSTransition>
    </>
  );
}
