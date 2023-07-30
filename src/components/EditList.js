import React, { useState } from "react";
import AddPerson from "./AddPerson";
import Header from "./Header";
import EditPerson from "./EditPerson";
import { IoPersonAddSharp } from "react-icons/io5";

import Avatar from 'react-avatar';
import { CSSTransition } from "react-transition-group";

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
  theme,
  setList,
  handleAddSubmit,
}) {
  const [selectEditPersonList, setEditSelectPersonList] = useState(true);

  const handleDeletePerson = (id) => {
   
      const updatedList = list.filter((row) => row.id !== editPerson);
      setList(updatedList);
  
      // Close the edit person popup
      setEditPerson(false);
    
  };

  return (
    <>
      <main className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"  style={{ maxWidth: '600px' }}>
        <Header selectEditPersonList={selectEditPersonList} theme={theme}/>
        <div className="flex flex-col items-center justify-center">
        {list.map(({ id, personName, personPhone, personEmail, personOwing }) => (
  <React.Fragment key={id}>
    {personName.length ? (
      <ul className="m-0 py-1 w-3/4">
<button
  className="text-primary outline-none focus:outline-none w-full"
  onClick={() => {
    console.log(false);
    editRow(id); // Call editRow function with the selected item's ID
  }}
>
          <li
          className={
            "list-group-item flex justify-between m-1 p-2 rounded-lg shadow-sm " +
            (theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800")
          }
        >

            <div className="flex items-center">
              {/* Avatar component to display the person's avatar */}
              <Avatar
                name={personName} // Pass the person's name to the Avatar component
                size={32} // Set the size of the avatar (adjust as needed)
                round // Make the avatar circular
              />
              {/* Div to display the person's name */}
              <span className="ml-1">
            {/* Div to display the person's name */}
            {personName.length > 8 ? `${personName.substring(0, 8)}...` : personName}
            </span>
            </div>
            <span
              className={`badge badge-primary badge-pill rounded px-1 pt-2 ml-2 text-xs ${
                personOwing < 0 ? "bg-red-500 text-black" : "bg-blue-500 text-white"
              }`}
            >
              $
              {value
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

<label
  className={
    "mt-4 mb-4 mb-0 flex h-24 w-fit flex-col items-center justify-center rounded-lg border " +
    (theme === "dark" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white text-gray-800") +
    " py-4 px-10 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
  }
  onClick={() => setAddPerson(true)}
>
  <IoPersonAddSharp size={24} />
</label>

        </div>

         
  <CSSTransition
        in={addPerson}
        timeout={300} // Adjust the duration of the transition as needed
        classNames="fade"
        unmountOnExit
      >
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
            handleAddSubmit={handleAddSubmit}
          ></AddPerson>
       </CSSTransition>
       <CSSTransition
        in={editPerson}
        timeout={300} // Adjust the duration of the transition as needed
        classNames="fade"
        unmountOnExit
      >
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
            setList={setList}
            list={list}
            editPerson={editPerson}
            handleDeletePerson={handleDeletePerson}
          ></EditPerson>
       </CSSTransition>
      </main>
    </>
  );
}
