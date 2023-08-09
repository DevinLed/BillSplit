import React, { useState, useEffect } from "react";
import "react-html5-camera-photo/build/css/index.css";
import "../index.css";
import "../darkMode.css";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import { CSSTransition } from "react-transition-group";

export default function ReceiptTable({
  name,
  amount,
  setAmount,
  items,
  currentIndex,
  handleReceiptPictureSubmit,
  combinedArray,
  setCombinedArray,
  obtainedInfo,
  setObtainedInfo,
  getPictureTotal,
  setThemPictureTotal,
  setSplitPictureTotal,
  setYouPictureTotal,
  youPictureTotal,
  splitPictureTotal,
  themPictureTotal,
  selectedValue,
  personName,
  personReceiptAmount,
  setPersonReceiptAmount,
  pictureTax,
  setPictureTax,
  pictureConfidence,
  setName,
  filledIn,
  setFilledIn,
  theme,
  receiptTotal,
  setReceiptTotal,
  taxReal,
  setTaxReal,
  taxOwing,
  taxOwingPerc,
  taxActual,
  taxRate,
  lang
}) {
  // Handler for changing the name of the item added to array
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [showTaxButton, setShowTableButton] = useState(true);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  // Calculate the final total of the entire receipt, both picture and manually added
  const finalTotal = () => {
    let total =
      parseFloat(splitPictureTotal) +
      parseFloat(themPictureTotal) +
      (parseFloat(pictureTax) || 0) +
      parseFloat(youPictureTotal);

    let splitValue = parseFloat(splitPictureTotal) / 2;
    let themValue = parseFloat(themPictureTotal);
    let youValue = parseFloat(youPictureTotal);

    if (selectedValue === "you") {
      setPersonReceiptAmount(splitValue + themValue);
    } else if (selectedValue === "them") {
      setPersonReceiptAmount(splitValue + youValue);
    }

    setReceiptTotal(parseFloat(total).toFixed(2));
    return parseFloat(total).toFixed(2);
  };

  const [hasBeenAccessed, setHasBeenAccessed] = useState(false);

  // Handler for deleting an item from the combinedArray
  const handlePictureDelete = (index) => {
    const deletedItem = combinedArray[index];

    // Update the obtainedInfo array without the deleted item
    setObtainedInfo((prevInfo) => prevInfo.filter((_, i) => i !== index));

    // Update the sliderValue of the remaining items
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

  const [showTooltip, setShowTooltip] = useState(false);

  const handleToggleTooltip = () => {
    setShowTooltip((prevShowTooltip) => !prevShowTooltip);
  };

  const [sliderValue, setSliderValue] = useState(50);

  // Calculate the tax owing based on the selected value, works into the values in the slider total information
  const handleAutoTaxesToggle = () => {
    const calculatedTax = (parseFloat(getPictureTotal()) * { taxRate }).toFixed(
      2
    );
    setPictureTax(calculatedTax);
    setIsAddingItem(true);
    setShowTableButton(false);
    console.log(taxRate);
  };

  // Handler for when on mobile, enter key will collapse the keyboard popup
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  // Render the column based on the slider value
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
    return <div className="flex h-full items-center justify-center"></div>;
  };

  const renderSplitColumn = () => {
    return <div className="flex h-full items-center justify-center"></div>;
  };

  const renderPersonNameColumn = () => {
    return <div className="flex h-full items-center justify-center"></div>;
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };
  // Handler for changing the values in item.amount
  const handleAmountChange = (value, index) => {
    // Remove any non-digit and non-decimal characters
    const sanitizedValue = value.replace(/[^\d.]/g, "");
  
    // Ensure the value is in the format of XXXXX.XX
    const decimalSplit = sanitizedValue.split(".");
    const integerPart = decimalSplit[0].slice(0, 5); // Limit to 5 digits before the decimal point
    const decimalPart = decimalSplit[1] ? `.${decimalSplit[1].slice(0, 2)}` : "";
  
    const updatedValue = `${integerPart}${decimalPart}`;
  
    const updatedCombinedArray = [...combinedArray];
    updatedCombinedArray[index].amount = updatedValue || "0";
    setCombinedArray(updatedCombinedArray);
  };
  
  
  
  // Handler for manually editting Tax amount
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
  // Handler for moving the slider from entries added via picture
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
        if (info.sliderValue === 50) {
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
  // defaulting the slidervalues for picture array entries
  useEffect(() => {
    setObtainedInfo((prevInfo) =>
      prevInfo.map((item) => ({
        ...item,
        sliderValue: 50,
      }))
    );
  }, []);

  // combing the 2 arrays, picture and manually entered
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
          item.sliderValue !== undefined ? item.sliderValue : 50;
        switch (sliderValue) {
          case 0:
            totals.youTotal += parseFloat(amount);
            break;
          case 50:
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
  useEffect(() => {
    if (!showTaxButton) {
      const calculatedTax = (parseFloat(getPictureTotal()) * taxRate).toFixed(
        2
      );
      setPictureTax(calculatedTax);
    }
  }, [showTaxButton, getPictureTotal]);
  return (
    <>
      <div
        className={
          theme === "dark"
            ? "whitespace-no-wrap m-0 flex max-w-full justify-center rounded-lg bg-gray-900 py-1 px-1 dark:bg-slate-900"
            : "whitespace-no-wrap m-0  flex max-w-full justify-center bg-white py-1 px-1 dark:bg-slate-900"
        }
      >
        <div className="mb-0 flex max-w-min justify-center rounded-lg border-2">
          <table
            className={
              theme === "dark"
                ? "mx-1 my-2 bg-gray-900 text-white"
                : "mx-1 my-2 "
            }
          >
            <thead className="whitespace-no-wrap max-w-fit overflow-hidden truncate">
              <tr className="whitespace-no-wrap max-w-fit overflow-hidden px-2">
                <th className="py-1 text-left sm:py-2">
                  <span className="ml-1 border-b-2">
                    {lang === "english" ? "Item" : "Article"}
                  </span>
                </th>
                <th className="px-2 py-1 text-left sm:px-4 sm:py-2">
                  <span className="border-b-2">
                    {lang === "english" ? "Price" : "Prix"}
                  </span>
                </th>
                <th className="pl-1" colSpan={3} style={{ width: "33.33%" }}>
                  <span className="px-3 py-1 text-left sm:px-4 sm:py-2 ">
                    <span className="border-b-2 text-left">
                      {lang === "english" ? "Me" : "Moi"}
                    </span>
                  </span>
                  <span className="py-1 pr-3 pl-3 text-left sm:px-4 sm:py-2">
                    <span className="border-b-2 text-center">
                      {lang === "english" ? "Split" : "Diviser"}
                    </span>
                  </span>
                  <span className="px-2 py-1 text-left sm:px-4 sm:py-2 ">
                    <span className="border-b-2 text-right">
                      {lang === "english" ? "Them" : "Eux"}
                    </span>
                  </span>
                </th>
              </tr>
            </thead>

            <tr>
              <td>
                <input
                  autoComplete="off"
                  type="amount"
                  className="form-control mb-1 w-20 px-1 text-xs font-bold"
                  id="colFormLabel"
                  placeholder={lang === "english" ? "Item" : "Article"}
                  value={name}
                  onKeyDown={handleKeyDown}
                  onChange={handleNameChange}
                />
              </td>
              <td>
                <input
                  autoComplete="off"
                  type="amount"
                  className="form-control mb-1 w-14 px-1 text-xs font-bold"
                  id="colFormLabel"
                  placeholder={lang === "english" ? "Price" : "Prix"}
                  value={amount}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    const value = e.target.value;
                    const isValid = /^\d+(\.\d{0,2})?$/.test(value);

                    if (isValid || value === "") {
                      setAmount(value);
                      console.log("amount verified");
                    } else {
                      console.log("amount not verified");
                    }
                  }}
                />
              </td>
              <td colSpan="3" className="pl-3">
                <div
                  style={{
                    width: "auto",
                    margin: "auto",
                  }}
                >
                  <Slider
                    defaultValue={50}
                    min={0}
                    max={100}
                    value={sliderValue}
                    step={50}
                    onChange={(value) => handleSliderChange(value)}
                  />
                  {renderColumn()}
                </div>
              </td>
            </tr>

            <tr className="add-button m-2 items-center justify-center text-center text-black">
              <button
                className={
                  theme === "dark"
                    ? "add-button m-2 items-center justify-center text-center text-2xl text-white"
                    : "add-button m-2 items-center justify-center text-center text-2xl text-black"
                }
                onClick={() => {
                  handleReceiptPictureSubmit(sliderValue);
                  setSliderValue(50);
                }}
              >
                <IoMdAddCircleOutline />
              </button>
            </tr>
            <tbody className="pt-5">
              {combinedArray.map((item, index) => (
                <tr key={index}>
                  <td
                    className={theme === "dark" ? "text-white" : "text-black"}
                    onClick={handleToggleTooltip}
                  >
                    <span
                      className="border-b-2 text-left mr-1"
                      title={
                        (showTooltip &&
                          (item.name
                            ? item.name.replace(/\b\w/g, (c) => c.toUpperCase())
                            : item.description
                            ? item.description.replace(/\b\w/g, (c) =>
                                c.toUpperCase()
                              )
                            : "")) ||
                        null
                      }
                    >
                      {item.name
                        ? item.name.replace(/\b\w/g, (c) => c.toUpperCase())
                            .length > 4
                          ? item.name
                              .replace(/\b\w/g, (c) => c.toUpperCase())
                              .slice(0, 4) + ".."
                          : item.name.replace(/\b\w/g, (c) => c.toUpperCase())
                        : item.description &&
                          (item.description.replace(/\b\w/g, (c) =>
                            c.toUpperCase()
                          ).length > 4
                            ? item.description
                                .replace(/\b\w/g, (c) => c.toUpperCase())
                                .slice(0, 4) + ".."
                            : item.description.replace(/\b\w/g, (c) =>
                                c.toUpperCase()
                              ))}
                    </span>

                    <button
                      className={
                        theme === "dark"
                          ? "justify-right text-2xl text-white"
                          : "justify-right text-2xl text-black"
                      }
                      onClick={() => handlePictureDelete(index)}
                      style={{ float: "right" }}
                    >
                      <IoMdRemoveCircleOutline />
                    </button>
                  </td>

                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <input
                      type="text"
                      className="my-2 ml-2 w-16 items-center justify-center py-1 text-xs text-black"
                      style={{
                        border:
                          item.confidence < 0.5 && !hasBeenAccessed
                            ? "1px solid red"
                            : "1px solid black",
                      }}
                      value={item.amount || item.total_amount}
                      onChange={(e) => {
                        if (!hasBeenAccessed) {
                          setHasBeenAccessed(true);
                        }
                        handleAmountChange(e.target.value, index);
                        handleKeyDown(e, combinedArray.length);
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
                        className="ml-2"
                        defaultValue={item.sliderValue || 50}
                        min={0}
                        max={100}
                        step={50}
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
            <tfoot className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
              <tr>
                <td
                  className={
                    theme === "dark" ? "py-1 text-white" : "py-1 text-black"
                  }
                  style={{ width: "33.33%" }}
                >
                  <span className="border-b-2">Total</span>
                </td>
                <td
                  className="mr-2 px-2 py-1 text-right  text-black "
                  style={{ width: "33.33%" }}
                >
                  <span
                    className={
                      theme === "dark"
                        ? "border-b-2 text-white text-xs"
                        : "border-b-2 text-black text-xs"
                    }
                  >
                    $
                    {getPictureTotal().toString().length > 7
                      ? getPictureTotal().toString().slice(0, 4) + ".."
                      : getPictureTotal()}
                  </span>
                </td>
                <td
                  className="px-2 py-1 text-center text-xs text-black"
                  style={{ width: "33.33%" }}
                >
                  <span
                    className={
                      theme === "dark"
                        ? "ml-2 border-b-2 text-white"
                        : "ml-2 border-b-2 text-black"
                    }
                  >
                    {parseFloat(youPictureTotal).toFixed(2).toString().length >
                    7
                      ? parseFloat(youPictureTotal)
                          .toFixed(2)
                          .toString()
                          .slice(0, 4) + "..."
                      : parseFloat(youPictureTotal).toFixed(2)}
                  </span>
                </td>
                <td
                  className="px-2 py-1 text-center text-xs text-black"
                  style={{ width: "33.33%" }}
                >
                  <span
                    className={
                      theme === "dark"
                        ? "ml-3 border-b-2 text-white"
                        : "ml-2 border-b-2 text-black"
                    }
                  >
                    {parseFloat(splitPictureTotal).toFixed(2).toString()
                      .length > 7
                      ? parseFloat(splitPictureTotal)
                          .toFixed(2)
                          .toString()
                          .slice(0, 4) + "..."
                      : parseFloat(splitPictureTotal).toFixed(2)}
                  </span>
                </td>
                <td
                  className="px-2 py-1 text-center text-xs text-black"
                  style={{ width: "33.33%" }}
                >
                  <span
                    className={
                      theme === "dark"
                        ? "ml-3 border-b-2 text-white"
                        : "ml-2 border-b-2 text-black"
                    }
                  >
                    {parseFloat(themPictureTotal).toFixed(2).toString().length >
                    7
                      ? parseFloat(themPictureTotal)
                          .toFixed(2)
                          .toString()
                          .slice(0, 4) + "..."
                      : parseFloat(themPictureTotal).toFixed(2)}
                  </span>
                </td>
                <td></td>
                <td></td>
              </tr>
              <div
                className={
                  theme === "dark" ? "bg-gray-900 h-2" : "bg-white h-2"
                }
              ></div>

              {pictureTax ? (
                <tr
                  className={
                    theme === "dark"
                      ? "bg-gray-900 text-white"
                      : "bg-white text-black"
                  }
                >
                  <td
                    className={theme === "dark" ? "text-white" : "text-black"}
                  >
                    {lang === "english" ? "Tax" : "Impôt"}
                    <button
                      className={
                        theme === "dark"
                          ? "justify-right text-2xl text-white"
                          : "justify-right text-2xl text-black"
                      }
                      style={{ float: "right" }}
                      onClick={() => {
                        setPictureTax(0);
                        setShowTableButton(true);
                      }}
                    >
                      {" "}
                      <IoMdRemoveCircleOutline />
                    </button>
                  </td>
                  <input
                    type="text"
                    className="my-0 ml-2 w-14 px-0 py-1 text-xs text-black text-center"
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
                      handleTaxAmountChange(e.target.value);
                    }}
                  />
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
              ) : null}
              <tr className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
                <td colSpan={6} className="text-center">
                  <div
                    className={
                      theme === "dark" ? "bg-gray-900 h-3" : "bg-white h-3"
                    }
                  ></div>
                  {showTaxButton ? (
                    <button
                      className={
                        theme === "dark"
                          ? "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          : "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      }
                      onClick={() => {
                        handleAutoTaxesToggle();
                      }}
                    >
                      {lang === "english"
                        ? "Auto Taxes?"
                        : "Taxes Automatiques"}
                    </button>
                  ) : (
                    ""
                  )}
                </td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div
        className={
          theme === "dark"
            ? "mr-2 ml-2 mt-2 rounded-lg bg-gray-800 px-24 py-4"
            : "mt-2 rounded-lg bg-gray-100 px-24 py-4"
        }
      >
        <div className="flex-column mb-1 flex justify-center">
          <div>
            <h2
              className={
                theme === "dark"
                  ? "text-white-200 mb-2 font-bold whitespace-nowrap"
                  : "justify-left mb-2 flex text-lg font-bold text-black whitespace-nowrap"
              }
            >
              {lang === "english" ? "Payment Details" : "Détails de paiement"}
            </h2>
          </div>

          <label
            className={
              theme === "dark"
                ? "flex justify-left text-lg w-full font-medium text-white whitespace-nowrap"
                : "flex justify-left text-lg w-full font-medium text-black whitespace-nowrap"
            }
          >
            {selectedValue === "you" ? (
              <>
                {personName}{" "}
                {lang === "english" ? "owes you: $" : "  vous doit: $"}
                {parseFloat(personReceiptAmount).toFixed(2).toString().length >
                15
                  ? parseFloat(personReceiptAmount)
                      .toFixed(2)
                      .toString()
                      .slice(0, 15) + "..."
                  : parseFloat(personReceiptAmount).toFixed(2)}
              </>
            ) : (
              <>
                {lang === "english"
                  ? `You owe ${personName}`
                  : `${personName} tu me dois `}{" "}
                $
                {parseFloat(personReceiptAmount).toFixed(2).toString().length >
                15
                  ? parseFloat(personReceiptAmount)
                      .toFixed(2)
                      .toString()
                      .slice(0, 15) + "..."
                  : parseFloat(personReceiptAmount).toFixed(2)}
              </>
            )}
          </label>
          <label
            className={
              theme === "dark"
                ? "mt-0 flex items-center justify-left text-lg font-medium text-white whitespace-nowrap"
                : "mt-0 flex items-center justify-left text-lg font-medium text-black whitespace-nowrap"
            }
          >
            {lang === "english" ? "Receipt Total: " : "Total des reçus: "}$
            {finalTotal()}
          </label>
        </div>
        {pictureTax ? (
          <label
            className={
              theme === "dark"
                ? "flex items-center justify-left text-lg font-medium text-white whitespace-no-wrap"
                : "flex items-center justify-left text-lg font-medium text-black whitespace-no-wrap"
            }
          >
            {selectedValue === "you"
              ? lang === "english"
                ? `Taxes ${personName} owes you: $${
                    isNaN(parseFloat(taxActual))
                      ? "0.00"
                      : parseFloat(taxActual).toFixed(2)
                  }`
                : `Les impôts que ${personName} vous doit: $${
                    isNaN(parseFloat(taxActual))
                      ? "0.00"
                      : parseFloat(taxActual).toFixed(2)
                  }`
              : lang === "english"
              ? `Taxes you owe ${personName}: $${
                  isNaN(parseFloat(taxActual))
                    ? "0.00"
                    : parseFloat(taxActual).toFixed(2)
                }`
              : `Impôts que vous devez ${personName}: $${
                  isNaN(parseFloat(taxActual))
                    ? "0.00"
                    : parseFloat(taxActual).toFixed(2)
                }`}
          </label>
        ) : null}
      </div>
    </>
  );
}
