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
import {
  createUserData,
  updateUserData,
  deleteUserData,
  updateAccountData
} from "./graphql/mutations"; // Import the mutations

import { Amplify, API, graphqlOperation, Auth, Storage } from "aws-amplify";
import awsconfig from "./aws-exports";
import { getUserData, getAccountData } from "./graphql/queries";
Amplify.configure(awsconfig);

function App({ signOut, user }) {
  // dark mode theme switching
  
  const [theme, setTheme] = useState("");
  const [lang, setLang] = useState("english");
  const [taxRate, setTaxRate] = useState(0.15);

  const toggleTheme = () => {
    // Toggle the theme between "light" and "dark"
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  
    // Apply the theme class to the body element
    document.body.className = newTheme;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const loggedInUsername = user.username;

        // Fetch the account data for the logged-in user
        const accountDataResponse = await API.graphql(
          graphqlOperation(getAccountData, {
            id: loggedInUsername, 
          })
        );

        const accountData = accountDataResponse.data.getAccountData;
        if (accountData) {
          setTheme(accountData.theme || "light");
          setLang(accountData.language || "english");
          setTaxRate(accountData.taxRate || 0.15);
        }
      } catch (error) {
        console.error("Error fetching account data", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const updateAccountDataInDynamoDB = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const loggedInUsername = user.username;

        // Update the account data in DynamoDB
        await API.graphql(
          graphqlOperation(updateAccountData, {
            input: {
              username: loggedInUsername,
              theme,
              language: lang,
              taxRate,
            },
          })
        );
      } catch (error) {
        console.error("Error updating account data", error);
      }
    };

    // Call the update function when theme, lang, or taxRate changes
    updateAccountDataInDynamoDB();
  }, [theme, lang, taxRate]);
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

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState(""); // Set the logged-in username
  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const username = user.username;
        setLoggedInUsername(username);
      } catch (error) {
        console.error("Error getting authenticated user", error);
        // Handle the error here, e.g., show an error message to the user.
      }
    };

    fetchAuthenticatedUser();
  }, []); // Empty dependency array to run this effect once on component mount

  const [combinedArray, setCombinedArray] = useState([]);

  const [obtainedInfo, setObtainedInfo] = useState([]);
  // Calendar for manual receipt entry
  const [merchantName, setMerchantName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [personReceiptAmount, setPersonReceiptAmount] = useState("");
  const [value] = useState("");

  // History tab work
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
  const addNum = async (id, val, val2) => {
    try {
      // Fetch the existing user data from DynamoDB
      const userDataResponse = await API.graphql(
        graphqlOperation(getUserData, { id })
      );

      const userData = userDataResponse.data.getUserData;

      if (!userData) {
        // Handle the case where the user data doesn't exist
        return;
      }

      // Calculate the updated personOwing value
      const a = parseFloat(userData.personOwing, 0);
      const b = parseFloat(val);
      const c = parseFloat(val2);
      const prevalue = a + b;
      const updatedValue = prevalue + c;

      // Update the user data in DynamoDB
      const updatedUserData = {
        id: userData.id,
        personOwing: updatedValue.toFixed(2), // Convert to 2 decimal places
      };

      await API.graphql(
        graphqlOperation(updateUserData, { input: updatedUserData })
      );

      // Update the local state if needed
      setList((prevList) => {
        const newList = prevList.map((item) => {
          if (item.id === id) {
            return { ...item, personOwing: updatedValue.toFixed(2) };
          }
          return item;
        });
        localStorage.setItem("list", JSON.stringify(newList));
        return newList;
      });

      setDisplayAdd(true);
    } catch (error) {
      console.error("Error updating value:", error);
      // Handle the error as needed
    }
  };
  const editRow = async (id) => {
    setIsEditing(true);
    setEditPerson(id); // Store the selected item's ID to be edited

    try {
      // Fetch the user data for the selected item from DynamoDB using the new query
      const userDataResponse = await API.graphql(
        graphqlOperation(getUserData, { id }) //
      );

      const editingRow = userDataResponse.data.getUserData; // Assuming getUserData returns a single item

      if (editingRow) {
        // Update state variables with the values from the selected item
        setPersonName(editingRow.personName);
        setPersonPhone(editingRow.personPhone);
        setPersonEmail(editingRow.personEmail);
        setPersonOwing(editingRow.personOwing);
      } else {
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error case as needed
    }
  };

  // used to update values of balance for contacts
  const subNum = async (id, val, val2) => {
    try {
      // Fetch the existing user data from DynamoDB
      const userDataResponse = await API.graphql(
        graphqlOperation(getUserData, { id })
      );

      const userData = userDataResponse.data.getUserData;

      if (!userData) {
        // Handle the case where the user data doesn't exist
        return;
      }

      // Calculate the updated personOwing value
      const a = parseFloat(userData.personOwing, 0);
      const b = parseFloat(val);
      const c = parseFloat(val2);
      const prevalue = a - b;
      const updatedValue = prevalue - c;

      // Update the user data in DynamoDB
      const updatedUserData = {
        id: userData.id,
        personOwing: updatedValue.toFixed(2), // Convert to 2 decimal places
      };

      await API.graphql(
        graphqlOperation(updateUserData, { input: updatedUserData })
      );

      // Update the local state if needed
      setList((prevList) => {
        const newList = prevList.map((item) => {
          if (item.id === id) {
            return { ...item, personOwing: updatedValue.toFixed(2) };
          }
          return item;
        });
        localStorage.setItem("list", JSON.stringify(newList));
        return newList;
      });

      setDisplayAdd(false);
    } catch (error) {
      console.error("Error subtracting value:", error);
      // Handle the error as needed
    }
  };
  // Handler for full reset of tables.
  const handleResetCombinedArray = () => {
    setCombinedArray([]);
    setObtainedInfo([]);
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the user is authenticated
      const user = await Auth.currentAuthenticatedUser();

      const newUserData = {
        username: user.username, // Use the authenticated user's username as a reference
        personName: personName,
        personPhone: personPhone,
        personEmail: personEmail,
        personOwing: parseFloat(personOwing),
      };

      // Add the user data to DynamoDB
      const result = await API.graphql(
        graphqlOperation(createUserData, { input: newUserData })
      );

      console.log("User data created:", result.data.createUserData);

      // Handle the response as needed

      // Clear form fields and set editing state
      setPersonName("");
      setPersonPhone("");
      setPersonEmail("");
      setPersonOwing("");
      setAddPerson(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error creating user data:", error);

      // Handle the error appropriately

      // Clear form fields and set editing state
      setPersonName("");
      setPersonPhone("");
      setPersonEmail("");
      setPersonOwing("");
      setAddPerson(false);
      setIsEditing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create an object with the input data
      const inputData = {
        id: editPerson, // Provide the user's ID you want to update
        personName,
        personPhone,
        personEmail,
        personOwing,
      };

      // Send the GraphQL request to update user data
      const response = await API.graphql(
        graphqlOperation(updateUserData, { input: inputData })
      );

      // Handle the response, e.g., show a success message
      console.log("User data updated:", response);

      // Update the list state with the modified data
      setList((prevList) =>
        prevList.map((item) =>
          item.id === editPerson
            ? {
                ...item,
                personName,
                personPhone,
                personEmail,
                personOwing,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Error while updating user data:", error);
    }

    // Reset input fields and close the edit person popup
    setPersonName("");
    setPersonPhone("");
    setPersonEmail("");
    setPersonOwing("");
    setSelectedValue("");
    setIsEditing(false);
    setAddPerson(false);
  };

  const selectPerson = async (id) => {
    try {
      // Fetch user data from DynamoDB based on the selected id
      const userData = await API.graphql(graphqlOperation(getUserData, { id }));
      const selectingPerson = userData.data.getUserData;

      if (selectingPerson) {
        setPersonName(selectingPerson.personName);
        setPersonOwing(selectingPerson.personOwing);
        setPersonReceiptAmount(selectingPerson.personReceiptAmount);
      } else {
        // Handle the case where no person with the specified id was found
        console.error(`Person with id ${id} not found.`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error as needed
    }
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

  const addReceipt = (receipt) => {
    setReceipts((prevReceipts) => {
      const newReceipts = [...prevReceipts, receipt];
      localStorage.setItem(
        "receipts",
        JSON.stringify(newReceipts.map(JSON.stringify))
      );
      return newReceipts;
    });
  };

  return (
    <>
    <div  className={`App ${theme}`}>
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
          element={<LandingPage theme={theme} lang={lang} setLang={setLang} />}
        />
        <Route path="/" element={<Navigate to="/LandingPage" />} />

        <Route
          path="/ReceiptInput/:id"
          element={
            <ReceiptInput
              combinedTotal={combinedTotal}
              setCombinedTotal={setCombinedTotal}
              personName={personName}
              personOwing={personOwing}
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
            />
          }
        />
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
          element={<EditPerson theme={theme} lang={lang} setLang={setLang} />}
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