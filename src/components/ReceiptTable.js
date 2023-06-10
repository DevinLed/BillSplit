import React, { useState, useEffect } from "react";
import "react-html5-camera-photo/build/css/index.css";
import "../index.css";
import "../darkMode.css";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  IoMdAddCircleOutline,
  IoMdRemoveCircleOutline,
} from "react-icons/io";

export default function ReceiptTable({
  name,
  handleNameChange,
  amount,
  setAmount,
  handleReceiptSubmit,
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
  onResetTotals,
  setCombinedArray
}) {
    const handlePictureDelete = (index) => {
        const deletedItem = combinedArray[index];
        const amountToRemove = deletedItem.amount || deletedItem.total_amount;
        const deletedSliderValue = deletedItem.sliderValue;
      
        // Remove the deleted item from the combinedArray
        setCombinedArray((prevCombinedArray) =>
          prevCombinedArray.filter((_, i) => i !== index)
        );
      
        // Update the obtainedInfo array without the deleted item
        setObtainedInfo((prevInfo) => {
          const updatedInfo = prevInfo.filter((_, i) => i !== index);
          return updatedInfo.map((info) => {
            if (info.sliderValue !== undefined) {
              return {
                ...info,
                sliderValue: info.sliderValue > deletedSliderValue
                  ? info.sliderValue - 1
                  : info.sliderValue,
              };
            }
            return info;
          });
        });
      
        // Update the corresponding total based on the deleted item's sliderValue
        switch (deletedSliderValue) {
          case 0:
            setYouPictureTotal((prevTotal) =>
              (parseFloat(prevTotal) - parseFloat(amountToRemove)).toFixed(2)
            );
            break;
          case 55:
            setSplitPictureTotal((prevTotal) =>
              (parseFloat(prevTotal) - parseFloat(amountToRemove)).toFixed(2)
            );
            break;
          case 100:
            setThemPictureTotal((prevTotal) =>
              (parseFloat(prevTotal) - parseFloat(amountToRemove)).toFixed(2)
            );
            break;
          case 35:
            setYouPictureTotal((prevTotal) =>
              (parseFloat(prevTotal) - parseFloat(amountToRemove)).toFixed(2)
            );
            setCombinedArray((prevCombinedArray) => {
              return prevCombinedArray.map((item) => {
                if (item.sliderValue === 35) {
                  return {
                    ...item,
                    total_amount: (
                      parseFloat(item.total_amount) - parseFloat(amountToRemove)
                    ).toFixed(2),
                  };
                }
                return item;
              });
            });
            break;
          case 75:
            setSplitPictureTotal((prevTotal) =>
              (parseFloat(prevTotal) - parseFloat(amountToRemove)).toFixed(2)
            );
            setCombinedArray((prevCombinedArray) => {
              return prevCombinedArray.map((item) => {
                if (item.sliderValue === 75) {
                  return {
                    ...item,
                    total_amount: (
                      parseFloat(item.total_amount) - parseFloat(amountToRemove)
                    ).toFixed(2),
                  };
                }
                return item;
              });
            });
            break;
          case 125:
            setThemPictureTotal((prevTotal) =>
              (parseFloat(prevTotal) - parseFloat(amountToRemove)).toFixed(2)
            );
            setCombinedArray((prevCombinedArray) => {
              return prevCombinedArray.map((item) => {
                if (item.sliderValue === 125) {
                  return {
                    ...item,
                    total_amount: (
                      parseFloat(item.total_amount) - parseFloat(amountToRemove)
                    ).toFixed(2),
                  };
                }
                return item;
              });
            });
            break;
          default:
            const correspondingTotal = combinedArray.find(
              (item) => item.sliderValue === deletedSliderValue
            );
            if (correspondingTotal) {
              const updatedCombinedArray = combinedArray.map((item) => {
                if (item.sliderValue === deletedSliderValue) {
                  return {
                    ...item,
                    total_amount: (
                      parseFloat(item.total_amount) - parseFloat(amountToRemove)
                    ).toFixed(2),
                  };
                }
                return item;
              });
      
              setCombinedArray(updatedCombinedArray);
            }
            break;
        }
      };
      
  const [sliderValue, setSliderValue] = useState(55);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
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
    return <div>{/* Add your content for the "You" column here */}</div>;
  };

  const renderSplitColumn = () => {
    return <div>{/* Add your content for the "Split" column here */}</div>;
  };

  const renderPersonNameColumn = () => {
    return <div>{/* Add your content for the "Person Name" column here */}</div>;
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
  
  useEffect(() => {
    if (Array.isArray(items) && Array.isArray(obtainedInfo)) {
      setCombinedArray([...items, ...obtainedInfo]);
    }
  }, [items, obtainedInfo]);


  
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
                      : item.description && item.description.replace(/\b\w/g, (c) => c.toUpperCase())}
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
