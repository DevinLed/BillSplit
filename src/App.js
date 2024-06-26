import React, { useState, useCallback, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import EditPerson from "./components/EditPerson";
import SplitBill from "./components/SplitBill";
import LandingPage from "./components/LandingPage";
import Contact from "./components/Contact";
import Tutorial from "./components/Tutorial";
import AddPerson from "./components/AddPerson";
import SelfExpense from "./components/SelfExpense";
import Home from "./components/Home";
import EditList from "./components/EditList";
import ReceiptInput from "./components/ReceiptInput";
import Settings from "./components/Settings";
import "react-datepicker/dist/react-datepicker.css";
import {
  withAuthenticator
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./darkMode.css";
import "./index.css";
import ReceiptTable from "./components/ReceiptTable";
import { Amplify, Auth} from "aws-amplify";
import awsconfig from "./aws-exports";
import NotificationAPIComponent from "./components/NotificationAPI";
import ContactHistoryEdit from "./components/ContactHistoryEdit";
import Aboutme from "./components/Aboutme";

import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
Amplify.configure(awsconfig);

function App({ signOut, user }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const updateThemeClass = (newTheme) => {
      document.body.className = newTheme;
    };

    const storedTheme = localStorage.getItem("theme") || "light";
    updateThemeClass(storedTheme);
    setTheme(storedTheme);

    const timerId = setTimeout(() => {
      updateThemeClass(theme);
    }, 0);

    return () => clearTimeout(timerId);
  }, [theme]);

  // language select
  const [lang, setLang] = useState(localStorage.getItem("lang") || "english");
  // useEffect to track language
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);
  // tax rate select

  const [taxRate, setTaxRate] = useState(
    localStorage.getItem("taxRate") || "0.15"
  );
  // useEffect to track tax rate
  useEffect(() => {
    localStorage.setItem("taxRate", taxRate);
    document.body.className = taxRate;
  }, [taxRate]);

  // Menus for edit person and edit group
  const [passedId, setPassedId] = useState(0);
  const [addPerson, setAddPerson] = useState(false);
  const [editPerson, setEditPerson] = useState(false);
  const [personName, setPersonName] = useState("");
  const [personPhone, setPersonPhone] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [personOwing, setPersonOwing] = useState("");
  const [personState, setPersonState] = useState("");
  const [selfExpense, setSelfExpense] = useState(false);
  const [ContactId, setContactId] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(false);
  const [hasReceipt, setHasReceipt] = useState(false);
  const [list, setList] = useState(() => {
    const storedList = localStorage.getItem("list");
    return storedList ? JSON.parse(storedList) : [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [youPictureTotal, setYouPictureTotal] = useState(0);
  const [splitPictureTotal, setSplitPictureTotal] = useState(0);
  const [themPictureTotal, setThemPictureTotal] = useState(0);
  const [loggedInUserID, setLoggedInUserID] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState(""); // Set the logged-in name

  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
  const API_URL =
    "https://48f95wy514.execute-api.us-east-1.amazonaws.com/prod/contacts";

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setLoggedInUsername(user.attributes.name);
      setLoggedInUserEmail(user.attributes.email);
      setLoggedInUserID(user.attributes.sub);
    });
  }, [loggedInUsername]);

  const [dataThrow, setDataThrow] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setDataThrow(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const updateDataHandler = () => {
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [combinedArray, setCombinedArray] = useState([]);

  const [obtainedInfo, setObtainedInfo] = useState([]);
  // Calendar for manual receipt entry
  const [additionValue, setAdditionValue] = useState(0);
  const [merchantName, setMerchantName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [personReceiptAmount, setPersonReceiptAmount] = useState("");
  const [value] = useState("");

  // History tab work

  const [submissionArray, setSubmissionArray] = useState([]);
  const initialCombinedTotal = 0;
  const [combinedTotal, setCombinedTotal] = useState(initialCombinedTotal);
  const [historyData, setHistoryData] = useState([]);
  const [displayAdd, setDisplayAdd] = useState(true);
  const [selectedValue, setSelectedValue] = useState("you");
  const [displayMerchant, setDisplayMerchant] = useState(false);
  const [displayDate, setDisplayDate] = useState(false);
  const [displayInvoice, setDisplayInvoice] = useState(false);
  const [isReceiptSubmitted, setIsReceiptSubmitted] = useState(false);

  const [selfValue, setSelfValue] = useState(null);

  // Settings page
  const [showConfirmation, setShowConfirmation] = useState(false);

  // used to update values of balance for contacts

  const currentUserName = user.attributes.name;
  const editRow = (ContactId, UserEmail) => {
    const selectedPerson = dataThrow.find(
      (item) => item.ContactId === ContactId && item.UserEmail === UserEmail
    );
    setPersonName(selectedPerson.Name);
    setPersonEmail(selectedPerson.Email);
    setPersonPhone(selectedPerson.Phone);
    setPersonOwing(selectedPerson.Owing);
    setPassedId(selectedPerson.ContactId);
    setEditPerson(false);
  };
  const editSelf = () => {
    const selectedPerson = dataThrow.find(
      (item) =>
        item.UserEmail === loggedInUserEmail && item.Email === loggedInUserEmail
    );
    setPersonName(selectedPerson.Name);
    setPersonEmail(selectedPerson.Email);
    setPersonPhone(selectedPerson.Phone);
    setPersonOwing(selectedPerson.Owing);
    setPassedId(selectedPerson.ContactId);
    setEditPerson(false);
  };

  const addNum = (ContactId, val, val2, personOwing, postedTransaction) => {
    const a = parseFloat(personOwing);
    const b = parseFloat(val);
    const c = parseFloat(val2);
    const newValue = (a + b + c).toFixed(2);
    updateOwingInBackend(ContactId, personOwing, newValue, postedTransaction);

    setDisplayAdd(true);
  };

  const subNum = (ContactId, val, val2, personOwing, postedTransaction) => {
    const a = parseFloat(personOwing);
    const b = parseFloat(val);
    const c = parseFloat(val2);
    const newValue = (a - b - c).toFixed(2);
    updateSubOwingInBackend(
      ContactId,
      personOwing,
      newValue,
      postedTransaction
    );

    setDisplayAdd(true);
  };

  const updateOwingInBackend = async (
    ContactId,
    Owing,
    additionValue,
    postedTransaction
  ) => {
    const updatedData = {
      ContactId: ContactId,
      Name: personName,
      Phone: personPhone,
      Email: personEmail,
      Owing: additionValue,
      UserEmail: loggedInUserEmail,
      UserName: currentUserName,
    };

    try {
      const response = await fetch(`${API_URL}/${ContactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedData, postedTransaction }),
      });

      updateDataHandler();

      if (!response.ok) {
        throw new Error("Error updating contact");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const updateSubOwingInBackend = async (
    ContactId,
    Owing,
    additionValue,
    postedTransaction
  ) => {
    const updatedData = {
      ContactId: ContactId,
      Name: personName,
      Phone: personPhone,
      Email: personEmail,
      Owing: additionValue,
      UserEmail: loggedInUserEmail,
      UserName: currentUserName,
    };
    try {
      const response = await fetch(`${API_URL}/${ContactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedData, postedTransaction }),
      });

      updateDataHandler();

      if (!response.ok) {
        throw new Error("Error updating contact");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // Handler for full reset of tables.
  const handleResetCombinedArray = () => {
    setCombinedArray([]);
    setObtainedInfo([]);
  };
  const handleAddSubmit = async (e) => {
    const owingValue = personOwing !== "" ? personOwing : 0;
    const itemData = {
      Name: personName,
      Email: personEmail,
      Phone: personPhone,
      Owing: owingValue,
      UserEmail: loggedInUserEmail,
      UserName: currentUserName,
    };
    setAddPerson(false);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(itemData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const newItem = await response.json();

      if (newItem.contactAlreadyExists) {
        alert(
          "Contact already had you added! Owing value has been updated from their input history"
        );
      } else {
        console.log("Contact didn't exist, starting owing balance tracker.");
      }
      // Update local state with the new item
      setDataThrow((prevData) => [...prevData, newItem]);

      // Reset form fields
      setPersonName("");
      setPersonPhone("");
      setPersonEmail("");
      setPersonOwing("");
      setFormSubmitted(true);
      updateDataHandler();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };
  const handleAddSelfSubmit = async (e) => {
    const itemData = {
      Name: currentUserName,
      Email: loggedInUserEmail,
      Phone: "5555555555",
      Owing: "0.00",
      UserEmail: loggedInUserEmail,
      UserName: currentUserName,
    };
    setAddPerson(false);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(itemData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const newItem = await response.json();

      // Update local state with the new item
      setDataThrow((prevData) => [...prevData, newItem]);

      // Reset form fields
      setPersonName("");
      setPersonPhone("");
      setPersonEmail("");
      setPersonOwing("");
      setFormSubmitted(true);
      updateDataHandler();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleEditSubmit = (
    e,
    Name,
    Email,
    Phone,
    Owing,
    ContactId,
    UserName
  ) => {
    e.preventDefault();

    const updatedUserData = {
      UserEmail: { S: loggedInUserEmail },
      Email: { S: Email },
      Name: { S: Name },
      Owing: { S: Owing },
      Phone: { S: Phone },
      UserName: { S: UserName },
    };

    fetch(`${API_URL}/${ContactId}/${user.attributes.email}`, {
      method: "PUT",
      body: JSON.stringify(updatedUserData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to update item");
        }
      })
      .then((updatedItem) => {
        setDataThrow((prevData) => {
          return prevData.map((item) => {
            if (item.Email.S === updatedItem.Email.S) {
              return updatedItem;
            }
            return item;
          });
        });

        updateDataHandler();
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ContactId: passedId,
      Name: personName,
      Email: personEmail,
      Phone: personPhone,
      Owing: personOwing,
      UserEmail: loggedInUserEmail,
      UserName: currentUserName,
    };

    try {
      const response = await fetch(`${API_URL}/${passedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        console.log("Entry updated successfully");
      } else {
        throw new Error("Error updating entry");
      }
    } catch (error) {
      console.error("Network error:", error);
    }

    // Clear the input fields and other state variables
    setIsEditing(false);
    updateDataHandler();
  };

  const selectPerson = (ContactId) => {
    const selectingPerson = dataThrow.find(
      (contact) => contact.ContactId === ContactId
    );
    setPersonName(selectingPerson.Name);
    setPersonPhone(selectingPerson.Phone);
    setPersonEmail(selectingPerson.Email);
    setPersonOwing(selectingPerson.Owing);
    setPersonReceiptAmount(selectingPerson.ReceiptAmount);
  };

  const selectSelf = async (ContactId) => {
    const selectingPerson = dataThrow.find(
      (item) =>
        item.UserEmail === loggedInUserEmail && item.Email === loggedInUserEmail
    );

    setPersonName(selectingPerson.Name);
    setPersonPhone(selectingPerson.Phone);
    setPersonEmail(selectingPerson.Email);
    setPersonOwing(selectingPerson.Owing);
    setSelfExpense(false);
    setPersonReceiptAmount(selectingPerson.ReceiptAmount);
  };

  // Used to send values to History component
  const [receipts, setReceipts] = useState(() => {
    const storedReceipts = localStorage.getItem("receipts");
    return storedReceipts ? JSON.parse(storedReceipts) : [];
  });

  useEffect(() => {
    const storedReceipts = localStorage.getItem("receipts");
    const storedList = localStorage.getItem("list");

    if (storedReceipts) {
      setReceipts(JSON.parse(storedReceipts));
    }

    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("receipts", JSON.stringify(receipts));
  }, [receipts]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  const API_TRANSACTION =
    "https://48f95wy514.execute-api.us-east-1.amazonaws.com/prod/transaction";

  const addReceipt = async (newReceipt) => {
    try {
      const response = await fetch(API_TRANSACTION, {
        method: "POST",
        body: JSON.stringify(newReceipt),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to add receipt");
      }

      localStorage.removeItem("receipts");
    } catch (error) {
      console.error("Error adding receipt:", error);
    }
  };

  // draggable notification system:
  const DraggableComponent = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleStart = useCallback(
      (clientX, clientY) => {
        setIsDragging(true);
        setStartPos({
          x: clientX - position.x,
          y: clientY - position.y,
        });
      },
      [position.x, position.y]
    );

    const handleMove = useCallback(
      (clientX, clientY) => {
        if (isDragging) {
          const newX = clientX - startPos.x;
          const newY = clientY - startPos.y;
          setPosition({ x: newX, y: newY });
        }
      },
      [isDragging, startPos]
    );

    const handleMouseDown = useCallback(
      (e) => {
        handleStart(e.clientX, e.clientY);
      },
      [handleStart]
    );

    const handleTouchStart = useCallback(
      (e) => {
        const touch = e.touches[0];
        handleStart(touch.clientX, touch.clientY);
      },
      [handleStart]
    );

    const handleMouseMove = useCallback(
      (e) => {
        handleMove(e.clientX, e.clientY);
      },
      [handleMove]
    );

    const handleTouchMove = useCallback(
      (e) => {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      },
      [handleMove]
    );

    const handleEnd = useCallback(() => {
      setIsDragging(false);
    }, []);

    useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleEnd);
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", handleEnd);
      } else {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleEnd);
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

    return (
      <div
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none", // Prevents scrolling while dragging on touch devices
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {children}
      </div>
    );
  };
  return (
    <>
      <PrimeReactProvider>
        <div className={`App ${theme}`}>
          <DraggableComponent>
            <div className="notification-container">
              <NotificationAPIComponent
                userId={loggedInUserEmail}
                className="Noti"
              />
            </div>
          </DraggableComponent>
          <div onClick={updateDataHandler}></div>
          <Routes>
            <Route
              path="/LandingPage"
              element={
                <LandingPage theme={theme} lang={lang} setLang={setLang} />
              }
            />

            <Route path="/Contact" element={<Contact />} />
            <Route path="/Tutorial" element={<Tutorial />} />
            <Route path="/Aboutme" element={<Aboutme />} />
            <Route path="/" element={<Navigate to="/LandingPage" />} />

            <Route
              path="/Home"
              element={
                <Home
                  loggedInUserEmail={loggedInUserEmail}
                  loggedInUsername={loggedInUsername}
                  editSelf={editSelf}
                  handleAddSelfSubmit={handleAddSelfSubmit}
                  theme={theme}
                  setTheme={setTheme}
                  toggleTheme={toggleTheme}
                  personOwing={personOwing}
                  personName={personName}
                  list={list}
                  showConfirmation={showConfirmation}
                  setShowConfirmation={setShowConfirmation}
                  lang={lang}
                  setLang={setLang}
                  signOut={signOut}
                  user={user}
                  dataThrow={dataThrow}
                  API_URL={API_URL}
                  setDataThrow={setDataThrow}
                  selectSelf={selectSelf}
                  selfExpense={selfExpense}
                  setSelfExpense={setSelfExpense}
                />
              }
            />
            <Route
              path="/ReceiptInput/:ContactId"
              element={
                <ReceiptInput
                  toggleTheme={toggleTheme}
                  submissionArray={submissionArray}
                  setSubmissionArray={setSubmissionArray}
                  combinedTotal={combinedTotal}
                  setCombinedTotal={setCombinedTotal}
                  personName={personName}
                  personOwing={personOwing}
                  personEmail={personEmail}
                  loggedInUserEmail={loggedInUserEmail}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  merchantName={merchantName}
                  setMerchantName={setMerchantName}
                  invoiceNumber={invoiceNumber}
                  setInvoiceNumber={setInvoiceNumber}
                  personReceiptAmount={personReceiptAmount}
                  setPersonReceiptAmount={setPersonReceiptAmount}
                  addNum={addNum}
                  subNum={subNum}
                  value={value}
                  addReceipt={addReceipt}
                  selectedValue={selectedValue}
                  setSelectedValue={setSelectedValue}
                  displayMerchant={displayMerchant}
                  displayDate={displayDate}
                  displayInvoice={displayInvoice}
                  setDisplayMerchant={setDisplayMerchant}
                  setDisplayDate={setDisplayDate}
                  setDisplayInvoice={setDisplayInvoice}
                  setIsReceiptSubmitted={setIsReceiptSubmitted}
                  youPictureTotal={youPictureTotal}
                  splitPictureTotal={splitPictureTotal}
                  themPictureTotal={themPictureTotal}
                  setYouPictureTotal={setYouPictureTotal}
                  setSplitPictureTotal={setSplitPictureTotal}
                  setThemPictureTotal={setThemPictureTotal}
                  theme={theme}
                  taxRate={taxRate}
                  lang={lang}
                  setLang={setLang}
                  combinedArray={combinedArray}
                  setCombinedArray={setCombinedArray}
                  handleResetCombinedArray={handleResetCombinedArray}
                  historyData={historyData}
                  setHistoryData={setHistoryData}
                  obtainedInfo={obtainedInfo}
                  setObtainedInfo={setObtainedInfo}
                  additionValue={additionValue}
                  loggedInUsername={loggedInUsername}
                  selfExpense={selfExpense}
                  setSelfExpense={setSelfExpense}
                />
              }
            />
            <Route
              path="/SplitBill"
              element={
                <SplitBill
                  toggleTheme={toggleTheme}
                  user={user}
                  setPersonReceiptAmount={setPersonReceiptAmount}
                  dataThrow={dataThrow}
                  addPerson={addPerson}
                  setAddPerson={setAddPerson}
                  handleAddSelfSubmit={handleAddSelfSubmit}
                  selectPerson={selectPerson}
                  selectSelf={selectSelf}
                  personName={personName}
                  personEmail={personEmail}
                  personPhone={personPhone}
                  personOwing={personOwing}
                  setPersonName={setPersonName}
                  setPersonEmail={setPersonEmail}
                  setPersonPhone={setPersonPhone}
                  setPersonOwing={setPersonOwing}
                  handleSubmit={handleSubmit}
                  setPersonState={setPersonState}
                  personState={personState}
                  setIsSelected={setIsSelected}
                  list={list}
                  value={value}
                  addNum={addNum}
                  subNum={subNum}
                  personReceiptAmount={personReceiptAmount}
                  setFormSubmitted={setFormSubmitted}
                  theme={theme}
                  handleAddSubmit={handleAddSubmit}
                  lang={lang}
                  setLang={setLang}
                  loggedInUsername={loggedInUsername}
                  loggedInUserEmail={loggedInUserEmail}
                  setDataThrow={setDataThrow}
                  selfExpense={selfExpense}
                  setSelfExpense={setSelfExpense}
                />
              }
            />
            <Route
              path="/SelfExpense"
              element={
                <SelfExpense
                  toggleTheme={toggleTheme}
                  selfExpense={selfExpense}
                  setSelfExpense={setSelfExpense}
                  user={user}
                  dataThrow={dataThrow}
                  addPerson={addPerson}
                  setAddPerson={setAddPerson}
                  handleAddSelfSubmit={handleAddSelfSubmit}
                  selectPerson={selectPerson}
                  selectSelf={selectSelf}
                  personName={personName}
                  personEmail={personEmail}
                  personPhone={personPhone}
                  personOwing={personOwing}
                  setPersonName={setPersonName}
                  setPersonEmail={setPersonEmail}
                  setPersonReceiptAmount={setPersonReceiptAmount}
                  setPersonPhone={setPersonPhone}
                  setPersonOwing={setPersonOwing}
                  handleSubmit={handleSubmit}
                  setPersonState={setPersonState}
                  personState={personState}
                  setIsSelected={setIsSelected}
                  list={list}
                  value={value}
                  addNum={addNum}
                  subNum={subNum}
                  personReceiptAmount={personReceiptAmount}
                  setFormSubmitted={setFormSubmitted}
                  theme={theme}
                  handleAddSubmit={handleAddSubmit}
                  lang={lang}
                  setLang={setLang}
                  loggedInUsername={loggedInUsername}
                  loggedInUserEmail={loggedInUserEmail}
                  setDataThrow={setDataThrow}
                  selfValue={selfValue}
                  setSelfValue={setSelfValue}
                  editSelf={editSelf}
                />
              }
            />
            <Route
              path="/EditList"
              element={
                <EditList
                  toggleTheme={toggleTheme}
                  selfValue={selfValue}
                  setSelfValue={setSelfValue}
                  user={user}
                  dataThrow={dataThrow}
                  editSelf={editSelf}
                  setDataThrow={setDataThrow}
                  handleEditSubmit={handleEditSubmit}
                  setFormSubmitted={setFormSubmitted}
                  addPerson={addPerson}
                  setAddPerson={setAddPerson}
                  selectPerson={selectPerson}
                  selectSelf={selectSelf}
                  personName={personName}
                  personEmail={personEmail}
                  personPhone={personPhone}
                  personOwing={personOwing}
                  setPersonName={setPersonName}
                  setPersonEmail={setPersonEmail}
                  setPersonPhone={setPersonPhone}
                  setPersonOwing={setPersonOwing}
                  handleSubmit={handleSubmit}
                  setPersonState={setPersonState}
                  personState={personState}
                  setIsSelected={setIsSelected}
                  editPerson={editPerson}
                  editRow={editRow}
                  setEditPerson={setEditPerson}
                  list={list}
                  setList={setList}
                  value={value}
                  theme={theme}
                  handleAddSubmit={handleAddSubmit}
                  lang={lang}
                  setLang={setLang}
                  loggedInUsername={loggedInUsername}
                  loggedInUserEmail={loggedInUserEmail}
                  passedId={passedId}
                  API_URL={API_URL}
                  updateDataHandler={updateDataHandler}
                />
              }
            />
            <Route
              path="/Settings"
              element={
                <Settings
                  toggleTheme={toggleTheme}
                  showConfirmation={showConfirmation}
                  setShowConfirmation={setShowConfirmation}
                  taxRate={taxRate}
                  setTaxRate={setTaxRate}
                  theme={theme}
                  setTheme={setTheme}
                  lang={lang}
                  setLang={setLang}
                  loggedInUsername={loggedInUsername}
                />
              }
            />
            <Route
              path="/AddPerson"
              element={
                <AddPerson
                  formSubmitted={formSubmitted}
                  setFormSubmitted={setFormSubmitted}
                  theme={theme}
                  handleAddSubmit={handleAddSubmit}
                  lang={lang}
                  setLang={setLang}
                />
              }
            />
            <Route
              path="/ReceiptTable"
              element={
                <ReceiptTable
                  setThemPictureTotal={setThemPictureTotal}
                  setSplitPictureTotal={setSplitPictureTotal}
                  setYouPictureTotal={setYouPictureTotal}
                  youPictureTotal={youPictureTotal}
                  splitPictureTotal={splitPictureTotal}
                  themPictureTotal={themPictureTotal}
                  selectedValue={selectedValue}
                  personName={personName}
                  personReceiptAmount={personReceiptAmount}
                  setPersonReceiptAmount={setPersonReceiptAmount}
                  theme={theme}
                  lang={lang}
                  setLang={setLang}
                  combinedArray={combinedArray}
                  setCombinedArray={setCombinedArray}
                  handleResetCombinedArray={handleResetCombinedArray}
                  obtainedInfo={obtainedInfo}
                  setObtainedInfo={setObtainedInfo}
                />
              }
            />
            <Route
              path="/EditPerson"
              element={
                <EditPerson
                  theme={theme}
                  lang={lang}
                  setLang={setLang}
                  dataThrow={dataThrow}
                  setDataThrow={setDataThrow}
                  API_URL={API_URL}
                  user={user}
                  passedId={passedId}
                  editRow={editRow}
                />
              }
            />
            <Route
              path="/ContactHistoryEdit"
              element={
                <ContactHistoryEdit
                  toggleTheme={toggleTheme}
                  loggedInUsername={loggedInUsername}
                  submissionArray={submissionArray}
                  combinedArray={combinedArray}
                  personName={personName}
                  personEmail={personEmail}
                  personPhone={personPhone}
                  personOwing={personOwing}
                  handleSubmit={handleSubmit}
                  setPersonName={setPersonName}
                  setPersonEmail={setPersonEmail}
                  setPersonPhone={setPersonPhone}
                  setPersonOwing={setPersonOwing}
                  passedId={passedId}
                  loggedInUserEmail={loggedInUserEmail}
                  theme={theme}
                  lang={lang}
                  setLang={setLang}
                  dataThrow={dataThrow}
                  setDataThrow={setDataThrow}
                  API_URL={API_URL}
                  user={user}
                  combinedTotal={combinedTotal}
                  setCombinedTotal={setCombinedTotal}
                  receipts={receipts}
                  historyData={historyData}
                  setHistoryData={setHistoryData}
                  selfValue={selfValue}
                  setSelfValue={setSelfValue}
                />
              }
            />
          </Routes>
        </div>
      </PrimeReactProvider>
    </>
  );
}
export default withAuthenticator(App);
