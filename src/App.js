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
import LandingPage from "./components/LandingPage";
import AddPerson from "./components/AddPerson";
import Home from "./components/Home";
import Header from "./components/Header";
import EditList from "./components/EditList";
import ReceiptInput from "./components/ReceiptInput";
import Settings from "./components/Settings";
import Footer from "./components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./darkMode.css";
import "./index.css";
import ReceiptTable from "./components/ReceiptTable";
import { Amplify, API, graphqlOperation, Auth, Storage } from "aws-amplify";
import awsconfig from "./aws-exports";
import NotificationAPIComponent from "./components/NotificationAPI";
import ContactHistoryEdit from "./components/ContactHistoryEdit";

Amplify.configure(awsconfig);

function App({ signOut, user }) {
  const [theme, setTheme] = useState("");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      console.log("now in dark mode");
    } else {
      setTheme("light");
      console.log("now in lite mode");
    }
  };
  // useEffect to track dark mode
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);
  // language select
  const [lang, setLang] = useState(localStorage.getItem("lang") || "english");
  // useEffect to track language
  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.body.className = lang;
  }, [lang]);
  // tax rate select

  const [taxRate, setTaxRate] = useState(localStorage.getItem("taxRate"));
  // useEffect to track tax rate
  useEffect(() => {
    localStorage.setItem("taxRate", taxRate);
    document.body.className = taxRate;
  }, [taxRate]);

  //styling for login prompt
  const styles = {
    container: {
      width: 400,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 20,
    },
    todo: { marginBottom: 15 },
    input: {
      border: "none",
      backgroundColor: "#ddd",
      marginBottom: 10,
      padding: 8,
      fontSize: 18,
    },
    todoName: { fontSize: 20, fontWeight: "bold" },
    todoDescription: { marginBottom: 0 },
    button: {
      backgroundColor: "black",
      color: "white",
      outline: "none",
      fontSize: 18,
      padding: "12px 0px",
    },
  };
  // Menus for edit person and edit group
  const [passedId, setPassedId] = useState(0);
  const [addPerson, setAddPerson] = useState(false);
  const [editPerson, setEditPerson] = useState(false);
  const [personName, setPersonName] = useState("");
  const [personPhone, setPersonPhone] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [personOwing, setPersonOwing] = useState("");
  const [personState, setPersonState] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(false);
  const [hasReceipt, setHasReceipt] = useState(false);
  const [list, setList] = useState(() => {
    const storedList = localStorage.getItem("list");
    return storedList ? JSON.parse(storedList) : [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [youPictureTotal, setYouPictureTotal] = useState(0);
  const [splitPictureTotal, setSplitPictureTotal] = useState(0);
  const [themPictureTotal, setThemPictureTotal] = useState(0);
  const [loggedInUserID, setLoggedInUserID] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState(""); // Set the logged-in name

  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
  const API_URL =
    "https://48f95wy514.execute-api.us-east-1.amazonaws.com/prod/contacts";

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setLoggedInUsername(user.attributes.name);
      setLoggedInUserEmail(user.attributes.email);
      setLoggedInUserID(user.attributes.sub);
    });
  }, [loggedInUsername]);

  const [dataThrow, setDataThrow] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setDataThrow(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const updateDataHandler = () => {
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [combinedArray, setCombinedArray] = useState([]);

  const [obtainedInfo, setObtainedInfo] = useState([]);
  // Calendar for manual receipt entry
  const [additionValue, setAdditionValue] = useState(0);
  const [merchantName, setMerchantName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [personReceiptAmount, setPersonReceiptAmount] = useState("");
  const [value] = useState("");

  // History tab work
  
  const [submissionArray, setSubmissionArray] = useState([]);
  const initialCombinedTotal = 0;
  const [combinedTotal, setCombinedTotal] = useState(initialCombinedTotal);
  const [historyData, setHistoryData] = useState([]);
  const [displayAdd, setDisplayAdd] = useState(true);
  const [selectedValue, setSelectedValue] = useState("you");
  const [history, setHistory] = useState([]);
  const [displayMerchant, setDisplayMerchant] = useState(false);
  const [displayDate, setDisplayDate] = useState(false);
  const [displayInvoice, setDisplayInvoice] = useState(false);
  const [isReceiptSubmitted, setIsReceiptSubmitted] = useState(false);

  // Landing page
  const [accessedApp, setAccessedApp] = useState(false);

  // Settings page
  const [showConfirmation, setShowConfirmation] = useState(false);

  // used to update values of balance for contacts

  const currentUserName = user.attributes.name;
  const editRow = (ContactId, UserEmail) => {
    const selectedPerson = dataThrow.find(
      (item) => item.ContactId === ContactId && item.UserEmail === UserEmail
    );
    setPersonName(selectedPerson.Name);
    setPersonEmail(selectedPerson.Email);
    setPersonPhone(selectedPerson.Phone);
    setPersonOwing(selectedPerson.Owing);
    setPassedId(selectedPerson.ContactId);
    setEditPerson(false);
  };
  const addNum = (ContactId, val, val2, personOwing, postedTransaction) => {
    const a = parseFloat(personOwing);
    const b = parseFloat(val);
    const c = parseFloat(val2);
    const newValue = (a + b + c).toFixed(2);
    console.log(
      "Existing owing?",
      personOwing,
      "val 1?",
      val,
      "val 2?",
      val2,
      "New Value?",
      newValue
    );
    updateOwingInBackend(ContactId, personOwing, newValue, postedTransaction);

    setDisplayAdd(true);
  };

  const subNum = (ContactId, val, val2, personOwing, postedTransaction) => {
    
    const a = parseFloat(personOwing);
    const b = parseFloat(val);
    const c = parseFloat(val2);
    const newValue = (a - b - c).toFixed(2);;
    console.log(
      "Existing owing?",
      personOwing,
      "val 1?",
      val,
      "val 2?",
      val2,
      "New Value?",
      newValue
    );
    updateSubOwingInBackend(ContactId, personOwing, newValue, postedTransaction);

    setDisplayAdd(true);
  };

  const updateOwingInBackend = async (ContactId, Owing, additionValue, postedTransaction) => {
    console.log("updateOwingInBackend:", ContactId, Owing, additionValue);
    console.log("posted from a transaction?", postedTransaction);
    const updatedData = {
      ContactId: ContactId,
      Name: personName,
      Phone: personPhone,
      Email: personEmail,
      Owing: additionValue,
      UserEmail: loggedInUserEmail,
      UserName: currentUserName,
    };
    
    try {
      console.log("posted transaction?", postedTransaction);
      console.log("Before fetch updateOwingInBackend");
      const response = await fetch(`${API_URL}/${ContactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedData, postedTransaction }),
      });

      updateDataHandler();
      console.log("After fetch updateOwingInBackend");

      if (!response.ok) {
        throw new Error("Error updating contact");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const updateSubOwingInBackend = async (ContactId, Owing, additionValue, postedTransaction) => {
    console.log("updateSubOwingInBackend:", ContactId, Owing, additionValue);
    console.log("posted from a transaction?", postedTransaction);
    const updatedData = {
      ContactId: ContactId,
      Name: personName,
      Phone: personPhone,
      Email: personEmail,
      Owing: additionValue,
      UserEmail: loggedInUserEmail,
      UserName: currentUserName,
    };
    try {
      console.log("Before fetch updateSubOwingInBackend");
      const response = await fetch(`${API_URL}/${ContactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedData, postedTransaction }),
      });

      updateDataHandler();
      console.log("After fetch updateSubOwingInBackend");

      if (!response.ok) {
        throw new Error("Error updating contact");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // Handler for full reset of tables.
  const handleResetCombinedArray = () => {
    setCombinedArray([]);
    setObtainedInfo([]);
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const owingValue = personOwing !== "" ? personOwing : 0;
    console.log("current UserName?", currentUserName);
    const itemData = {
      Name: personName,
      Email: personEmail,
      Phone: personPhone,
      Owing: owingValue,
      UserEmail: loggedInUserEmail,
      UserName: currentUserName,
    };

    setAddPerson(false);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(itemData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const newItem = await response.json();
      console.log("Item created successfully 123", newItem);

      if (newItem.contactAlreadyExists) {
        console.log("contactAlreadyExists?", newItem.contactAlreadyExists);
        alert(
          "Contact already had you added! Owing value has been updated from their input history"
        );
      } else {
        console.log("Contact didn't exist, starting owing balance tracker.");
      }
      // Update local state with the new item
      setDataThrow((prevData) => [...prevData, newItem]);

      // Reset form fields
      setPersonName("");
      setPersonPhone("");
      setPersonEmail("");
      setPersonOwing("");
      setFormSubmitted(true);
      updateDataHandler();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleEditSubmit = (
    e,
    Name,
    Email,
    Phone,
    Owing,
    ContactId,
    UserName
  ) => {
    e.preventDefault();

    const updatedUserData = {
      UserEmail: { S: loggedInUserEmail },
      Email: { S: Email },
      Name: { S: Name },
      Owing: { S: Owing },
      Phone: { S: Phone },
      UserName: { S: UserName },
    };

    fetch(`${API_URL}/${ContactId}/${user.attributes.email}`, {
      method: "PUT",
      body: JSON.stringify(updatedUserData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to update item");
        }
      })
      .then((updatedItem) => {
        console.log("Item updated successfully", updatedItem);

        setDataThrow((prevData) => {
          return prevData.map((item) => {
            if (item.Email.S === updatedItem.Email.S) {
              return updatedItem;
            }
            return item;
          });
        });

        // Clear the input fields and other state variables
        setPersonName("");
        setPersonPhone("");
        setPersonEmail("");
        setPersonOwing("");
        setSelectedValue("");
        setIsEditing(false);
        updateDataHandler();
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ContactId: passedId,
      Name: personName,
      Email: personEmail,
      Phone: personPhone,
      Owing: personOwing,
      UserEmail: loggedInUserEmail,
      UserName: currentUserName,
    };

    try {
      console.log("attempting to update contact...");
      const response = await fetch(`${API_URL}/${passedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      console.log("this is the response from updating: ", response);
      if (response.ok) {
        console.log("Entry updated successfully");
      } else {
        throw new Error("Error updating entry");
      }
    } catch (error) {
      console.error("Network error:", error);
    }

    // Clear the input fields and other state variables
    setPersonName("");
    setPersonPhone("");
    setPersonEmail("");
    setPersonOwing("");
    setIsEditing(false);
    updateDataHandler();
  };

  const selectPerson = (ContactId) => {
    const selectingPerson = dataThrow.find(
      (contact) => contact.ContactId === ContactId
    );
    setPersonName(selectingPerson.Name);
    setPersonPhone(selectingPerson.Phone);
    setPersonEmail(selectingPerson.Email);
    setPersonOwing(selectingPerson.Owing);
    setPersonReceiptAmount(selectingPerson.ReceiptAmount);
  };

  // Used to send values to History component
  const [receipts, setReceipts] = useState(() => {
    const storedReceipts = localStorage.getItem("receipts");
    return storedReceipts ? JSON.parse(storedReceipts) : [];
  });

  useEffect(() => {
    const storedReceipts = localStorage.getItem("receipts");
    const storedList = localStorage.getItem("list");

    if (storedReceipts) {
      setReceipts(JSON.parse(storedReceipts));
    }

    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("receipts", JSON.stringify(receipts));
  }, [receipts]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  const API_TRANSACTION =
    "https://48f95wy514.execute-api.us-east-1.amazonaws.com/prod/transaction";

  const addReceipt = async (newReceipt) => {
    try {
      const response = await fetch(API_TRANSACTION, {
        method: "POST",
        body: JSON.stringify(newReceipt),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("body?", newReceipt)
      if (!response.ok) {
        throw new Error("Failed to add receipt");
      }

      console.log("Receipt added successfully");

      localStorage.removeItem("receipts");
    } catch (error) {
      console.error("Error adding receipt:", error);
    }
  };
  return (
    <>
      <div className={`App ${theme}`} style={{ paddingTop: "20px" }}>
        <div onClick={updateDataHandler}>
        </div>
        
        <NotificationAPIComponent userId={loggedInUserEmail} className="Noti"/>
        <Routes>
          <Route
            path="/Home"
            element={
              <Home
                theme={theme}
                setTheme={setTheme}
                toggleTheme={toggleTheme}
                personOwing={personOwing}
                personName={personName}
                list={list}
                showConfirmation={showConfirmation}
                setShowConfirmation={setShowConfirmation}
                lang={lang}
                setLang={setLang}
                signOut={signOut}
                user={user}
              />
            }
          />
          <Route
            path="/LandingPage"
            element={
              <LandingPage theme={theme} lang={lang} setLang={setLang} />
            }
          />
          <Route path="/" element={<Navigate to="/LandingPage" />} />

          <Route
            path="/ReceiptInput/:ContactId"
            element={
              <ReceiptInput
              submissionArray={submissionArray}
              setSubmissionArray={setSubmissionArray}
                combinedTotal={combinedTotal}
                setCombinedTotal={setCombinedTotal}
                personName={personName}
                personOwing={personOwing}
                personEmail={personEmail}
                loggedInUserEmail={loggedInUserEmail}
                startDate={startDate}
                setStartDate={setStartDate}
                merchantName={merchantName}
                setMerchantName={setMerchantName}
                invoiceNumber={invoiceNumber}
                setInvoiceNumber={setInvoiceNumber}
                personReceiptAmount={personReceiptAmount}
                setPersonReceiptAmount={setPersonReceiptAmount}
                addNum={addNum}
                subNum={subNum}
                value={value}
                addReceipt={addReceipt}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                displayMerchant={displayMerchant}
                displayDate={displayDate}
                displayInvoice={displayInvoice}
                setDisplayMerchant={setDisplayMerchant}
                setDisplayDate={setDisplayDate}
                setDisplayInvoice={setDisplayInvoice}
                setIsReceiptSubmitted={setIsReceiptSubmitted}
                youPictureTotal={youPictureTotal}
                splitPictureTotal={splitPictureTotal}
                themPictureTotal={themPictureTotal}
                setYouPictureTotal={setYouPictureTotal}
                setSplitPictureTotal={setSplitPictureTotal}
                setThemPictureTotal={setThemPictureTotal}
                theme={theme}
                taxRate={taxRate}
                lang={lang}
                setLang={setLang}
                combinedArray={combinedArray}
                setCombinedArray={setCombinedArray}
                handleResetCombinedArray={handleResetCombinedArray}
                historyData={historyData}
                setHistoryData={setHistoryData}
                obtainedInfo={obtainedInfo}
                setObtainedInfo={setObtainedInfo}
                additionValue={additionValue}
                loggedInUsername={loggedInUsername}                
              />
            }
          />
          <Route
            path="/SplitBill"
            element={
              <SplitBill
                dataThrow={dataThrow}
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
                addNum={addNum}
                subNum={subNum}
                personReceiptAmount={personReceiptAmount}
                setFormSubmitted={setFormSubmitted}
                theme={theme}
                handleAddSubmit={handleAddSubmit}
                lang={lang}
                setLang={setLang}
                loggedInUsername={loggedInUsername}
                loggedInUserEmail={loggedInUserEmail}
              />
            }
          />
          <Route
            path="/EditList"
            element={
              <EditList
                user={user}
                dataThrow={dataThrow}
                setDataThrow={setDataThrow}
                handleEditSubmit={handleEditSubmit}
                setFormSubmitted={setFormSubmitted}
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
                editPerson={editPerson}
                editRow={editRow}
                setEditPerson={setEditPerson}
                list={list}
                setList={setList}
                value={value}
                theme={theme}
                handleAddSubmit={handleAddSubmit}
                lang={lang}
                setLang={setLang}
                loggedInUsername={loggedInUsername}
                loggedInUserEmail={loggedInUserEmail}
                passedId={passedId}
                API_URL={API_URL}
                updateDataHandler={updateDataHandler}
              />
            }
          />
          <Route
            path="/Settings"
            element={
              <Settings
                showConfirmation={showConfirmation}
                setShowConfirmation={setShowConfirmation}
                taxRate={taxRate}
                setTaxRate={setTaxRate}
                theme={theme}
                setTheme={setTheme}
                lang={lang}
                setLang={setLang}
                loggedInUsername={loggedInUsername}
              />
            }
          />

          <Route
            path="/History"
            element={
              <History
                combinedTotal={combinedTotal}
                setCombinedTotal={setCombinedTotal}
                receipts={receipts}
                theme={theme}
                lang={lang}
                setLang={setLang}
                loggedInUsername={loggedInUsername}
                historyData={historyData}
                setHistoryData={setHistoryData}
              />
            }
          />

          <Route
            path="/AddPerson"
            element={
              <AddPerson
                formSubmitted={formSubmitted}
                setFormSubmitted={setFormSubmitted}
                theme={theme}
                handleAddSubmit={handleAddSubmit}
                lang={lang}
                setLang={setLang}
              />
            }
          />
          <Route
            path="/ReceiptTable"
            element={
              <ReceiptTable
                setThemPictureTotal={setThemPictureTotal}
                setSplitPictureTotal={setSplitPictureTotal}
                setYouPictureTotal={setYouPictureTotal}
                youPictureTotal={youPictureTotal}
                splitPictureTotal={splitPictureTotal}
                themPictureTotal={themPictureTotal}
                selectedValue={selectedValue}
                personName={personName}
                personReceiptAmount={personReceiptAmount}
                setPersonReceiptAmount={setPersonReceiptAmount}
                theme={theme}
                lang={lang}
                setLang={setLang}
                combinedArray={combinedArray}
                setCombinedArray={setCombinedArray}
                handleResetCombinedArray={handleResetCombinedArray}
                obtainedInfo={obtainedInfo}
                setObtainedInfo={setObtainedInfo}
              />
            }
          />
          <Route
            path="/EditPerson"
            element={
              <EditPerson
                theme={theme}
                lang={lang}
                setLang={setLang}
                dataThrow={dataThrow}
                setDataThrow={setDataThrow}
                API_URL={API_URL}
                user={user}
              />
            }
          />
        <Route 
          path="/ContactHistoryEdit"
          element={
            <ContactHistoryEdit
            submissionArray={submissionArray}
            combinedArray={combinedArray}
            personName={personName}
            personEmail={personEmail}
            personPhone={personPhone}
            personOwing={personOwing}
            handleSubmit={handleSubmit}
            setPersonName={setPersonName}
            setPersonEmail={setPersonEmail}
            setPersonPhone={setPersonPhone}
            setPersonOwing={setPersonOwing}
            theme={theme}
            lang={lang}
            setLang={setLang}
            dataThrow={dataThrow}
            setDataThrow={setDataThrow}
            API_URL={API_URL}
            user={user}
            
            combinedTotal={combinedTotal}
            setCombinedTotal={setCombinedTotal}
            receipts={receipts}
            loggedInUsername={loggedInUsername}
            historyData={historyData}
            setHistoryData={setHistoryData}
            />
          }
          />
          </Routes>
      </div>
    </>
  );
}

export default withAuthenticator(App);

/*
  Primary Key:
   - Required
   - Unique
  Sort Key:
   - Optional
*/

/*
// Who owes me money?
// Get all debt/IOUs related to me (the current user)
QUERY WHERE PK = devin@

PK: devin@ | SK: bob@ | RECEIPT: SOBEYS | AMOUNT: 10
PK: devin@ | SK: bob@ | RECEIPT: BURGERS | AMOUNT: 20


*/

/*
New GSI
// Who do i owe money to?

PK: bob@ | SK: devin@ | AMOUNT: 10
PK: devin@ | SK: bob@ | AMOUNT: -10

*/
