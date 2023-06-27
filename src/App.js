import React, { useRef, useState, useEffect } from "react";
import {
  Route,
  Routes,
  Link,
  path,
  Navigate,
  Redirect,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import EditPerson from "./components/EditPerson";
import SplitBill from "./components/SplitBill";
import History from "./components/History";
import LandingPage from "./components/LandingPage";
import AddPerson from "./components/AddPerson";
import Home from "./components/Home";
import Header from "./components/Header";
import EditList from "./components/EditList";
import ReceiptInput from "./components/ReceiptInput";
import Footer from "./components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./darkMode.css";
import "./index.css";
import ReceiptTable from "./components/ReceiptTable";

function App() {
  // dark mode theme switching
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      console.log("now in dark mode");
    } else {
      setTheme("light");
      console.log("now in lite mode");
    }
  };
  // useEffect to track dark mode
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  // Menus for edit person and edit group
  const [addPerson, setAddPerson] = useState(false);
  const [editPerson, setEditPerson] = useState(false);
  const [personName, setPersonName] = useState("");
  const [personPhone, setPersonPhone] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [personOwing, setPersonOwing] = useState("");
  const [personState, setPersonState] = useState("");
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

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Calendar for manual receipt entry
  const [merchantName, setMerchantName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [personReceiptAmount, setPersonReceiptAmount] = useState("");
  const [value] = useState("");

  // History tab work
  const [displayAdd, setDisplayAdd] = useState(true);
  const [selectedValue, setSelectedValue] = useState("you");
  const [history, setHistory] = useState([]);
  const [displayMerchant, setDisplayMerchant] = useState(false);
  const [displayDate, setDisplayDate] = useState(false);
  const [displayInvoice, setDisplayInvoice] = useState(false);
  const [isReceiptSubmitted, setIsReceiptSubmitted] = useState(false);

  // Landing page
  const [accessedApp, setAccessedApp] = useState(false);

  const handleClearData = () => {
    localStorage.clear();
    setList([]);
    setReceipts([]);
    setTheme("light");
  };
  // used to update values of balance for contacts
  const addNum = (id, val, val2) => {
    setList((prevList) => {
      const newList = prevList.map((item) => {
        if (item.id === id) {
          const a = parseFloat(item.personOwing, 0);
          const b = parseFloat(val2, 0);
          const value = a + b;
          return { ...item, personOwing: parseFloat(value).toFixed(2) };
        }
        return item;
      });
      localStorage.setItem("list", JSON.stringify(newList));
      return newList;
    });
    setDisplayAdd(true);
    console.log("this is to add");
  };

  // used to update values of balance for contacts
  const subNum = (id, val, val2) => {
    setList((prevList) => {
      const newList = prevList.map((item) => {
        if (item.id === id) {
          const a = parseFloat(item.personOwing, 0);
          const b = parseFloat(val2, 0);
          const value = a - b;
          return { ...item, personOwing: parseFloat(value).toFixed(2) };
        }
        return item;
      });
      localStorage.setItem("list", JSON.stringify(newList));
      return newList;
    });
    setDisplayAdd(false);
    console.log("this is to sub");
  };
  // Handler for full reset of tables.
  const handleSubmit = (e) => {
    const newItems = {
      personName,
      personPhone,
      personEmail,
      personOwing,
      id: uuidv4(),
    };
    setPersonName("");
    setPersonPhone("");
    setPersonEmail("");
    setPersonOwing("");
    setSelectedValue("");
    setAddPerson(false);
    setList((prevList) => {
      const newList = [...prevList, newItems];
      localStorage.setItem("list", JSON.stringify(newList));
      return newList;
    });
    setIsEditing(false);
  };
  const selectPerson = (id) => {
    const selectingPerson = list.find((row) => row.id === id);
    setPersonName(selectingPerson.personName);
    setPersonOwing(selectingPerson.personOwing);
    setPersonReceiptAmount(selectingPerson.personReceiptAmount);
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

  const addReceipt = (receipt) => {
    setReceipts((prevReceipts) => {
      const newReceipts = [...prevReceipts, receipt];
      localStorage.setItem(
        "receipts",
        JSON.stringify(newReceipts.map(JSON.stringify))
      );
      return newReceipts;
    });
  };

  return (
    <>
      <Routes>
        <Route
          path="/Home"
          element={
            <Home
              theme={theme}
              setTheme={setTheme}
              toggleTheme={toggleTheme}
              handleClearData={handleClearData}
            />
          }
        />
        <Route path="/LandingPage" element={<LandingPage theme={theme} />} />
        <Route path="/" element={<Navigate to="/LandingPage" />} />

        <Route
          path="/ReceiptInput/:id"
          element={
            <ReceiptInput
              personName={personName}
              personOwing={personOwing}
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
            />
          }
        />
        <Route
          path="/SplitBill"
          element={
            <SplitBill
              addPerson={addPerson}
              setAddPerson={setAddPerson}
              selectPerson={selectPerson}
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
            />
          }
        />
        <Route
          path="/EditList"
          element={
            <EditList
              addPerson={addPerson}
              setAddPerson={setAddPerson}
              selectPerson={selectPerson}
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
              setEditPerson={setEditPerson}
              list={list}
              value={value}
              theme={theme}
            />
          }
        />

        <Route path="/History" element={<History receipts={receipts} />} />

        <Route
          path="/AddPerson"
          element={
            <AddPerson
              formSubmitted={formSubmitted}
              setFormSubmitted={setFormSubmitted}
              theme={theme}
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
            />
          }
        />
        <Route path="/EditPerson" element={<EditPerson theme={theme} />} />
      </Routes>
    </>
  );
}

export default App;
