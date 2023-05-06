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

function App() {
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
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

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

  const handleAdd = (newEntry) => {
    setHistory([...history, newEntry]);
  };
  const addNum = (id, val, val2) => {
    let newList = list;
    let a = parseInt(val, 0);
    let b = parseInt(val2, 0);
    let value = a + b;
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].id === id) {
        newList[i].personOwing = value;
      }
    }
    setList(newList);
    setDisplayAdd(true);
    console.log("this is to add");
  };

  const subNum = (id, val, val2) => {
    let newList = list;
    let a = parseInt(val, 0);
    let b = parseInt(val2, 0);
    let value = a - b;
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].id === id) {
        newList[i].personOwing = value;
      }
    }
    setList(newList);
    setDisplayAdd(false);
    console.log("this is to sub");
  };

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
    setList([...list, newItems]);
    setIsEditing(false);
  };
  const selectPerson = (id) => {
    const selectingPerson = list.find((row) => row.id === id);
    setPersonName(selectingPerson.personName);
    setPersonOwing(selectingPerson.personOwing);
    setPersonReceiptAmount(selectingPerson.personReceiptAmount);
  };

  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    setPersonName(editingRow.personName);
    setPersonPhone(editingRow.personPhone);
    setPersonEmail(editingRow.personEmail);
    setPersonOwing(editingRow.personOwing);
  };

  const [receipts, setReceipts] = useState([]);
  const addReceipt = (personName, personReceiptAmount, selectedValue, merchantName, startDate, invoiceNumber, displayMerchant, displayDate, displayInvoice ) => {
    const newReceipts = [...receipts];
    newReceipts.push({
      personName,
      personReceiptAmount,
      selectedValue,
      merchantName, 
      startDate, 
      invoiceNumber,
      displayMerchant,
      displayDate,
      displayInvoice
    });
    setReceipts(newReceipts);
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route
          path="/ReceiptInput/:id"
          element={
            <ReceiptInput
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
              hasReceipt={hasReceipt}
              setHasReceipt={setHasReceipt}
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
              addReceipt={addReceipt}
              receipts={receipts}
              setReceipts={setReceipts}
              displayAdd={displayAdd}
              setDisplayAdd={setDisplayAdd}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              handleAdd={handleAdd} 
              displayMerchant={displayMerchant}
              setDisplayMerchant={setDisplayMerchant} 
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
              displayInvoice={displayInvoice}
              setDisplayInvoice={setDisplayInvoice}
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
              personReceiptAmount={personReceiptAmount}
              hasReceipt={hasReceipt}
              setHasReceipt={setHasReceipt}
              formSubmitted={formSubmitted}
              setFormSubmitted={setFormSubmitted}
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
              list={list}
              setIsEditing={setIsEditing}
              editPerson={editPerson}
              setEditPerson={setEditPerson}
              editRow={editRow}
              value={value}
              hasReceipt={hasReceipt}
              setHasReceipt={setHasReceipt}
            />
          }
        />

        <Route
          path="/History"
          element={
            <History
              personName={personName}
              personOwing={personOwing}
              personReceiptAmount={personReceiptAmount}
              addReceipt={addReceipt}
              receipts={receipts}
              merchantName={merchantName}
              startDate={startDate}
              invoiceNumber={invoiceNumber}
              displayAdd={displayAdd}
              setReceipts={setReceipts}
              selectedValue={selectedValue}
              history={history}
              displayMerchant={displayMerchant}
              setDisplayMerchant={setDisplayMerchant} 
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
              displayInvoice={displayInvoice}
              setDisplayInvoice={setDisplayInvoice}
            />
          }
        />

        <Route
          path="/AddPerson"
          element={
            <AddPerson
              formSubmitted={formSubmitted}
              setFormSubmitted={setFormSubmitted}
            />
          }
        />
        <Route path="/EditPerson" element={<EditPerson />} />
      </Routes>
    </>
  );
}

export default App;
