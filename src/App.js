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
import Manual from "./components/Manual";
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

  // Calendar for manual receipt entry
  const [merchantName, setMerchantName] = useState("");
  const [invoiceNumber,setInvoiceNumber] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [personReceiptAmount, setPersonReceiptAmount] = useState("");
  const [value, setValue] = useState("");

  const addNum = (val, val2) => {
    let a = parseInt(val, 0);
    let b = parseInt(val2, 0);
    setValue(a + b);
  };
  


  const handleSubmit = (e) => {
    const newItems = {
      personName,
      personPhone,
      personEmail,
      personOwing,
      value,

      id: uuidv4(),
    };
    setPersonName("");
    setPersonPhone("");
    setPersonEmail("");
    setPersonOwing("");
    setAddPerson(false);
    setList([...list, newItems]);
    setIsEditing(false);
    setValue("");
  };
  const handleEditSubmit = (e) => {
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


  // Calculate total amount of items in the table

  const deleteRow = (id) => {
    setList(list.filter((row) => row.id !== id));
  };
  return (
    <>
      <Routes>
        <Route path="/" element=<Navigate to="/Home" /> />
        <Route path="/Home" element={<Home />} />
        <Route
          path="/ReceiptInput"
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
              setValue={setValue}
              hasReceipt={hasReceipt}
              setHasReceipt={setHasReceipt}
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
              setValue={setValue}
              addNum={addNum}
              personReceiptAmount={personReceiptAmount}
              hasReceipt={hasReceipt}
              setHasReceipt={setHasReceipt}
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
              handleEditSubmit={handleEditSubmit}
              setPersonState={setPersonState}
              personState={personState}
              setIsSelected={setIsSelected}
              list={list}
              setIsEditing={setIsEditing}
              editPerson={editPerson}
              setEditPerson={setEditPerson}
              editRow={editRow}
              value={value}
              setValue={setValue}
              hasReceipt={hasReceipt}
              setHasReceipt={setHasReceipt}
            />
          }
        />
        <Route
          path="/ManualEntry"
          element={
            <Manual
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
              startDate={startDate}           
              setStartDate={setStartDate}
              merchantName={merchantName}
              setMerchantName={setMerchantName}
              invoiceNumber={invoiceNumber}
              setInvoiceNumber={setInvoiceNumber}
              personReceiptAmount={personReceiptAmount}
              setPersonReceiptAmount={setPersonReceiptAmount}
              value={value}
              setValue={setValue}
              addNum={addNum}
              hasReceipt={hasReceipt}
              setHasReceipt={setHasReceipt}
            />
          }
        />
        <Route path="/History" element={<History />} />

        <Route path="/AddPerson" element={<AddPerson />} />
        <Route path="/EditPerson" element={<EditPerson />} />
      </Routes>
    </>
  );
}

export default App;
