import React, { useRef, useState, useEffect, onBlur, useCamera } from "react";
import { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-US";
import fr from "date-fns/locale/fr";
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
  IoCameraOutline,
  IoCardOutline,
  IoExitOutline,
  IoDuplicateOutline,
  IoRepeatSharp,
  IoCheckmarkCircle,
  IoCreateOutline,
} from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { CSSTransition } from "react-transition-group";

import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import "rc-slider/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
import { Amplify, API, graphqlOperation, Auth } from 'aws-amplify';
import { listUserData } from '../graphql/queries';
import { createHistoryData } from "../graphql/mutations";

import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);


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
  taxRate,
  lang,
  setLang,
  combinedArray,
  setCombinedArray,
  handleResetCombinedArray,
  obtainedInfo,
  setObtainedInfo,
  historyData,
  setHistoryData,
}) {
  registerLocale("en", en);
  registerLocale("fr", fr);
  const [pictureError, setPictureError] = useState(false);
  const [submissionError, setSubmissionError] = useState(true);
  const [selectPersonReceipt, setSelectPersonReceipt] = useState(true);
  const [selectMethodManual, setSelectMethodManual] = useState(false);
  const [selectMethodPicture, setSelectMethodPicture] = useState(false);
  const [photoData, setPhotoData] = useState(null);
  const [pictureTotal, setPictureTotal] = useState(0);
  const [pictureTax, setPictureTax] = useState(0);
  const [taxReal, setTaxReal] = useState(0);
  const [pictureConfidence, setPictureConfidence] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [showCameraImage, setShowCameraImage] = useState(false);
  const [showRedoButton, setShowRedoButton] = useState(false);
  const [displayPictureInfo, setDisplayPictureInfo] = useState(false);
  const [isAddedManually, setIsAddedManually] = useState(false);
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [receiptTotal, setReceiptTotal] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [youTotal, setYouTotal] = useState(0);
  const [splitTotal, setSplitTotal] = useState(0);
  const [themTotal, setThemTotal] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isMerchantNameFocused, setMerchantNameFocused] = useState(false);
  const [isInvoiceNumberFocused, setInvoiceNumberFocused] = useState(false);
  const csstransitionRef = useRef(null);

  const [filledIn, setFilledIn] = useState(false);
  const handleMerchantNameFocus = () => {
    setMerchantNameFocused(true);
  };

  const handleInvoiceNumberFocus = () => {
    setInvoiceNumberFocused(true);
  };
  const resetCombinedArray = () => {
    setCombinedArray([]);
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
  // Image processing for table input
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
    // Calculate the total without setting state
    let total =
      parseFloat(splitPictureTotal) +
      parseFloat(themPictureTotal) +
      parseFloat(youPictureTotal);

    let splitValue = parseFloat(splitPictureTotal) / 2;
    let themValue = parseFloat(themPictureTotal);
    let youValue = parseFloat(youPictureTotal);

    let personReceiptAmount;

    if (selectedValue === "you") {
      // Calculate the personReceiptAmount without setting state
      personReceiptAmount = splitValue + themValue;
    } else if (selectedValue === "them") {
      // Calculate the personReceiptAmount without setting state
      personReceiptAmount = splitValue + youValue;
    }

    return parseFloat(total).toFixed(2);
  };
  // Handler to push entries into the History tab array
  const handleHistorySubmit = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const loggedInUsername = user.username;
    
      const newHistoryData = {
        username: loggedInUsername, // Add the username here
        personName,
        receiptStore: merchantName,
        receiptDate: startDate,
        receiptInvoice: invoiceNumber,
        receiptTotal,
        personPurchase: selectedValue,
        oweTotal: personReceiptAmount,
      };
  
      // Call the GraphQL mutation to create a new HistoryData entry
      const response = await API.graphql(graphqlOperation(createHistoryData, { input: newHistoryData }));
      setHistoryData(response);
      console.log('HistoryData entry created:', response);
    } catch (error) {
      console.error('Error creating HistoryData entry:', error);
    }
  };
  const getUserId = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user.attributes.sub; // 'sub' is the unique user ID
    } catch (error) {
      // Handle authentication error
      console.error('Error getting user ID:', error);
      return null;
    }
  };
  const taxOwing =
    selectedValue === "you"
      ? parseFloat(splitPictureTotal) / 2 + parseFloat(themPictureTotal)
      : parseFloat(splitPictureTotal) / 2 + parseFloat(youPictureTotal);

  const taxOwingPerc = taxOwing / parseFloat(getPictureTotal());

  const taxActual = parseFloat(pictureTax) * parseFloat(taxOwingPerc);

  // Used to update the balance of the person you are splitting receipt with
  const getFinalTotal = () => {
    if (selectedValue === "you") {
      addNum(id, personReceiptAmount, taxActual);
    } else {
      subNum(id, personReceiptAmount, taxActual);
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
          <main
            className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
            style={{ maxWidth: "600px" }}
          >
            <div className="flex flex-col items-center justify-center">
              <Header
                selectPersonReceipt={selectPersonReceipt}
                handleResetTotals={handleResetTotals}
                theme={theme}
                lang={lang}
              />

              <div className="flex flex-col items-center justify-center">
                <h1>
                  {lang === "english"
                    ? "Split a receipt with "
                    : "Fractionner un reçu avec "}
                  {personName}
                </h1>
                <ul className="list-group items-center justify-center">
                  <Link className="flex flex-col items-center justify-center">
                    <label
                      className={
                        "mt-4 mb-4 mb-0 flex h-24 w-fit flex-col items-center justify-center rounded-lg border  " +
                        (theme === "dark"
                          ? "border-gray-900 bg-gray-900 text-white hover:bg-gray-800"
                          : "border-gray-200 bg-white text-gray-800 hover:bg-gray-200") +
                        " py-4 px-10 whitespace-no-wrap text-sm font-semibold shadow-md hover:no-underline"
                      }
                      onClick={(e) => {
                        setSelectMethodManual(true);
                        setSelectPersonReceipt(false);
                        setPersonReceiptAmount(0);
                      }}
                    >
                      <div
                        className="whitespace-no-wrap"
                        style={{ width: "24px", height: "24px" }}
                      >
                        <IoCreateOutline size={24} />
                      </div>
                      <span className="whitespace-no-wrap">
                        {lang === "english"
                          ? "Manual"
                          : "À la main"}
                      </span>
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
                      <IoCameraOutline size={24} />
                      {lang === "english" ? "Picture" : "Image"}
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
        
        nodeRef={csstransitionRef}
      >
        <main
          className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
          style={{ maxWidth: "600px" }}
          ref={csstransitionRef}
        >
          <div className="mt-0 flex flex-col items-center justify-center">
            <Header
              selectMethodManual={selectMethodManual}
              handleResetTotals={handleResetTotals}
              lang={lang}
              theme={theme}
            />

            <div className="container mx-auto px-2 py-8 ">
              <div className="overflow-hidden rounded-lg shadow">
                <div
                  className={
                    theme === "dark" ? "bg-blue-900 px-6" : "bg-blue-500 px-6"
                  }
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <input
                        type="amount"
                        className={
                          "form-control mt-3 h-10 text-left font-bold text-gray-300 outline-none " +
                          (theme === "dark" ? "bg-gray-800" : "bg-gray-100")
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
                      <div>
                        <input
                          type="invoice"
                          className={
                            "form-control opacity-4 mb-3 w-40 bg-gray-100 text-left font-bold text-gray-300 outline-none " +
                            (theme === "dark" ? "bg-gray-800" : "bg-gray-100")
                          }
                          id="colFormLabel"
                          placeholder={
                            lang === "english" ? "Invoice #" : "Facture #"
                          }
                          onKeyDown={handleKeyDown}
                          onChange={(e) => setInvoiceNumber(e.target.value)}
                          onClick={() => setDisplayInvoice(true)}
                          autoComplete="off"
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
                      {lang === "english" ? "Split With:" : "Diviser avec:"}
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
                          {lang === "english" ? "Me" : "Moi"}
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
                          {lang === "english"
                            ? "Date of Receipt"
                            : "Date de réception"}
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
                            locale={lang === "english" ? "en" : "fr"}
                          />
                        </div>
                      </div>

                      <div className="flex-column flex items-center justify-center">
                        <ReceiptTable
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
                    </div>
                  </CSSTransition>
                </div>
                <div
                  className={
                    theme === "dark"
                      ? "grid grid-cols-2 gap-y-0 bg-gray-900 py-4 justify-center text-center"
                      : "grid grid-cols-2 gap-y-0 bg-white py-4 justify-center text-center"
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
                          const finalTotal = personReceiptAmount;
                          if (finalTotal === 0) {
                            // Handle the error case and prevent further actions
                            console.error("Error: Invalid final total");
                            setSubmissionError(false);
                          } else {
                            getFinalTotal();
                            handleResetCombinedArray();
                            setSelectMethodManual(false);
                            setSelectPersonReceipt(true);
                            handleHistorySubmit(e);
                            setIsReceiptSubmitted(true);
                            setInvoiceNumber(0);
                          }
                        }}
                      >
                        <IoDuplicateOutline size={24} />
                      </label>
                    </Link>
                  </div>
                  <div className="m-2 mb-4 flex flex-col justify-center items-center sm:flex-row">
                    <label
                      className={
                        "flex h-24 w-28 flex-col items-center justify-center rounded-lg border border-gray-200 py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline " +
                        (theme === "dark"
                          ? "bg-gray-900 text-white"
                          : "bg-white text-gray-800")
                      }
                      onClick={(e) => {
                        const finalTotal = personReceiptAmount;
                        if (finalTotal === 0) {
                          // Handle the error case and prevent further actions
                          console.error("Error: Invalid final total");
                          setSubmissionError(false);
                        } else {
                          setSubmissionError(true);
                          getFinalTotal();
                          handleResetCombinedArray();
                          handleHistorySubmit(e);
                          resetReceiptForm();
                          setIsReceiptSubmitted(true);
                          window.location.href = "/BillSplit/#/SplitBill";
                        }
                      }}
                    >
                      <IoExitOutline size={24} />
                    </label>
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
        <main
          className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
          style={{ maxWidth: "600px" }}
        >
          <div className="mt-0 flex flex-col items-center justify-center">
            <Header
              selectMethodPicture={selectMethodPicture}
              handleResetTotals={handleResetTotals}
              theme={theme}
              lang={lang}
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
                      {lang === "english" ? "Me" : "Moi"}
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
                          {lang === "english"
                            ? "Redo Picture"
                            : "Reprendre la photo"}
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
                        {lang === "english"
                          ? "Process Receipt Image"
                          : "Traiter l'image du reçu"}
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
                                  type="amount"
                                  className="form-control mt-3 h-10 bg-gray-900 text-left font-bold text-gray-300 outline-none"
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
                                <div>
                                  <input
                                    autoComplete="off"
                                    type="invoice"
                                    className="form-control opacity-4 mb-3 w-40 bg-gray-900 text-left font-bold text-gray-300 outline-none"
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
                                {lang === "english"
                                  ? "Split With:"
                                  : "Diviser avec"}
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
                                    {lang === "english" ? "Me" : "Moi"}
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
                                    {lang === "english"
                                      ? "Date of Receipt"
                                      : "Date de réception"}
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
                                      locale={lang === "english" ? "en" : "fr"}
                                    />
                                  </div>
                                </div>

                                <div className="flex-column flex items-center justify-center">
                                  <div>
                                    <ReceiptTable
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
                                      pictureTax={pictureTax}
                                      setPictureTax={setPictureTax}
                                      lang={lang}
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
                                    const finalTotal = personReceiptAmount;
                                    if (finalTotal === 0) {
                                      // Handle the error case and prevent further actions
                                      console.error(
                                        "Error: Invalid final total"
                                      );
                                      setSubmissionError(false);
                                    } else {
                                      getFinalTotal();
                                      handleResetCombinedArray();
                                      setSelectMethodPicture(false);
                                      setSelectPersonReceipt(true);
                                      handleHistorySubmit(e);
                                      setIsReceiptSubmitted(true);
                                      setInvoiceNumber(0);
                                      setPhotoData(null);
                                      setShowTable(true);
                                      setShowCameraImage(false);

                                      window.location.href = `/BillSplit#/ReceiptInput/${id}`;
                                    }
                                  }}
                                >
                                  <IoDuplicateOutline size={24} />
                                </button>
                              </Link>
                            </div>
                            <div className="max-w-20 m-2 mb-4 flex flex-col justify-center sm:flex-row">
                              <button
                                className={
                                  "flex h-24 w-fit flex-col items-center justify-center rounded-lg border border-gray-200 py-4 px-10 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline " +
                                  (theme === "dark"
                                    ? "bg-gray-900 text-white"
                                    : "bg-white text-gray-800")
                                }
                                onClick={(e) => {
                                  const finalTotal = personReceiptAmount;
                                  if (finalTotal === 0) {
                                    // Handle the error case and prevent further actions
                                    console.error("Error: Invalid final total");
                                    setSubmissionError(false);
                                  } else {
                                    setSubmissionError(true);
                                    getFinalTotal();
                                    handleResetCombinedArray();
                                    handleHistorySubmit(e);
                                    resetReceiptForm();
                                    setIsReceiptSubmitted(true);
                                    setPersonReceiptAmount(0);
                                    window.location.href =
                                      "/BillSplit/#/SplitBill";
                                  }
                                }}
                              >
                                <IoExitOutline size={24} />
                              </button>
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
          timeout={500} // Adjust the duration of the transition as needed
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
                <button
                  className="ml-1 px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  onClick={() => setPictureError(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
