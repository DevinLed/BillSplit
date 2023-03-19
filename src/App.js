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
import "./darkMode.css";
import "./index.css";

function App() {
  // Main screen menu selection - 5 buttons: Start Bill, Edit Person, Edit Group, History, Darkmode
  // For Dark/Bright mode. Keeps mode storage for page refresh.

  // Menus for edit person and edit group
  const [addPerson, setAddPerson] = useState(false);
  const [editPerson, setEditPerson] = useState(false);
  const [personName, setPersonName] = useState("");
  const [personPhone, setPersonPhone] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [personOwing, setPersonOwing] = useState("");
  const [personState, setPersonState] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(false);
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
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
    setAddPerson(false);
    setList([...list, newItems]);
    setIsEditing(false);
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
  return (
    <>
      <Routes>
        <Route path="/" element=<Navigate to="/Home" /> />
        <Route path="/Home" element={<Home />} />
        <Route path="/ReceiptInput" element={<ReceiptInput 
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
              />}/>
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
