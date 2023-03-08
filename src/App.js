import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import "./darkMode.css";
import "./index.css";
import MainScreen from "./components/MainScreen";
import AddGroup from "./components/AddGroup";
import AddPerson from "./components/AddPerson";
import EditGroup from "./components/EditGroup";
import EditPerson from "./components/EditPerson";

function App() {
  // Main screen menu selection - 5 buttons: Start Bill, Edit Person, Edit Group, History, Darkmode
  const [startBill, setStartBill] = useState(true);
  const [showPersonEdit, setPersonEdit] = useState(false);
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
  const [personName, setPersonName] = useState("");
  const [personPhone, setPersonPhone] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [personOwing, setPersonOwing] = useState("");
  const [selectPersonReceipt, setSelectPersonReceipt] = useState("");

  //  used to update list of person and group
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [total, setTotal] = useState(0);

  const handleSubmit = () => {

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
    console.log(personName);
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
            <div className="flex flex-col items-center justify-center">
              <Header
                startBill={startBill}
                setStartBill={setStartBill}
                showPersonEdit={showPersonEdit}
                setPersonEdit={setPersonEdit}
                setSelectPersonEdit={setSelectPersonEdit}
                setSelectGroupEdit={setSelectGroupEdit}
                selectPersonEdit={selectPersonEdit}
                selectGroupEdit={selectGroupEdit}
                setHistory={setHistory}
              ></Header>
              {/*Table generator for people added*/}
              {list.map(({ id, personName, personOwing }) => (
                <React.Fragment key={id}>
                  {personName.length ? (
                    <ul class="list-group m-0">
                      <button
                        class="outline-none text-primary"
                        onClick={() => {
                          setSelectPersonReceipt(true);
                          setPersonEdit(false);
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
                <button
                  className="mt-4 bg-blue-500 font-bold py-2 px-4 mb-5 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                  onClick={() => setAddPerson(true)}
                >
                  Add Person
                </button>
            </div>
          ) : (
            ""
          )}
          {selectPersonReceipt ? (
            <div className="flex flex-col items-center justify-center">
              <Header
                startBill={startBill}
                setStartBill={setStartBill}
                showPersonEdit={showPersonEdit}
                setPersonEdit={setPersonEdit}
                setSelectPersonEdit={setSelectPersonEdit}
                setSelectGroupEdit={setSelectGroupEdit}
                selectPersonEdit={selectPersonEdit}
                selectGroupEdit={selectGroupEdit}
                setHistory={setHistory}
                selectPersonReceipt={selectPersonReceipt}
                setSelectPersonReceipt={setSelectPersonReceipt}
              ></Header>
              {list.map(({ id, personName, personOwing }) => (
                <React.Fragment key={id}>
                  {personName.length ? (
                    <div>
                      <h1>Split a bill with {personName}</h1>

                      <ul class="list-group m-0">
                        <li>
                          <button
                            class="btn btn-primary btn-lg m-5"
                            type="submit"
                          >
                            Manual
                          </button>
                        </li>
                        <li>
                          <button
                            class="btn btn-primary btn-lg m-5"
                            type="submit"
                          >
                            Picture
                          </button>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            " "
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
              handleSubmit={handleSubmit}
            ></AddPerson>
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
                setPersonEdit={setPersonEdit}
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
          {showHistory ? (
            <div>
              <Header
                setStartBill={setStartBill}
                setHistory={setHistory}
                showHistory={showHistory}
                setPersonEdit={setPersonEdit}
                selectPersonEdit={selectPersonEdit}
                setSelectPersonEdit={setSelectPersonEdit}
                setSelectGroupEdit={setSelectGroupEdit}
                selectGroupEdit={selectGroupEdit}
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
