import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import "./darkMode.css";
import "./index.css";
import MainScreen from "./components/MainScreen";
import AddGroup from "./components/AddGroup";
import AddPerson from "./components/AddPerson";
import AddPerson1 from "./components/AddPerson1";
import AddPerson2 from "./components/AddPerson2";
import AddPerson3 from "./components/AddPerson3";
import AddPerson4 from "./components/AddPerson4";
import AddPerson5 from "./components/AddPerson5";
import EditGroup from "./components/EditGroup";
import EditPerson from "./components/EditPerson";

function App() {
  // Main screen menu selection - 5 buttons: Start Bill, Edit Person, Edit Group, History, Darkmode
  const [startBill, setStartBill] = useState(true);
  const [showPersonEdit, setPersonEdit] = useState(false);
  const [showGroupEdit, setGroupEdit] = useState(false);
  const [showHistory, setHistory] = useState(false);

  // For Dark/Bright mode. Keeps mode storage for page refresh.
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  // useEffect to track dark mode
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);
  // Text switch for dark mode button
  const [buttonText, setButtonText] = useState("Dark Mode");
  const changeText = (text) => setButtonText(text);

  // Menus for edit person and edit group

  const [selectPersonEdit, setSelectPersonEdit] = useState(false);
  const [selectGroupEdit, setSelectGroupEdit] = useState(false);

  // Selections for Adding in Split a bill menu
  const [addPerson, setAddPerson] = useState(false);
  const [addGroup, setAddGroup] = useState(false);
  const [personName, setPersonName] = useState("");
  const [personPhone, setPersonPhone] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [personOwing, setPersonOwing] = useState("");
  
  // Person table (max 5) for groups
  const [groupName, setGroupName] = useState("");


  const [addPerson1, setAddPerson1] = useState(false);
  const [addPerson2, setAddPerson2] = useState(false);
  const [addPerson3, setAddPerson3] = useState(false);
  const [addPerson4, setAddPerson4] = useState(false);
  const [addPerson5, setAddPerson5] = useState(false);

  const [personName1, setPersonName1] = useState("");
  const [personPhone1, setPersonPhone1] = useState("");
  const [personEmail1, setPersonEmail1] = useState("");
  const [personOwing1, setPersonOwing1] = useState("");
  
  const [personName2, setPersonName2] = useState("");
  const [personPhone2, setPersonPhone2] = useState("");
  const [personEmail2, setPersonEmail2] = useState("");
  const [personOwing2, setPersonOwing2] = useState("");
  
  const [personName3, setPersonName3] = useState("");
  const [personPhone3, setPersonPhone3] = useState("");
  const [personEmail3, setPersonEmail3] = useState("");
  const [personOwing3, setPersonOwing3] = useState("");
  
  const [personName4, setPersonName4] = useState("");
  const [personPhone4, setPersonPhone4] = useState("");
  const [personEmail4, setPersonEmail4] = useState("");
  const [personOwing4, setPersonOwing4] = useState("");
  
  const [personName5, setPersonName5] = useState("");
  const [personPhone5, setPersonPhone5] = useState("");
  const [personEmail5, setPersonEmail5] = useState("");
  const [personOwing5, setPersonOwing5] = useState("");

  //  used to update list of person and group
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [total, setTotal] = useState(0);

  const handleSubmit=(e) => {
    e.preventDefault();

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
    setList(()=>[...list,newItems]);
    setIsEditing(false);
  };

  useEffect(() => {
    let rows = document.querySelectorAll(".amount");
    let sum = 0;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].className === "amount") {
        sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML);
        setTotal(sum);
      }
    }
  });

  return (
    <>
      <main className="mt-5 p-0 pt-3 xs:max-w-xl sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
        <div className={`App ${theme}`}>
          {startBill ? (
            <div className="flex flex-col items-center justify-center">
              {/*  Header narrative for the Main Screen + 4 button selection screens */}
              <Header
                startBill={startBill}
                showPersonEdit={showPersonEdit}
                selectPersonEdit={selectPersonEdit}
                setSelectPersonEdit={setSelectPersonEdit}
                setPersonEdit={setPersonEdit}
                groupEdit={showGroupEdit}
              ></Header>
              <ul>
                <li>
                  <button
                    className="justify-center mt-5 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                    onClick={() => {
                      setStartBill(false);
                      setPersonEdit(true);
                    }}
                  >
                    Split a Bill
                  </button>
                </li>
                <li>
                  <button
                    className="mt-5 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                    onClick={() => {
                      setStartBill(false);
                      setSelectPersonEdit(true);
                    }}
                  >
                    Edit Person
                  </button>
                </li>
                <li>
                  <button
                    className="mt-5 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                    onClick={() => {
                      setStartBill(false);
                      setSelectGroupEdit(true);
                    }}
                  >
                    Edit Group
                  </button>
                </li>
                <li>
                  <button
                    className="mt-5 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                    onClick={() => {
                      setStartBill(false);
                      setHistory(true);
                    }}
                  >
                    Show History
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      toggleTheme();
                      if (theme === "light") {
                        changeText("Bright Mode");
                      } else {
                        changeText("Dark Mode");
                      }
                    }}
                    className="mt-5 mb-5 bg-black text-white font-bold py-2 px-4 rounded shadow border-2 border-black hover:text-white-500 transition-all duration-300"
                  >
                    {buttonText}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
          {showPersonEdit ? (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center justify-center">
              <Header
                startBill={startBill}
                setStartBill={setStartBill}
                showPersonEdit={showPersonEdit}
                groupEdit={showGroupEdit}
                setPersonEdit={setPersonEdit}
                setGroupEdit={setGroupEdit}
                setSelectPersonEdit={setSelectPersonEdit}
                setSelectGroupEdit={setSelectGroupEdit}
                selectPersonEdit={selectPersonEdit}
                selectGroupEdit={selectGroupEdit}
                setHistory={setHistory}
                setGroupName={setGroupName}
              ></Header>
              {/*Table generator for people added*/}
                {list.map(({id, personName}) => (
                  <React.Fragment key={id}>
              <ul class="list-group m-0">
                <li class="list-group-item d-flex l-500 justify-content-between align-items-center">
                  {personName}
                  <span class="badge badge-primary badge-pill">0</span>
                </li>
              </ul>
              </React.Fragment>
              ))}

              <button
                className="mt-4 bg-blue-500 font-bold py-2 px-4 mb-5 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                onClick={() => setAddPerson(true)}
              >
                Add Person
              </button>
              <ul class="list-group">
                <li class="list-group-item d-flex l-500 justify-content-between align-items-center">
                  {groupName}
                  <span class="badge badge-primary badge-pill">0</span>
                </li>
              </ul>
              <button
                className="bg-blue-500 font-bold py-2 px-4 mb-5 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                onClick={() => setAddGroup(true)}
              >
                Add a group
              </button>
            </div>


            </form>
            
          ) : (
            ""
          )}
          {/*Single add person access*/}
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
              setGroupName={setGroupName}
            ></AddPerson>
          ) : (
            ""
          )}
          
          {/*Group add person access, up to 5*/}
          {addPerson1 ? (
            <AddPerson1
              addPerson1={addPerson1}
              setAddPerson1={setAddPerson1}
              personName1={personName1}
              setPersonName1={setPersonName1}
              personEmail1={personEmail1}
              personPhone1={personPhone1}
              personOwing1={personOwing1}
              setGroupName={setGroupName}
              handleSubmit={handleSubmit}
            ></AddPerson1>
          ) : (
            ""
          )}
          {addPerson2 ? (
            <AddPerson2
              addPerson2={addPerson2}
              setAddPerson2={setAddPerson2}
              personName2={personName2}
              setPersonName2={setPersonName2}
              personEmail2={personEmail2}
              personPhone2={personPhone2}
              personOwing2={personOwing2}
              setGroupName={setGroupName}
              handleSubmit={handleSubmit}
            ></AddPerson2>
          ) : (
            ""
          )}
          {addPerson3 ? (
            <AddPerson3
              addPerson3={addPerson3}
              setAddPerson3={setAddPerson3}
              personName3={personName3}
              setPersonName3={setPersonName3}
              personEmail3={personEmail3}
              personPhone3={personPhone3}
              personOwing3={personOwing3}
              setGroupName={setGroupName}
              handleSubmit={handleSubmit}
            ></AddPerson3>
          ) : (
            ""
          )}
          {addPerson4 ? (
            <AddPerson4
              addPerson4={addPerson4}
              setAddPerson4={setAddPerson4}
              personName4={personName4}
              setPersonName4={setPersonName4}
              personEmail4={personEmail4}
              personPhone4={personPhone4}
              personOwing4={personOwing4}
              setGroupName={setGroupName}
              handleSubmit={handleSubmit}
            ></AddPerson4>
          ) : (
            ""
          )}
          {addPerson5 ? (
            <AddPerson5
              addPerson5={addPerson5}
              setAddPerson5={setAddPerson5}
              personName5={personName5}
              setPersonName5={setPersonName5}
              personEmail5={personEmail5}
              personPhone5={personPhone5}
              personOwing5={personOwing5}
              setGroupName={setGroupName}
              handleSubmit={handleSubmit}
            ></AddPerson5>
          ) : (
            ""
          )}
          
          {addGroup ? (
            <AddGroup
              addPerson1={addPerson1}
              setAddPerson1={setAddPerson1}
              addPerson2={addPerson2}
              setAddPerson2={setAddPerson2}
              addPerson3={addPerson3}
              setAddPerson3={setAddPerson3}
              addPerson4={addPerson4}
              setAddPerson4={setAddPerson4}
              addPerson5={addPerson5}
              setAddPerson5={setAddPerson5}
              setAddGroup={setAddGroup}
              setPersonName={setPersonName}
              personName1={personName1}
              personEmail1={personEmail1}
              personPhone1={personPhone1}
              personOwing1={personOwing1}
              personName2={personName2}
              personEmail2={personEmail2}
              personPhone2={personPhone2}
              personOwing2={personOwing2}
              personName3={personName3}
              personEmail3={personEmail3}
              personPhone3={personPhone3}
              personOwing3={personOwing3}
              personName4={personName4}
              personEmail4={personEmail4}
              personPhone4={personPhone4}
              personOwing4={personOwing4}
              personName5={personName5}
              personEmail5={personEmail5}
              personPhone5={personPhone5}
              personOwing5={personOwing5}
              setGroupName={setGroupName}
              handleSubmit={handleSubmit}
            ></AddGroup>
          ) : (
            ""
          )}
          {selectPersonEdit ? (
            <div className="flex flex-col items-center justify-center">
              <Header
                startBill={startBill}
                setStartBill={setStartBill}
                showPersonEdit={showPersonEdit}
                selectPersonEdit={selectPersonEdit}
                setSelectPersonEdit={setSelectPersonEdit}
                setSelectGroupEdit={setSelectGroupEdit}
                selectGroupEdit={selectGroupEdit}
                setHistory={setHistory}
                groupEdit={showGroupEdit}
                setPersonEdit={setPersonEdit}
                setGroupEdit={setGroupEdit}
                setGroupName={setGroupName}
              ></Header>
              <ul class="list-group">
                <li class="list-group-item d-flex l-500 justify-content-between align-items-center">
                  Jack
                  <span class="badge badge-primary badge-pill">14</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  John
                  <span class="badge badge-primary badge-pill">2</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Jacob
                  <span class="badge badge-primary badge-pill">1</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Jim
                  <span class="badge badge-primary badge-pill">1</span>
                </li>
              </ul>
              <button
                className="bg-blue-500 font-bold py-2 px-4 mb-5 rounded shadow border-2 border-blue-500 hover:bg-white  transition-all duration-300"
                onClick={() => setAddPerson(true)}
              >
                Edit Person
              </button>
            </div>
          ) : (
            ""
          )}
          {selectGroupEdit ? (
            <div className="flex flex-col items-center justify-center">
              <Header
                startBill={startBill}
                setStartBill={setStartBill}
                showPersonEdit={showPersonEdit}
                groupEdit={showGroupEdit}
                setPersonEdit={setPersonEdit}
                setGroupEdit={setGroupEdit}
                setSelectPersonEdit={setSelectPersonEdit}
                setSelectGroupEdit={setSelectGroupEdit}
                selectGroupEdit={selectGroupEdit}
                selectPersonEdit={selectPersonEdit}
                setHistory={setHistory}
                setGroupName={setGroupName}
              ></Header>
              <ul class="list-group">
                <li class="list-group-item d-flex l-500 justify-content-between align-items-center">
                  Household
                  <span class="badge badge-primary badge-pill">14</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Family
                  <span class="badge badge-primary badge-pill">2</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Work
                  <span class="badge badge-primary badge-pill">1</span>
                </li>
              </ul>
              <button className="mt-5 bg-blue-500 font-bold mb-5 py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300">
                Edit group
              </button>
            </div>
          ) : (
            ""
          )}
          {showHistory ? (
            <div>
              <Header
                setStartBill={setStartBill}
                setHistory={setHistory}
                showHistory={showHistory}
                setPersonEdit={setPersonEdit}
                setGroupEdit={setGroupEdit}
                selectPersonEdit={selectPersonEdit}
                setSelectPersonEdit={setSelectPersonEdit}
                setSelectGroupEdit={setSelectGroupEdit}
                selectGroupEdit={selectGroupEdit}
                setGroupName={setGroupName}
              ></Header>

              <article className="flex flex-col items-center justify-center ">
                <p className="mb-5 ">Show history of past few weeks</p>
              </article>
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
    </>
  );
}

export default App;
