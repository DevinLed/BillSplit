import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MainScreen from "./components/MainScreen";

function App() {
  const [showBill, setShowBill] = useState(true);
  const [selectPersonEdit, setSelectPersonEdit] = useState(false);
  const [showPersonEdit, setPersonEdit] = useState(false);
  const [setAddPerson] = useState(false);
  const [showGroupEdit, setGroupEdit] = useState(false);
  const [showHistory, setHistory] = useState(false);

  return (
    
    <>
      <main>
        
        {showBill ? (
          <div>
            <Header/>
            <button onClick={() => {setShowBill(false);setSelectPersonEdit(true)}}>Split a Bill</button>
            <button onClick={() => {setShowBill(false);setPersonEdit(true)}}>Edit Person</button>
            <button onClick={() => {setShowBill(false);setGroupEdit(true)}}>Edit Group</button>
            <button onClick={() => {setShowBill(false);setHistory(true)}}>Show History</button>
          </div>):''}
          {selectPersonEdit ? (
            <div>
            <Header/>
              <button onClick={() => {setShowBill(true);setSelectPersonEdit(false)}}>BACK</button>
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
              <button onClick={() => setAddPerson(true)}>Add a Person</button>
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
              <button>Add a group</button>
              <div>
                <button onClick={() => setShowBill(true)}>Home</button>
              </div>
            </div>
            ): ''}
        {showPersonEdit ? (
            <div>
            <Header/>
              <button onClick={() => {setShowBill(true);setPersonEdit(false)}}>BACK</button>
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
              <button onClick={() => setAddPerson(true)}>Edit Person</button>
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
              <button>Edit Group</button>
              <div>
                <button onClick={() => setShowBill(true)}>Home</button>
              </div>
            </div>
            ): ''}
        {showGroupEdit ? (
          <div>
          <Header/>
          <button onClick={() => {setShowBill(true);setGroupEdit(false)}}>BACK</button>
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
        <button>Edit group</button>
        </div>
        ) : ''}
        {showHistory ? (
          <div>
          <Header/>
          <button onClick={() => {setShowBill(true);setHistory(false)}}>BACK</button>
          
          <article>
            <p>Show history of past few weeks</p>
            </article>
        </div>
        ) : ''}
      </main>
    </>
  );
}

export default App;
