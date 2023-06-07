import React, { useRef, useState, useEffect, onBlur, useCamera } from "react";
import Switch from "react-switch";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Camera } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import AddPerson from "./AddPerson";
import loading from "../img/loading.gif";
import Header from "./Header";
import { v4 as uuidv4 } from "uuid";
import SplitBill from "./SplitBill";
import "../index.css";
import History from "./History";
import {
  Route,
  Routes,
  Link,
  path,
  Navigate,
  Redirect,
} from "react-router-dom";
import "../darkMode.css";

import DatePicker from "react-datepicker";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus, FaTrash } from "react-icons/fa";
import { GrSubtractCircle } from "react-icons/gr";
import {
  IoMdAddCircleOutline,
  IoMdRemoveCircleOutline,
  IoMdCheckmark,
} from "react-icons/io";


export default function ReceiptTable({name, handleNameChange, amount, setAmount, sliderValue, handleSliderChange, renderColumn, handleReceiptSubmit, handleSaveClick, items, 
    currentIndex, handleDelete, getTotal, youTotal, splitTotal, themTotal}) {
        function handleKeyDown(e) {
            if (e.key === "Enter") {
              e.target.blur();
            }
          }
  
  return (
    <>
    
          <table className="m-auto max-w-min table-fixed border border-black">
            <thead className="whitespace-no-wrap max-w-fit overflow-hidden truncate">
              <tr className="whitespace-no-wrap max-w-fit overflow-hidden px-2">
                <th className="px-15 text-black">Item</th>
                <th className="px-15 text-black">Price</th>
                <th
                  className="px-1"
                  colSpan={3}
                  style={{ width: "33.33%" }}
                >
                  <span className="border-r border-black pr-2 pl-4 text-black">
                    Me
                  </span>
                  <span className="border-r border-l border-black px-2 text-black">
                    Split
                  </span>
                  <span className="border-l border-black pl-2 text-black">
                    Them
                  </span>
                </th>
              </tr>
            </thead>

            <tbody className="pt-5">
              <tr>
                <td>
                  <input
                    type="amount"
                    className="form-control mb-1 w-20 px-1 text-xs font-bold"
                    id="colFormLabel"
                    placeholder="Item Name"
                    value={name}
                    onKeyDown={handleKeyDown}
                    onChange={handleNameChange}
                  />
                </td>
                <td>
                  <input
                    type="amount"
                    className="form-control mb-1 w-20 px-1 text-xs font-bold"
                    id="colFormLabel"
                    placeholder="Amount"
                    value={amount}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      const value = e.target.value;
                      const isValid = /^\d+(\.\d{0,2})?$/.test(
                        value
                      );

                      if (isValid || value === "") {
                        // Allow empty value
                        setAmount(value);
                        console.log("amount verified");
                      } else {
                        console.log("amount not verified");
                      }
                    }}
                  />
                </td>
                <td colSpan="3" className="px-2">
                  <div
                    style={{ width: "auto", margin: "auto" }}
                  >
                    <Slider
                      defaultValue={55}
                      min={0}
                      max={100}
                      value={sliderValue}
                      step={55}
                      onChange={(value) =>
                        handleSliderChange(value)
                      }
                    />
                    {renderColumn()}
                  </div>
                </td>
              </tr>

              <tr className="add-button m-2 items-center justify-center text-center text-black">
                <button
                  className="add-button m-2 items-center justify-center text-center text-2xl text-gray-500"
                  onClick={() => {
                    handleReceiptSubmit(sliderValue);
                    handleSaveClick();
                  }}
                >
                  <IoMdAddCircleOutline />
                </button>
              </tr>
              {items.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === currentIndex % 2
                      ? "bg-blue-100"
                      : ""
                  }
                >
                  <td className=" text-black">
                    {item.name.replace(/\b\w/g, (c) =>
                      c.toUpperCase()
                    )}
                  </td>
                  <td className="mr-2 flex items-center text-sm">
                    <button
                      className="add-button m-2 items-center justify-center text-center text-2xl text-gray-500"
                      onClick={() => handleDelete(index)}
                    >
                      <IoMdRemoveCircleOutline />
                    </button>
                    <span className="ml-2 text-black">
                      ${item.amount}
                    </span>
                  </td>
                  <td colSpan={3}>
                    <div
                      style={{
                        width: "auto",
                        margin: "auto",
                        padding: "8px",
                      }}
                    >
                      <Slider
                        defaultValue={item.sliderValue}
                        min={0}
                        max={100}
                        step={0}
                        disabled={true}
                      />
                      {renderColumn()}
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-blue-200">
              <tr className="border-t border-gray-500 bg-blue-200">
                <td
                  className="px-2 py-1 text-black"
                  style={{ width: "33.33%" }}
                >
                  Total:
                </td>
                <td
                  className="mr-2 px-2 py-1 text-right  text-black"
                  style={{ width: "33.33%" }}
                >
                  ${getTotal()}
                </td>
                <td
                  className="border-l border-gray-500 px-2 py-1 text-center text-xs  text-black"
                  style={{ width: "33.33%" }}
                >
                  {parseFloat(youTotal).toFixed(2)}
                </td>
                <td
                  className="border-l border-gray-500 px-2 py-1 text-center text-xs  text-black"
                  style={{ width: "33.33%" }}
                >
                  {parseFloat(splitTotal).toFixed(2)}
                </td>
                <td
                  className="border-l border-gray-500 px-2 py-1 text-center text-xs  text-black"
                  style={{ width: "33.33%" }}
                >
                  {parseFloat(themTotal).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
  </>
  )
}
