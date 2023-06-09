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
  IoMdTrash,
} from "react-icons/io";

export default function ReceiptTable({
  name,
  handleNameChange,
  amount,
  setAmount,
  handleReceiptSubmit,
  handleSaveClick,
  items,
  currentIndex,
  handleDelete,
  getTotal,
  youTotal,
  splitTotal,
  themTotal,
  handleReceiptPictureSubmit,
  setIsAddedManually,
  combinedArray,
  handlePictureDelete,
  getPictureTotalPopup,
  getPictureTotalMessage,
  pictureTotal,
  obtainedInfo,
  setObtainedInfo,
  getPictureTotal,
  setGetPictureTotalPopup,
  selectMethodManual,
  selectMethodPicture,
  setThemPictureTotal,
  setSplitPictureTotal,
  setYouPictureTotal,
  youPictureTotal,
  splitPictureTotal,
  themPictureTotal,
  selectPerson,
  selectedValue,
  personName,
  personReceiptAmount,
}) {
  const [sliderValue, setSliderValue] = useState(55);
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

  const renderColumn = () => {
    if (sliderValue <= 33) {
      return renderYouColumn();
    } else if (sliderValue <= 66) {
      return renderSplitColumn();
    } else {
      return renderPersonNameColumn();
    }
  };

  const renderYouColumn = () => {
    return <div>{}</div>;
  };

  const renderSplitColumn = () => {
    return <div>{}</div>;
  };

  const renderPersonNameColumn = () => {
    return <div>{}</div>;
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };
  const handlePictureSliderChange = (index, value, item) => {
    setObtainedInfo((prevInfo) => {
      const updatedInfo = [...prevInfo];
      updatedInfo[index] = {
        ...updatedInfo[index],
        sliderValue: value,
      };
      return updatedInfo;
    });
  
    const updatedObtainedInfo = obtainedInfo.map((info, i) => {
      if (i === index) {
        return {
          ...info,
          previousAmount: parseFloat(info.amount), // Use info.amount instead of info.total_amount
          sliderValue: value,
        };
      }
      return info;
    });
  
    const updatedYouPictureTotal = updatedObtainedInfo.reduce((total, info) => {
      if (info.sliderValue === 0) {
        return total + parseFloat(info.amount); // Use info.amount instead of info.total_amount
      }
      return total;
    }, 0);
  
    const updatedSplitPictureTotal = updatedObtainedInfo.reduce(
      (total, info) => {
        if (info.sliderValue === 55) {
          return total + parseFloat(info.amount); // Use info.amount instead of info.total_amount
        }
        return total;
      },
      0
    );
  
    const updatedThemPictureTotal = updatedObtainedInfo.reduce(
      (total, info) => {
        if (info.sliderValue === 100) {
          return total + parseFloat(info.amount); // Use info.amount instead of info.total_amount
        }
        return total;
      },
      0
    );
  
    setObtainedInfo(updatedObtainedInfo);
    setYouPictureTotal(updatedYouPictureTotal.toFixed(2));
    setSplitPictureTotal(updatedSplitPictureTotal.toFixed(2));
    setThemPictureTotal(updatedThemPictureTotal.toFixed(2));
  };
  
  useEffect(() => {
    setObtainedInfo((prevInfo) =>
      prevInfo.map((item) => ({
        ...item,
        sliderValue: item.sliderValue || 55,
      }))
    );
  }, []);
  return (
    <>
      <div className="whitespace-no-wrap m-0 w-full max-w-min rounded-lg bg-white py-1 px-1 dark:bg-slate-900">
        <div className="mx-auto mb-0 max-w-min">
          <table className="m-auto max-w-min table-fixed border border-black">
            <thead className="whitespace-no-wrap max-w-fit overflow-hidden truncate">
              <tr className="whitespace-no-wrap max-w-fit overflow-hidden px-2">
                <th className="px-15 text-black">Item</th>
                <th className="px-15 text-black">Price</th>
                <th className="px-1" colSpan={3} style={{ width: "33.33%" }}>
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
                    const isValid = /^\d+(\.\d{0,2})?$/.test(value);

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
                  style={{
                    width: "auto",
                    margin: "auto",
                  }}
                >
                  <Slider
                    defaultValue={55}
                    min={0}
                    max={100}
                    value={sliderValue}
                    step={55}
                    onChange={(value) => handleSliderChange(value)}
                  />
                  {renderColumn()}
                </div>
              </td>
            </tr>

            <tr className="add-button m-2 items-center justify-center text-center text-black">
              <button
                className="add-button m-2 items-center justify-center text-center text-2xl text-gray-500"
                onClick={() => {
                  handleReceiptPictureSubmit(sliderValue);
                  handleSaveClick();

                  setIsAddedManually(true);
                }}
              >
                <IoMdAddCircleOutline />
              </button>
            </tr>
            <tbody className="pt-5">
              {combinedArray.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === currentIndex % 2 ? "bg-blue-100" : ""
                  }
                >
                  <td className="text-black">
                    {item.name
                      ? item.name.replace(/\b\w/g, (c) => c.toUpperCase())
                      : item.description.replace(/\b\w/g, (c) =>
                          c.toUpperCase()
                        )}
                  </td>
                  <td className="mr-2 flex items-center text-sm">
                    <button
                      className="add-button m-2 items-center justify-center text-center text-2xl text-gray-500"
                      onClick={() => handlePictureDelete(index)}
                    >
                      <IoMdRemoveCircleOutline />
                    </button>
                    <span className="ml-2 text-black">
                      {item.amount
                        ? `$${item.amount}`
                        : `$${parseFloat(item.total_amount).toFixed(2)}`}
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
                      {item.isAddedManually ? (
                        <Slider
                          defaultValue={item.sliderValue || 55} // Set the default value to 0
                          min={0}
                          max={100}
                          step={0} // Set the step to 0 to disable slider interaction
                          disabled // Disable the slider
                        />
                      ) : (
                        <Slider
                          defaultValue={item.sliderValue || 55}
                          min={0}
                          max={100}
                          step={55}
                          value={item.sliderValue}
                          onChange={(value) =>
                            handlePictureSliderChange(index, value, item)
                          }
                        />
                      )}

                      {renderColumn()}
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-blue-200">
              {selectMethodPicture ? (
                <tr>
                  {" "}
                  {getPictureTotalPopup && (
                    <div className="popup">
                      <p>{getPictureTotalMessage}</p>
                    </div>
                  )}
                </tr>
              ) : (
                ""
              )}
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
                  ${getPictureTotal()}
                </td>
                <td
                  className="border-l border-gray-500 px-2 py-1 text-center text-xs  text-black"
                  style={{ width: "33.33%" }}
                >
                  {parseFloat(youPictureTotal).toFixed(2)}
                </td>
                <td
                  className="border-l border-gray-500 px-2 py-1 text-center text-xs  text-black"
                  style={{ width: "33.33%" }}
                >
                  {parseFloat(splitPictureTotal).toFixed(2)}
                </td>
                <td
                  className="border-l border-gray-500 px-2 py-1 text-center text-xs  text-black"
                  style={{ width: "33.33%" }}
                >
                  {parseFloat(themPictureTotal).toFixed(2)}
                </td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center rounded-lg bg-white px-3 py-2 shadow-md">
        <label className="text-center text-lg font-medium">
          {selectedValue === "you" ? (
            <>
              {personName} owes you $
              {parseFloat(personReceiptAmount).toFixed(2)}
            </>
          ) : (
            <>
              You owe {personName} ${parseFloat(personReceiptAmount).toFixed(2)}
            </>
          )}
        </label>
      </div>
      <div className="mt-3 flex items-center justify-center rounded-lg bg-white px-3 py-2 shadow-md">
        <label className="text-center text-lg font-medium">
          Receipt Total: ${getPictureTotal()}
        </label>
      </div>
    </>
  );
}
