import { useState, useEffect } from "react";
import Header from "./components/Header";
import "./darkMode.css";
import "./index.css"
import MainScreen from "./components/MainScreen";
import AddGroup from "./components/AddGroup";
import AddPerson from "./components/AddPerson";
import EditGroup from "./components/EditGroup";
import EditPerson from "./components/EditPerson";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const [showBill, setShowBill] = useState(true);
  const [selectPersonEdit, setSelectPersonEdit] = useState(false);
  const [showPersonEdit, setPersonEdit] = useState(false);
  const [setAddPerson] = useState(false);
  const [showGroupEdit, setGroupEdit] = useState(false);
  const [showHistory, setHistory] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);
  return (
    <>
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white-500 rounded shadow">
        <div className={`App ${theme}`}>
          {showBill ? (
            <div className="flex flex-col items-center justify-center mb-5 xl:flex-row xl:justify-between">
              <Header
                showBill={showBill}
                personEdit={showPersonEdit}
                selectPersonEdit={selectPersonEdit}
                setPersonEdit={setPersonEdit}
                groupEdit={showGroupEdit}
              ></Header>
              <ul>
                <li>
                  <button
                    className="justify-center mt-5 ml-5 bg-blue-500 text-white font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                    onClick={() => {
                      setShowBill(false);
                      setPersonEdit(true);
                    }}
                  >
                    Split a Bill
                  </button>
                </li>
                <li>
                  <button
                    className="mt-5 ml-5 bg-blue-500 text-white font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                    onClick={() => {
                      setShowBill(false);
                      setSelectPersonEdit(true);
                    }}
                  >
                    Edit Person
                  </button>
                </li>
                <li>
                  <button
                    className="mt-5 ml-5 bg-blue-500 text-white font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                    onClick={() => {
                      setShowBill(false);
                      setGroupEdit(true);
                    }}
                  >
                    Edit Group
                  </button>
                </li>
                <li>
                  <button
                    className="mt-5 ml-5 bg-blue-500 text-white font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                    onClick={() => {
                      setShowBill(false);
                      setHistory(true);
                    }}
                  >
                    Show History
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleTheme}
                    className="mt-5 ml-5 bg-black text-white font-bold py-2 px-4 rounded shadow border-2 border-black hover:text-white-500 transition-all duration-300"
                  >
                    Toggle Mode
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
          {showPersonEdit ? (
            <div>
              <Header
                showBill={showBill}
                setShowBill={setShowBill}
                personEdit={showPersonEdit}
                groupEdit={showGroupEdit}
                setPersonEdit={setPersonEdit}
                setGroupEdit={setGroupEdit}
              ></Header>
              <ul>
                <li>
                  <a href="blank">John</a>
                </li>
                <li>
                  <a href="blank">Jacob</a>
                </li>
                <li>
                  <a href="blank">Jim</a>
                </li>
                <li>
                  <a href="blank">Jack</a>
                </li>
              </ul>
              <button
                className="mt-5 ml-5 bg-blue-500 text-white font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                onClick={() => setAddPerson(true)}
              >
                Add a Person
              </button>
              <ul>
                <li>
                  <a href="blank">Household</a>
                </li>
                <li>
                  <a href="blank">Family</a>
                </li>
                <li>
                  <a href="blank">Work</a>
                </li>
              </ul>
              <button className="mt-5 ml-5 bg-blue-500 text-white font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                Add a group
              </button>
            </div>
          ) : (
            ""
          )}
          {selectPersonEdit ? (
            <div>
              <Header
                showBill={showBill}
                setShowBill={setShowBill}
                personEdit={showPersonEdit}
                selectPersonEdit={selectPersonEdit}
                setSelectPersonEdit={setSelectPersonEdit}
                groupEdit={showGroupEdit}
                setPersonEdit={setPersonEdit}
                setGroupEdit={setGroupEdit}
              ></Header>
              <ul>
                <li>
                  <a href="blank">John</a>
                </li>
                <li>
                  <a href="blank">Jacob</a>
                </li>
                <li>
                  <a href="blank">Jim</a>
                </li>
                <li>
                  <a href="blank">Jack</a>
                </li>
              </ul>
              <button
                className="mt-5 ml-5 bg-blue-500 text-white font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                onClick={() => setAddPerson(true)}
              >
                Edit Person
              </button>
            </div>
          ) : (
            ""
          )}
          {showGroupEdit ? (
            <div>
              <Header
                showBill={showBill}
                setShowBill={setShowBill}
                personEdit={showPersonEdit}
                groupEdit={showGroupEdit}
                setPersonEdit={setPersonEdit}
                setGroupEdit={setGroupEdit}
              ></Header>
              <ul>
                <li>
                  <a href="blank">Household</a>
                </li>
                <li>
                  <a href="blank">Family</a>
                </li>
                <li>
                  <a href="blank">Work</a>
                </li>
              </ul>
              <button className="mt-5 ml-5 bg-blue-500 text-white font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                Edit group
              </button>
            </div>
          ) : (
            ""
          )}
          {showHistory ? (
            <div>
              <Header
                showBill={showBill}
                setShowBill={setShowBill}
                setHistory={setHistory}
                showHistory={showHistory}
              ></Header>

              <article>
                <p>Show history of past few weeks</p>
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
