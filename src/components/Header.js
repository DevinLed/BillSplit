import React from "react";
import { useState } from "react";

export default function Header({ setShowBill, setPersonEdit, setGroupEdit }) {
    setShowBill = useState(false);
    setPersonEdit = useState(false);
    setGroupEdit= useState(false);
  return (
    <>
      {setShowBill ? (<h1>Bill Splitter</h1>):''}
      {setPersonEdit ? (<h1>Edit a person or group</h1>):''}
      {setGroupEdit ? (<h1>Edit group</h1>):''}
    </>
  );
}
