import React, { useState, useEffect } from "react";
import "react-html5-camera-photo/build/css/index.css";
import "../index.css";
import "../darkMode.css";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";

export default function ReceiptTable({
  name,
  handleNameChange,
  amount,
  setAmount,
  items,
  currentIndex,
  handleReceiptPictureSubmit,
  combinedArray,
  obtainedInfo,
  setObtainedInfo,
  getPictureTotal,
  selectMethodManual,
  selectMethodPicture,
  setThemPictureTotal,
  setSplitPictureTotal,
  setYouPictureTotal,
  youPictureTotal,
  splitPictureTotal,
  themPictureTotal,
  selectedValue,
  personName,
  personReceiptAmount,
  setCombinedArray,
  pictureTax,
  setPictureTax,
  pictureConfidence
}) {
    
  const [hasBeenAccessed, setHasBeenAccessed] = useState(false);
  const handlePictureDelete = (index) => {
    const deletedItem = combinedArray[index];

    // Update the obtainedInfo array without the deleted item
    setObtainedInfo((prevInfo) => prevInfo.filter((_, i) => i !== index));

    // Update the sliderValue of the remaining items, if necessary
    setCombinedArray((prevCombinedArray) => {
      const updatedArray = prevCombinedArray.map((item) => {
        if (item.sliderValue !== undefined) {
          return {
            ...item,
            sliderValue:
              item.sliderValue > deletedItem.sliderValue
                ? item.sliderValue - 1
                : item.sliderValue,
          };
        }
        return item;
      });
      return updatedArray.filter((_, i) => i !== index);
    });
  };

  const [sliderValue, setSliderValue] = useState(55);

  const taxOwing = (selectedValue === "you")
  ? parseFloat(splitPictureTotal) / 2 + parseFloat(youPictureTotal)
  : parseFloat(splitPictureTotal) / 2 + parseFloat(themPictureTotal);

  const taxOwingPerc = taxOwing / parseFloat(getPictureTotal());

  const taxActual = parseFloat(pictureTax) * parseFloat(taxOwingPerc);

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

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
    return (
      <div className="flex h-full items-center justify-center">
        {/* Add your content for the "You" column here */}
      </div>
    );
  };

  const renderSplitColumn = () => {
    return (
      <div className="flex h-full items-center justify-center">
        {/* Add your content for the "Split" column here */}
      </div>
    );
  };

  const renderPersonNameColumn = () => {
    return (
      <div className="flex h-full items-center justify-center">
        {/* Add your content for the "Person Name" column here */}
      </div>
    );
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const handleAmountChange = (value, index) => {
    const newValue = value.replace(/^\$/, "");

    let parsedValue = newValue.replace(/[^0-9.]/g, "");

    const decimalIndex = parsedValue.indexOf(".");
    if (decimalIndex !== -1) {
      parsedValue =
        parsedValue.slice(0, decimalIndex + 1) +
        parsedValue.slice(decimalIndex + 1).replace(".", "");
    }
    const decimalSplit = parsedValue.split(".");
    if (decimalSplit[1] && decimalSplit[1].length > 2) {
      parsedValue = decimalSplit[0] + "." + decimalSplit[1].slice(0, 2);
    }
    const updatedCombinedArray = [...combinedArray];
    updatedCombinedArray[index].amount = parsedValue || "0";
    setCombinedArray(updatedCombinedArray);
  };
  const handleTaxAmountChange = (value) => {
    const newValue = value.replace(/^\$/, "");
    let parsedValue = newValue.replace(/[^0-9.]/g, "");
  
    const decimalIndex = parsedValue.indexOf(".");
    if (decimalIndex !== -1) {
      parsedValue =
        parsedValue.slice(0, decimalIndex + 1) +
        parsedValue.slice(decimalIndex + 1).replace(".", "");
    }
    const decimalSplit = parsedValue.split(".");
    if (decimalSplit[1] && decimalSplit[1].length > 2) {
      parsedValue = decimalSplit[0] + "." + decimalSplit[1].slice(0, 2);
    }
  
    // Update the state value of pictureTax
    setPictureTax(parsedValue || "");
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
          previousAmount: parseFloat(info.amount), 
          sliderValue: value,
        };
      }
      return info;
    });

    const updatedYouPictureTotal = updatedObtainedInfo.reduce((total, info) => {
      if (info.sliderValue === 0) {
        return total + parseFloat(info.amount); 
      }
      return total;
    }, 0);

    const updatedSplitPictureTotal = updatedObtainedInfo.reduce(
      (total, info) => {
        if (info.sliderValue === 55) {
          return total + parseFloat(info.amount); 
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

  useEffect(() => {
    if (Array.isArray(items) && Array.isArray(obtainedInfo)) {
      setCombinedArray([...items, ...obtainedInfo]);
    }
  }, [items, obtainedInfo]);

  useEffect(() => {
    // Calculate the updated totals based on the remaining items in combinedArray
    const updatedTotals = combinedArray.reduce(
      (totals, item) => {
        const amount =
          item.amount !== undefined ? item.amount : item.total_amount;
        const sliderValue =
          item.sliderValue !== undefined ? item.sliderValue : 0;
        switch (sliderValue) {
          case 0:
            totals.youTotal += parseFloat(amount);
            break;
          case 55:
            totals.splitTotal += parseFloat(amount);
            break;
          case 100:
            totals.themTotal += parseFloat(amount);
            break;
          default:
            break;
        }
        return totals;
      },
      { youTotal: 0, splitTotal: 0, themTotal: 0 }
    );

    const total =
      updatedTotals.youTotal +
      updatedTotals.splitTotal +
      updatedTotals.themTotal;

    setYouPictureTotal(updatedTotals.youTotal.toFixed(2));
    setSplitPictureTotal(updatedTotals.splitTotal.toFixed(2));
    setThemPictureTotal(updatedTotals.themTotal.toFixed(2));
  }, [combinedArray]);

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
                  setSliderValue(55);
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
                      : item.description &&
                        item.description.replace(/\b\w/g, (c) =>
                          c.toUpperCase()
                        )}
                  </td>
                  <td
                    className="mr-2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <button
                      className="add-button m-2 items-center justify-center text-center text-2xl text-gray-500"
                      onClick={() => handlePictureDelete(index)}
                    >
                      <IoMdRemoveCircleOutline />
                    </button>
                    <input
                      type="text"
                      className="my-0 ml-2 w-20 py-1 text-xs text-black"
                      style={{
                        border:
                          item.confidence < 0.5 && !hasBeenAccessed
                            ? "1px solid red"
                            : "1px solid black",
                      }}
                      value={
                        item.amount
                          ? `$${item.amount}`
                          : `$${parseFloat(item.total_amount).toFixed(2)}`
                      }
                      onChange={(e) => {
                        if (!hasBeenAccessed) {
                          setHasBeenAccessed(true);
                        }
                        handleAmountChange(
                          e.target.value,
                          combinedArray.length
                        )(handleKeyDown(e, combinedArray.length));
                      }}
                    />
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
                        defaultValue={item.sliderValue || 55}
                        min={0}
                        max={100}
                        step={55}
                        value={item.sliderValue}
                        onChange={(value) =>
                          handlePictureSliderChange(index, value, item)
                        }
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
              
              {pictureTax ? (
                <tr className="bg-white">
                  <td className="text-black">Tax</td>
                  <td
                    className="mr-2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <button
                      className="add-button m-2 items-center justify-center text-center text-2xl text-gray-500"
                      onClick={() => setPictureTax(0)}
                    >
                      <IoMdRemoveCircleOutline />
                    </button>
                    <input
                      type="text"
                      className="my-0 ml-2 w-20 py-1 text-xs text-black"
                      style={{
                        border:
                        pictureConfidence < 0.5 && !hasBeenAccessed
                            ? "1px solid red"
                            : "1px solid black",
                      }}
                      value={`$${pictureTax}`}
                      onChange={(e) => {
                        if (!hasBeenAccessed) {
                          setHasBeenAccessed(true);
                        }
                        handleTaxAmountChange(
                          e.target.value
                        );
                      }}
                    />
                  </td>
                  <td colSpan={3}>
                    <div
                      style={{
                        width: "auto",
                        margin: "auto",
                        padding: "8px",
                      }}
                    >
                      {renderColumn()}
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              ): ("")}
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
      {pictureTax ? <div className="mt-3 flex items-center justify-center rounded-lg bg-white px-3 py-2 shadow-md">
        <label className="text-center text-lg font-medium">
          {selectedValue === "you" ? (
            <>
              Taxes {personName} owes you: {parseFloat(taxActual).toFixed(2)}
            </>
          ) : (
            <>
              Taxes you owe {personName}: {parseFloat(taxActual).toFixed(2)}
            </>
          )}
        </label>
      </div>:("")}
      <div className="mt-3 flex items-center justify-center rounded-lg bg-white px-3 py-2 shadow-md">
        <label className="text-center text-lg font-medium">
          Receipt Total: ${getPictureTotal()}
        </label>
      </div>
    </>
  );
}
