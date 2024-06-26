import React, { useState, useEffect, } from "react";
import { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-US";
import fr from "date-fns/locale/fr";
import { useParams, useNavigate } from "react-router-dom";
import { Camera } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import loading from "../img/loading.gif";
import Header from "./Header";
import ReceiptTable from "./ReceiptTable";
import { useLocation } from "react-router-dom";
import "../darkMode.css";
import {
  IoExitOutline,
  IoRepeatSharp,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { Button } from "@material-tailwind/react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { CSSTransition } from "react-transition-group";
import "react-datepicker/dist/react-datepicker.css";
export default function ReceiptInput({
  personName,
  personEmail,
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
  taxRate,
  lang,
  combinedArray,
  setCombinedArray,
  handleResetCombinedArray,
  obtainedInfo,
  setObtainedInfo,
  loggedInUserEmail,
  submissionArray,
  setSubmissionArray,
  loggedInUsername,
  toggleTheme,
}) {
  registerLocale("en", en);
  registerLocale("fr", fr);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectMethodPicture = searchParams.get("selectMethodPicture");
  const selectMethodManual = searchParams.get("selectMethodManual");

  const { ContactId } = useParams();
  const [pictureError, setPictureError] = useState(false);
  const [submissionError, setSubmissionError] = useState(true);
  const [photoData, setPhotoData] = useState(null);
  const [pictureTotal, setPictureTotal] = useState(0);
  const [pictureTax, setPictureTax] = useState(0);
  const [taxReal, setTaxReal] = useState(0);
  const [pictureConfidence, setPictureConfidence] = useState(0);
  const [showCameraImage, setShowCameraImage] = useState(false);
  const [displayPictureInfo, setDisplayPictureInfo] = useState(false);
  const [isAddedManually, setIsAddedManually] = useState(false);
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [receiptTotal, setReceiptTotal] = useState(0);
  const [showTable, setShowTable] = useState("");
  const [youTotal, setYouTotal] = useState(0);
  const [splitTotal, setSplitTotal] = useState(0);
  const [themTotal, setThemTotal] = useState(0);
  const [selected, setSelected] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  const [filledIn, setFilledIn] = useState(false);
  const resetCombinedArray = () => {
    setCombinedArray([]);
  };

  const handleScroll = () => {
    const scrollAmount = window.innerHeight * 1.5;
    const duration = 500;
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
  const apiKey = process.env.REACT_APP_MINDEE_API_KEY;
  const handleCapturePhoto = (dataUri) => {
    setPhotoData(dataUri);
    setShowCameraImage(true);
  };
  const navigate = useNavigate();
  // Image processing for table input
  const handleCameraSubmit = async () => {
     // Initialize useNavigate hook
    document.body.classList.add("scroll-transition");
    setPhotoData(loading);
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
        `https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict`,
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
      if (lineItems.length === 0) {
        setPictureError(true);
      }
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
  
      setPictureConfidence(taxConfidence);
      setPictureTax(taxAmount || 0);
      setPictureTotal(totalAmount);
      setPhotoData(photoData);
      setSplitPictureTotal(totalAmount);
      handleScroll();
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Something went wrong... Please try again"); // Display the popup
  
      setTimeout(() => {
        navigate('/App/SplitBill'); // Route to the desired page after 3 seconds
      }, 3000);
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
  useEffect(() => {
    if (personName === loggedInUsername) {
      handleButton1Click();
      setSelected(1);
      setSelectedValue("you");
      setShowTable(true);
      setDisplayMerchant(false);
      setDisplayDate(false);
      setDisplayInvoice(false);
    }
  }, [personName, loggedInUsername]);
  // Handler to push entries into the History tab array
  const handleHistorySubmit = () => {
    const newReceipt = {
      personName,
      personEmail,
      loggedInUserEmail,
      personOwing,
      personReceiptAmount,
      taxActual,
      selectedValue,
      merchantName,
      startDate,
      invoiceNumber,
      displayMerchant,
      displayDate,
      displayInvoice,
      receiptTotal,
      submissionArray,
      loggedInUsername,
    };
    addReceipt(newReceipt);
  };
  const [postedTransaction] = useState(true);
  const taxOwing =
    selectedValue === "you"
      ? parseFloat(splitPictureTotal) / 2 + parseFloat(themPictureTotal)
      : parseFloat(splitPictureTotal) / 2 + parseFloat(youPictureTotal);

  const taxOwingPerc = taxOwing / parseFloat(getPictureTotal());

  const taxActual = parseFloat(pictureTax) * parseFloat(taxOwingPerc);

  // Used to update the balance of the person you are splitting receipt with
  const getFinalTotal = () => {
    if (selectedValue === "you") {
      addNum(
        ContactId,
        personReceiptAmount,
        taxActual,
        personOwing,
        postedTransaction
      );
    } else {
      subNum(
        ContactId,
        personReceiptAmount,
        taxActual,
        personOwing,
        postedTransaction
      );
    }
  };

  const handleSnapShotSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setObtainedInfo((prevInfo) =>
      prevInfo.map((item) => ({
        ...item,
        sliderValue: item.sliderValue || 50,
      }))
    );
  }, []);
  useEffect(() => {
    const confirmBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    const handleUnload = () => {
      window.location.href = "/#/App/SplitBill";
    };

    window.onbeforeunload = confirmBeforeUnload;
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
      window.onbeforeunload = null;
    };
  }, []);
  return (
    <>
      <CSSTransition
        in={selectMethodManual}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <main
          className="xs:max-w-xl bg-white-500 mt-1 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
          style={{ maxWidth: "600px" }}
        >
          <div className="mt-0 flex flex-col items-center justify-center">
            <Header
              selectMethodManual={selectMethodManual}
              handleResetTotals={handleResetTotals}
              lang={lang}
              theme={theme}
              personName={personName}
              loggedInUsername={loggedInUsername}
              toggleTheme={toggleTheme}
            />

            <div className="container mx-auto px-2 py-8 ">
              {personName === loggedInUsername ? (
                ""
              ) : (
                <div className="max-w-fit flex justify-center pb-4">
                  <label
                    htmlFor="payment"
                    className={
                      theme === "dark"
                        ? "form-control mt-0 mb-0 flex flex-col items-center justify-center bg-gray-600 px-0"
                        : "form-control mt-0 mb-0 flex flex-col items-center justify-center px-0"
                    }
                    style={{ maxWidth: "fit-content" }}
                  >
                    <div className="flex justify-center w-full mb-2">
                      <span
                        className={
                          "ml-2 " +
                          (theme === "dark" ? "text-white" : "text-gray-800")
                        }
                      >
                        {lang === "english" ? "Who paid?" : "Qui a payé ?"}
                      </span>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="gradient"
                        className={`rounded-2 ${
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
                        {lang === "english" ? "Me" : "Moi"}
                      </Button>
                      <Button
                        variant="gradient"
                        className={`rounded-2 ${
                          selected === 2 ? "bg-gray-500" : "bg-gray-900"
                        } h-8 w-16 py-1 px-2 font-bold text-white`}
                        onClick={() => {
                          handleButton2Click();
                          setSelected(2);
                          setSelectedValue("them");
                          setShowTable(true);
                        }}
                      >
                        {personName.length > 6
                          ? personName.slice(0, 6) + "..."
                          : personName}
                      </Button>
                    </div>
                  </label>
                </div>
              )}
              <div className="overflow-hidden rounded-lg shadow">
                {personName === loggedInUsername ? (
                  <div
                    className={
                      theme === "dark"
                        ? "bg-gray-900 px-2 sm:px-6"
                        : "bg-white px-2 sm:px-6"
                    }
                  >
                    <CSSTransition
                      in={showTable}
                      timeout={500}
                      classNames="fade"
                      unmountOnExit
                    >
                      <div>
                        <div
                          className={
                            theme === "dark"
                              ? "bg-blue-900 px-6"
                              : "bg-blue-500 px-6"
                          }
                        >
                          <div className="flex items-center justify-center">
                            <div>
                              <input
                                type="amount"
                                className={
                                  "form-control mt-3 h-10 text-center font-bold text-gray-300 outline-none " +
                                  (theme === "dark"
                                    ? "bg-gray-800"
                                    : "bg-gray-100")
                                }
                                id="colFormLabel"
                                placeholder={
                                  lang === "english"
                                    ? "Merchant Name"
                                    : "Nom du commerçant"
                                }
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
                              <div className="flex items-center justify-center">
                                <input
                                  type="invoice"
                                  className={
                                    "form-control opacity-4 mb-3 w-40 bg-gray-100 text-center font-bold text-gray-300 outline-none " +
                                    (theme === "dark"
                                      ? "bg-gray-800"
                                      : "bg-gray-100")
                                  }
                                  id="colFormLabel"
                                  placeholder={
                                    lang === "english"
                                      ? "Invoice #"
                                      : "Facture #"
                                  }
                                  onKeyDown={handleKeyDown}
                                  onChange={(e) =>
                                    setInvoiceNumber(e.target.value)
                                  }
                                  onClick={() => setDisplayInvoice(true)}
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-0 text-center">
                          <div className="justify-left z-50 mt-3 mb-3 text-center">
                            <DatePicker
                              defaultValue="Date of Receipt"
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              className="justify-left bg-blue-100 text-center"
                              onFocus={(e) => e.target.blur()}
                              dateFormat="dd/MM/yyyy"
                              onClick={() => setDisplayDate(true)}
                              locale={lang === "english" ? "en" : "fr"}
                            />
                          </div>
                        </div>

                        <div className="flex-column flex items-center justify-center">
                          <ReceiptTable
                            loggedInUsername={loggedInUsername}
                            submissionArray={submissionArray}
                            setSubmissionArray={setSubmissionArray}
                            handleResetCombinedArray={handleResetCombinedArray}
                            resetCombinedArray={resetCombinedArray}
                            taxRate={taxRate}
                            taxActual={taxActual}
                            taxReal={taxReal}
                            setTaxReal={setTaxReal}
                            receiptTotal={receiptTotal}
                            setReceiptTotal={setReceiptTotal}
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
                            pictureTax={pictureTax}
                            setPictureTax={setPictureTax}
                            lang={lang}
                            pictureConfidence={pictureConfidence}
                          />
                          <div
                            className={
                              theme === "dark"
                                ? "flex item-center gap-y-0 bg-gray-900 py-4 justify-center text-center"
                                : "flex item-center gap-y-0 bg-white py-4 justify-center text-center"
                            }
                          >
                            <div className="m-2 mb-4 flex flex-col justify-center items-center sm:flex-row">
                              <Button
                                variant="gradient"
                                className="gradient-btn mb-2 flex items-center justify-center"
                                style={{ margin: "auto" }}
                                onClick={(e) => {
                                  const finalTotal = personReceiptAmount;
                                  if (finalTotal === 0) {
                                    console.error("Error: Invalid final total");
                                    setSubmissionError(false);
                                  } else {
                                    e.preventDefault();
                                    handleSnapShotSubmit(e);
                                    setSubmissionError(true);
                                    getFinalTotal(e);
                                    handleResetCombinedArray();
                                    handleHistorySubmit(e);
                                    resetReceiptForm();
                                    setIsReceiptSubmitted(true);
                                    window.location.href = "/#/App/SplitBill";
                                  }
                                }}
                              >
                                <IoExitOutline size={24} />
                                <span className="text-white ml-2">
                                  {lang === "english" ? "Submit" : "Soumettre"}
                                </span>
                              </Button>
                            </div>
                          </div>
                          {!submissionError && (
                            <div className="flex justify-center items-center col-span-2">
                              <p className="mb-2 text-center text-sm text-red-500 w-max mr-1/2">
                                {lang === "english"
                                  ? "Please add an item before submitting."
                                  : "Veuillez ajouter un élément avant de soumettre."}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CSSTransition>
                  </div>
                ) : (
                  <div
                    className={
                      theme === "dark"
                        ? "bg-gray-900 px-2 sm:px-6"
                        : "bg-white px-2 sm:px-6"
                    }
                  >
                    <CSSTransition
                      in={showTable}
                      timeout={500}
                      classNames="fade"
                      unmountOnExit
                    >
                      <div>
                        <div>
                          <div className="flex items-center justify-center">
                            <div>
                              <input
                                type="amount"
                                className={
                                  "form-control mt-3 h-10 text-center font-bold text-gray-300 outline-none " +
                                  (theme === "dark"
                                    ? "bg-gray-800"
                                    : "bg-gray-100")
                                }
                                id="colFormLabel"
                                placeholder={
                                  lang === "english"
                                    ? "Merchant Name"
                                    : "Nom du commerçant"
                                }
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
                              <div className="flex items-center justify-center">
                                <input
                                  type="invoice"
                                  className={
                                    "form-control opacity-4 mb-3 w-40 bg-gray-100 text-center font-bold text-gray-300 outline-none " +
                                    (theme === "dark"
                                      ? "bg-gray-800"
                                      : "bg-gray-100")
                                  }
                                  id="colFormLabel"
                                  placeholder={
                                    lang === "english"
                                      ? "Invoice #"
                                      : "Facture #"
                                  }
                                  onKeyDown={handleKeyDown}
                                  onChange={(e) =>
                                    setInvoiceNumber(e.target.value)
                                  }
                                  onClick={() => setDisplayInvoice(true)}
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-0 text-center">
                          <div className="justify-left z-50 mt-3 mb-3 text-center">
                            <DatePicker
                              defaultValue="Date of Receipt"
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              className="justify-left bg-blue-100 text-center"
                              onFocus={(e) => e.target.blur()}
                              dateFormat="dd/MM/yyyy"
                              onClick={() => setDisplayDate(true)}
                              locale={lang === "english" ? "en" : "fr"}
                            />
                          </div>
                        </div>

                        <div className="flex-column flex items-center justify-center">
                          <ReceiptTable
                            loggedInUsername={loggedInUsername}
                            submissionArray={submissionArray}
                            setSubmissionArray={setSubmissionArray}
                            handleResetCombinedArray={handleResetCombinedArray}
                            resetCombinedArray={resetCombinedArray}
                            taxRate={taxRate}
                            taxActual={taxActual}
                            taxReal={taxReal}
                            setTaxReal={setTaxReal}
                            receiptTotal={receiptTotal}
                            setReceiptTotal={setReceiptTotal}
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
                            pictureTax={pictureTax}
                            setPictureTax={setPictureTax}
                            lang={lang}
                          />
                        </div>
                        <div
                          className={
                            theme === "dark"
                              ? "flex item-center gap-y-0 bg-gray-900 py-4 justify-center text-center"
                              : "flex item-center gap-y-0 bg-white py-4 justify-center text-center"
                          }
                        >
                          <div className="m-2 mb-4 flex flex-col justify-center items-center sm:flex-row">
                            <Button
                              variant="gradient"
                              className="gradient-btn mb-2 flex items-center justify-center"
                              style={{ margin: "auto" }}
                              onClick={(e) => {
                                const finalTotal = personReceiptAmount;
                                if (finalTotal === 0) {
                                  console.error("Error: Invalid final total");
                                  setSubmissionError(false);
                                } else {
                                  e.preventDefault();
                                  handleSnapShotSubmit(e);
                                  setSubmissionError(true);
                                  getFinalTotal(e);
                                  handleResetCombinedArray();
                                  handleHistorySubmit(e);
                                  resetReceiptForm();
                                  setIsReceiptSubmitted(true);
                                  window.location.href = "/#/App/SplitBill";
                                }
                              }}
                            >
                              <IoExitOutline size={24} />
                              <span className="text-white ml-2">
                                {lang === "english" ? "Submit" : "Soumettre"}
                              </span>
                            </Button>
                          </div>
                        </div>
                        {!submissionError && (
                          <div className="flex justify-center items-center col-span-2">
                            <p className="mb-2 text-center text-sm text-red-500 w-max mr-1/2">
                              {lang === "english"
                                ? "Please add an item before submitting."
                                : "Veuillez ajouter un élément avant de soumettre."}
                            </p>
                          </div>
                        )}
                      </div>
                    </CSSTransition>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </CSSTransition>
      <CSSTransition
        in={selectMethodPicture}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <main
          className="xs:max-w-xl bg-white-500 mt-1 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
          style={{ maxWidth: "600px" }}
        >
          <div className="mt-0 flex flex-col items-center justify-center">
            <Header
              selectMethodPicture={selectMethodPicture}
              handleResetTotals={handleResetTotals}
              theme={theme}
              lang={lang}
              toggleTheme={toggleTheme}
              personName={personName}
            />
            <div
              style={{ minWidth: "384px" }}
              className="l-36 bg-grey flex flex-col  items-center justify-center rounded-lg px-1 ring-slate-900/5 dark:bg-slate-900"
            >
              {personName === loggedInUsername ? (
                <div></div>
              ) : (
                <div className="container mx-auto px-2 pb-4">
                  <div className="max-w-fit flex justify-center pb-2">
                    <label
                      htmlFor="payment"
                      className={
                        theme === "dark"
                          ? "form-control mt-0 mb-0 flex flex-col items-center justify-center bg-gray-600 px-0"
                          : "form-control mt-0 mb-0 flex flex-col items-center justify-center px-0"
                      }
                      
                    style={{ maxWidth: "fit-content" }}
                    >
                      <div
                        className="flex-1 text-center"
                        style={{ maxWidth: "50%", margin: 0 }}
                      >
                        <span
                          className={
                            "ml-2 " +
                            (theme === "dark" ? "text-white" : "text-gray-800")
                          }
                        >
                          {lang === "english" ? "Who paid?" : "Qui a payé ?"}
                        </span>
                      </div>
                      <div className="flex-1 text-center m-0">
                        <Button
                          variant="gradient"
                          className={`m-0 rounded-2 ${
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
                          {lang === "english" ? "Me" : "Moi"}
                        </Button>
                        <Button
                          variant="gradient"
                          className={`m-0 rounded-2 ${
                            selected === 1 ? "bg-gray-500" : "bg-gray-900"
                          } h-8 w-16 py-1 px-2 font-bold text-white`}
                          onClick={() => {
                            handleButton2Click();
                            setSelected(2);
                            setSelectedValue("them");
                            setShowTable(true);
                          }}
                        >
                          {personName.length > 6
                            ? personName.slice(0, 6) + "..."
                            : personName}
                        </Button>
                      </div>
                    </label>
                  </div>
                </div>
              )}

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
                        <Button
                          variant="gradient"
                          className="gradient-btn mb-2 mt-2 flex items-center justify-center"
                          style={{ margin: "auto" }}
                          onClick={(e) => {
                            setShowCameraImage(false);
                            handleResetTotals(e);
                          }}
                        >
                          <IoRepeatSharp size={24} />
                          {lang === "english"
                            ? "Redo Picture"
                            : "Reprendre la photo"}
                        </Button>
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
                      <Button
                        variant="gradient"
                        className="gradient-btn mb-2 flex items-center justify-center"
                        style={{ margin: "auto" }}
                        onClick={handleCameraSubmit}
                      >
                        <IoCheckmarkCircle size={24} />
                        {lang === "english"
                          ? "Process Receipt Image"
                          : "Traiter l'image du reçu"}
                      </Button>
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
                            <div className="flex items-center justify-center">
                              <div>
                                <input
                                  type="amount"
                                  className="form-control mt-3 h-10 bg-gray-900 text-center font-bold text-gray-300 outline-none"
                                  id="colFormLabel"
                                  placeholder={
                                    merchantName ||
                                    (lang === "english"
                                      ? "Merchant Name"
                                      : "Nom du commerçant")
                                  }
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
                                <div className="flex items-center justify-center">
                                  <input
                                    autoComplete="off"
                                    type="invoice"
                                    className="form-control opacity-4 mb-3 w-40 bg-gray-900 text-center font-bold text-gray-300 outline-none"
                                    id="colFormLabel"
                                    placeholder={
                                      lang === "english"
                                        ? "Invoice #"
                                        : "Facture #"
                                    }
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
                          {personName === loggedInUsername ? (
                            <div
                              className={
                                theme === "dark"
                                  ? "bg-gray-900 px-2 sm:px-6"
                                  : "bg-white px-2 sm:px-6"
                              }
                            >
                              <CSSTransition
                                in={showTable}
                                timeout={500}
                                classNames="fade"
                                unmountOnExit
                              >
                                <div>
                                  <div className="mt-0">
                                    <div className="justify-left z-50 mt-3 mb-3 text-center">
                                      <DatePicker
                                        defaultValue="Date of Receipt"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        className="justify-left bg-blue-100 text-center"
                                        onFocus={(e) => e.target.blur()}
                                        dateFormat="dd/MM/yyyy"
                                        onClick={() => setDisplayDate(true)}
                                        locale={
                                          lang === "english" ? "en" : "fr"
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="flex-column flex items-center justify-center">
                                    <div>
                                      <ReceiptTable
                                        loggedInUsername={loggedInUsername}
                                        submissionArray={submissionArray}
                                        setSubmissionArray={setSubmissionArray}
                                        handleResetCombinedArray={
                                          handleResetCombinedArray
                                        }
                                        taxRate={taxRate}
                                        resetCombinedArray={resetCombinedArray}
                                        taxActual={taxActual}
                                        taxReal={taxReal}
                                        setTaxReal={setTaxReal}
                                        receiptTotal={receiptTotal}
                                        setReceiptTotal={setReceiptTotal}
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
                                        setThemPictureTotal={
                                          setThemPictureTotal
                                        }
                                        setSplitPictureTotal={
                                          setSplitPictureTotal
                                        }
                                        setYouPictureTotal={setYouPictureTotal}
                                        selectedValue={selectedValue}
                                        personName={personName}
                                        personReceiptAmount={
                                          personReceiptAmount
                                        }
                                        setPersonReceiptAmount={
                                          setPersonReceiptAmount
                                        }
                                        setName={setName}
                                        filledIn={filledIn}
                                        setFilledIn={setFilledIn}
                                        theme={theme}
                                        pictureTax={pictureTax}
                                        setPictureTax={setPictureTax}
                                        lang={lang}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </CSSTransition>
                            </div>
                          ) : (
                            <div
                              className={
                                theme === "dark"
                                  ? "bg-gray-900 px-2 sm:px-6"
                                  : "bg-white px-2 sm:px-6"
                              }
                            >
                              <CSSTransition
                                in={showTable}
                                timeout={500}
                                classNames="fade"
                                unmountOnExit
                              >
                                <div>
                                  <div className="mt-0 text-center">
                                    <label
                                      style={{ margin: "auto" }}
                                      htmlFor="colFormLabel"
                                      className={
                                        theme === "dark"
                                          ? "col-form-label text-center text-white h-0"
                                          : "col-form-label text-center text-black h-0"
                                      }
                                    ></label>
                                    <div className="z-50 mt-3 mb-3 text-center">
                                      <DatePicker
                                        defaultValue="Date of Receipt"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        className="justify-left bg-blue-100 text-center"
                                        onFocus={(e) => e.target.blur()}
                                        dateFormat="dd/MM/yyyy"
                                        onClick={() => setDisplayDate(true)}
                                        locale={
                                          lang === "english" ? "en" : "fr"
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="flex-column flex items-center justify-center">
                                    <div>
                                      <ReceiptTable
                                        loggedInUsername={loggedInUsername}
                                        submissionArray={submissionArray}
                                        setSubmissionArray={setSubmissionArray}
                                        handleResetCombinedArray={
                                          handleResetCombinedArray
                                        }
                                        taxRate={taxRate}
                                        resetCombinedArray={resetCombinedArray}
                                        taxActual={taxActual}
                                        taxReal={taxReal}
                                        setTaxReal={setTaxReal}
                                        receiptTotal={receiptTotal}
                                        setReceiptTotal={setReceiptTotal}
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
                                        setThemPictureTotal={
                                          setThemPictureTotal
                                        }
                                        setSplitPictureTotal={
                                          setSplitPictureTotal
                                        }
                                        setYouPictureTotal={setYouPictureTotal}
                                        selectedValue={selectedValue}
                                        personName={personName}
                                        personReceiptAmount={
                                          personReceiptAmount
                                        }
                                        setPersonReceiptAmount={
                                          setPersonReceiptAmount
                                        }
                                        setName={setName}
                                        filledIn={filledIn}
                                        setFilledIn={setFilledIn}
                                        theme={theme}
                                        pictureTax={pictureTax}
                                        setPictureTax={setPictureTax}
                                        lang={lang}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </CSSTransition>
                            </div>
                          )}
                          <div
                            className={
                              theme === "dark"
                                ? "flex item-center justify-center gap-y-0 bg-gray-900 py-4"
                                : "flex item-center justify-center gap-y-0 bg-white py-4"
                            }
                          >
                            <div className="max-w-20 m-2 mb-4 flex flex-col justify-center sm:flex-row">
                              <Button
                                variant="gradient"
                                className="gradient-btn mb-2 flex items-center justify-center"
                                style={{ margin: "auto" }}
                                onClick={(e) => {
                                  const finalTotal = personReceiptAmount;
                                  if (finalTotal === 0) {
                                    console.error("Error: Invalid final total");
                                    setSubmissionError(false);
                                  } else {
                                    e.preventDefault();
                                    handleSnapShotSubmit(e);
                                    setSubmissionError(true);
                                    getFinalTotal();
                                    handleResetCombinedArray();
                                    handleHistorySubmit(e);
                                    resetReceiptForm();
                                    setIsReceiptSubmitted(true);
                                    setPersonReceiptAmount(0);
                                    window.location.href = "/#/App/SplitBill";
                                  }
                                }}
                              >
                                <IoExitOutline size={24} />
                                <span className="text-white ml-2">
                                  {lang === "english" ? "Submit" : "Soumettre"}
                                </span>
                              </Button>
                            </div>
                          </div>
                          {!submissionError && (
                            <div
                              className={
                                "flex justify-center items-center col-span-2 " +
                                (theme === "dark" ? "bg-gray-900" : "bg-white")
                              }
                            >
                              <p className="mb-2 text-center text-sm text-red-500 w-max mr-1/2">
                                {lang === "english"
                                  ? "Please add an item before submitting."
                                  : "Veuillez ajouter un élément avant de soumettre."}
                              </p>
                            </div>
                          )}
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
      <div>
        <CSSTransition
          in={pictureError}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div
              className={
                "p-6 rounded shadow-md " +
                (theme === "dark" ? "bg-gray-800" : "bg-gray-100")
              }
            >
              <p
                className={
                  theme === "dark"
                    ? "text-white whitespace-nowrap"
                    : "text-black whitespace-nowrap"
                }
              >
                {lang === "english"
                  ? "Picture too unclear.."
                  : "La photo est trop floue"}
              </p>
              <div className="flex justify-center item-center mt-4">
                <Button
                  variant="gradient"
                  className={`m-0 rounded-2 ${
                    selected === 1 ? "bg-gray-500" : "bg-gray-900"
                  } h-8 w-16 py-1 px-2 font-bold text-white`}
                  onClick={() => setPictureError(false)}
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
