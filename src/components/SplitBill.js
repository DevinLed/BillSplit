import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Switch, Route, Routes, Link } from "react-router-dom";

export default function SplitBill() {
  const [addPerson, setAddPerson] = useState(false);
  const [editPerson, setEditPerson] = useState(false);
  const [personName, setPersonName] = useState("");
  const [personPhone, setPersonPhone] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [personOwing, setPersonOwing] = useState("");
  const [selectPersonReceipt, setSelectPersonReceipt] = useState("");
  const [personState, setPersonState] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
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
  return (
    <>
      <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
      <div className="flex flex-col items-center justify-center">
        {/*Table generator for people added*/}
        {list.map(({ id, personName, personOwing }) => (
          <React.Fragment key={id}>
            {personName.length ? (
              <ul class="list-group m-0">
                <button
                  class="outline-none text-primary"
                  onClick={() => {
                    setSelectPersonReceipt(true);
                    setEditPerson(false);
                    selectPerson(id);
                  }}
                >
                  <li class="list-group-item d-flex l-500 justify-content-between align-items-center">
                    {personName}

                    <span class="badge badge-primary badge-pill">
                      {personOwing}
                    </span>
                  </li>
                </button>
              </ul>
            ) : (
              ""
            )}
          </React.Fragment>
        ))}
        <Link to="/AddPerson">
        <button
          className="mt-4 bg-blue-500 font-bold py-2 px-4 mb-5 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
          onClick={() => setAddPerson(true)}
        >
          Add Person
        </button>
        </Link>
      </div>
      </main>
    </>
  );
}
