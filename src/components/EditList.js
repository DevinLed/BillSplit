import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Switch, Route, Routes, Link } from "react-router-dom";
import AddPerson from "./AddPerson";
import Header from "./Header";
import EditPerson from "./EditPerson";
import Footer from "./Footer";

export default function EditList({
  addPerson,
  setAddPerson,
  selectPerson,
  personName,
  personEmail,
  personPhone,
  personOwing,
  setPersonName,
  setPersonEmail,
  setPersonPhone,
  setPersonOwing,
  handleSubmit,
  handleEditSubmit,
  setPersonState,
  personState,
  setIsSelected,
  editPerson,
  setEditPerson,
  editRow,
  list
}) {
  const [selectEditPersonList, setEditSelectPersonList] = useState(true);
  return (
    <>
      <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
        <Header selectEditPersonList={selectEditPersonList} />
        <div className="flex flex-col items-center justify-center">
          {/*Table generator for people added*/}
          {list.map(({ id, personName, personPhone, personEmail, personOwing }) => (
            <React.Fragment key={id}>
              {personName.length ? (
                <ul class="list-group m-0">
                  <button
                    class="outline-none text-primary focus:outline-none"
                    onClick={() => {
                      selectPerson(id);
                      editRow(id);

                      setEditPerson(true);
                    }}
                  >
                    <li class="list-group-item d-flex l-500 justify-content-between align-items-center">
                      {personName}

                      <span
                        class="badge badge-primary badge-pill"
                        style={{
                          color: personOwing < 0 ? "red" : "white",
                        }}
                      >
                        ${personOwing}
                      </span>
                    </li>
                  </button>
                </ul>
              ) : (
                ""
              )}
            </React.Fragment>
          ))}
          <button
            className="bg-blue-500 font-bold py-2 px-4 mb-5 mt-5 rounded shadow border-2 border-blue-500 hover:bg-white  transition-all duration-300"
            onClick={() => setAddPerson(true)}
          >
            Add Person
          </button>
        </div>
        
        {addPerson ? (
          <AddPerson
            addPerson={addPerson}
            setAddPerson={setAddPerson}
            personName={personName}
            setPersonName={setPersonName}
            setPersonPhone={setPersonPhone}
            setPersonEmail={setPersonEmail}
            setPersonOwing={setPersonOwing}
            personEmail={personEmail}
            personPhone={personPhone}
            personOwing={personOwing}
            handleSubmit={handleSubmit}
            setPersonState={setPersonState}
            personState={personState}
            setIsSelected={setIsSelected}
          ></AddPerson>
        ) : (
          ""
        )}
        {editPerson ? (
          <EditPerson
            addPerson={addPerson}
            setAddPerson={setAddPerson}
            personName={personName}
            setPersonName={setPersonName}
            setPersonPhone={setPersonPhone}
            setPersonEmail={setPersonEmail}
            setPersonOwing={setPersonOwing}
            personEmail={personEmail}
            personPhone={personPhone}
            personOwing={personOwing}
            handleSubmit={handleSubmit}
            handleEditSubmit={handleEditSubmit}
            setPersonState={setPersonState}
            personState={personState}
            setIsSelected={setIsSelected}
            setEditPerson={setEditPerson}
          ></EditPerson>
        ) : (
          ""
        )}
      <Footer/>
      </main>
    </>
  );
}
