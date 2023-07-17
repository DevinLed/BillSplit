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
  amount,
  setAmount,
  items,
  currentIndex,
  handleReceiptPictureSubmit,
  combinedArray,
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
  setCombinedArray,
  pictureTax,
  setPictureTax,
  pictureConfidence,
  setName,
  filledIn,
  setFilledIn,
  theme
}) {
  // Handler for changing the name of the item added to array
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

  const [sliderValue, setSliderValue] = useState(50);

  // Calculate the tax owing based on the selected value, works into the values in the slider total information
  const taxOwing =
    selectedValue === "you"
      ? parseFloat(splitPictureTotal) / 2 + parseFloat(themPictureTotal)
      : parseFloat(splitPictureTotal) / 2 + parseFloat(youPictureTotal);

  const taxOwingPerc = taxOwing / parseFloat(getPictureTotal());

  const taxActual = parseFloat(pictureTax) * parseFloat(taxOwingPerc);

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
          item.sliderValue !== undefined ? item.sliderValue : 0;
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
  return (
    <>
      <div className="whitespace-no-wrap m-0 max-w-full rounded-lg bg-white py-1 px-1 dark:bg-slate-900">
        <div className="mb-0 flex max-w-min justify-center">
          <table className="mx-20 border-collapse">
            <thead className="whitespace-no-wrap max-w-fit overflow-hidden truncate">
              <tr className="whitespace-no-wrap max-w-fit overflow-hidden px-2">
                <th className="px-2 py-1 text-left sm:px-4 sm:py-2">
                <span className="border-b-2 ml-1">
                   
                  Item
                  </span>
                </th>
                <th className="px-2 py-1 text-left sm:px-4 sm:py-2">
                <span className="border-b-2">
                   
                   Price
                   </span>
                </th>
                <th className="pl-1" colSpan={3} style={{ width: "33.33%" }}>
                  <span className="px-3 py-1 text-left sm:px-4 sm:py-2 ">
                  <span className="border-b-2 text-left">
                 Me
                 </span>
                  </span>
                  <span className="py-1 pr-3 pl-3 text-left sm:px-4 sm:py-2">
                  <span className="border-b-2 text-center">
                  Split
                  </span>
                  </span>
                  <span className="px-2 py-1 text-left sm:px-4 sm:py-2 ">
                  <span className="border-b-2 text-right">
                 Them
                 </span>
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
                className="add-button m-2 items-center justify-center text-center text-2xl text-gray-500"
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
                  <td className="text-black px-2">
                    <span className="border-b-2 text-left">
                      {item.name
                        ? item.name.replace(/\b\w/g, (c) => c.toUpperCase())
                            .length > 5
                          ? item.name
                              .replace(/\b\w/g, (c) => c.toUpperCase())
                              .slice(0, 5) + "..."
                          : item.name.replace(/\b\w/g, (c) => c.toUpperCase())
                        : item.description &&
                          (item.description.replace(/\b\w/g, (c) =>
                            c.toUpperCase()
                          ).length > 5
                            ? item.description
                                .replace(/\b\w/g, (c) => c.toUpperCase())
                                .slice(0, 5) + "..."
                            : item.description.replace(/\b\w/g, (c) =>
                                c.toUpperCase()
                              ))}
                    </span>
                    
                    <button
                      className="add-button justify-right py-2 text-2xl text-gray-500"
                      onClick={() => handlePictureDelete(index)}
                    >
                      <IoMdRemoveCircleOutline />
                    </button>
                  </td>
                  
                  <td
                    className="mr-2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <input
                      type="text"
                      className="my-2 ml-2  w-16 items-center justify-center py-1 text-xs text-black"
                      style={{
                        border:
                          item.confidence < 0.5 && !hasBeenAccessed
                            ? "1px solid red"
                            : "1px solid black",
                      }}
                      value={
                        item.amount && !isNaN(item.amount)
                          ? `$${item.amount}`
                          : `$${parseFloat(item.total_amount).toFixed(2) || 0}`
                      }
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
            <tfoot className="bg-white">
              <tr>
                <td
                  className="px-2 py-1 text-black"
                  style={{ width: "33.33%" }}
                >
                  <span className="border-b-2">Total</span>
                </td>
                <td
                  className="mr-2 px-2 py-1 text-right  text-black "
                  style={{ width: "33.33%" }}
                >
                  <span className="border-b-2">
                    $
                    {getPictureTotal().toString().length > 7
                      ? getPictureTotal().toString().slice(0, 4) + "..."
                      : getPictureTotal()}
                  </span>
                </td>
                <td
                  className=" px-2 py-1 text-center text-xs text-black"
                  style={{ width: "33.33%" }}
                >
                  <span className="border-b-2">
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
                  <span className="border-b-2">
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
                  <span className="border-b-2">
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

              {pictureTax && (
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
                        handleTaxAmountChange(e.target.value);
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
              )}
            </tfoot>
          </table>
        </div>
      </div>
      <div className="bg-gray-100 px-6 py-4">
        <div className="mb-1 flex flex-col justify-between sm:flex-row">
          <div>
            <h2 className={theme=== "dark" ? "text-black mb-2 text-lg font-bold":"mb-2 text-lg font-bold"}>Payment Details:</h2>
          </div>

          <label className="text-lg font-medium">
            {selectedValue === "you" ? (
              <>
                {personName} owes you $
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
                You owe {personName} $
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
        </div>
        {pictureTax && (
          <label className=" flex items-center justify-center text-center text-lg font-medium">
            {selectedValue === "you"
              ? `Taxes ${personName} owes you: ${parseFloat(taxActual).toFixed(
                  2
                )}`
              : `Taxes you owe ${personName}: ${parseFloat(taxActual).toFixed(
                  2
                )}`}
          </label>
        )}
        <label className="mt-0 flex items-center text-lg font-medium">
          Receipt Total: ${finalTotal()}
        </label>
      </div>
    </>
  );
}
