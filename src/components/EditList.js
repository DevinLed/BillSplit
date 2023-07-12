import React, { useState} from "react";
import AddPerson from "./AddPerson";
import Header from "./Header";
import EditPerson from "./EditPerson";
import {
  IoPersonAddSharp
} from "react-icons/io5";

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
  list,
  value,
  setValue, 
  theme
}) {
  const [selectEditPersonList, setEditSelectPersonList] = useState(true);
  return (
    <>
      <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
        <Header selectEditPersonList={selectEditPersonList} />
        <div className="flex flex-col items-center justify-center">
        {list.map(({ id, personName, personPhone, personEmail, personOwing }) => (
  <React.Fragment key={id}>
    {personName.length ? (
      <ul className="list-group m-0">
        <button
          className="outline-none text-primary focus:outline-none"
          onClick={() => {
            console.log(false);
            selectPerson(id);
            editRow(id);
            setEditPerson(true);
          }}
        >
          <li className="list-group-item d-flex justify-between items-center border-b border-gray-300 bg-white p-4 hover:bg-gray-100">
            <span className="text-primary font-medium">{personName}</span>
            <span
              className={`badge badge-primary badge-pill rounded px-1 py-1 ${
                personOwing < 0 ? "bg-red-500 text-black" : "bg-blue-500 text-white"
              }`}
            >
              ${value
                ? parseFloat(value).toFixed(2)
                : parseFloat(personOwing).toString() === "NaN"
                ? "0.00"
                : parseFloat(personOwing).toFixed(2)}
            </span>
          </li>
        </button>
      </ul>
    ) : null}
  </React.Fragment>
))}

          <label className="mt-4 mb-4 flex flex-col items-center justify-center mb-0 h-24 w-1/3 rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
            onClick={() => setAddPerson(true)}
          >
            <IoPersonAddSharp size={24}/>
            Add Person
          </label>
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
            theme={theme} 
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
            theme={theme}
          ></EditPerson>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
