import React from 'react'

export default function ReceiptTable() {
  return (
    <>
    <div className="col-sm-10 mb-0 mt-3">
      <input
        type="amount"
        className="form-control mb-5 h-10 text-center font-bold"
        id="colFormLabel"
        placeholder="Merchant Name"
        onKeyDown={handleKeyDown}
        onChange={(e) =>
          setMerchantName(
            e.target.value.replace(/\b\w/g, (c) =>
              c.toUpperCase()
            )
          )
        }
        onClick={() => setDisplayMerchant(true)}
      />
      <div className="justify-left mt-3 flex h-11 items-center ">
        <div className="z-50 mt-3 mb-3 text-center">
          <label
            htmlFor="colFormLabel"
            className="col-form-label text-center text-black"
          >
            Date of Receipt
          </label>
          <DatePicker
            defaultValue="Date of Receipt"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="bg-blue-100 text-center"
            onFocus={(e) => e.target.blur()}
            dateFormat="dd/MM/yyyy"
            onClick={() => setDisplayDate(true)}
          />
        </div>
      </div>
    </div>

    <div className="m-3">
      <input
        type="invoice"
        className="form-control w-55 opacity-4 mb-2 mt-2 text-center font-bold"
        id="colFormLabel"
        placeholder="Invoice Number"
        onKeyDown={handleKeyDown}
        onChange={(e) => setInvoiceNumber(e.target.value)}
        onClick={() => setDisplayInvoice(true)}
      />
    </div>
    <div>
      <div className="whitespace-no-wrap m-0 w-full max-w-min rounded-lg bg-white py-1 px-1 dark:bg-slate-900">
        <div className="mx-auto mb-0 max-w-min">
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
              You owe {personName} $
              {parseFloat(personReceiptAmount).toFixed(2)}
            </>
          )}
        </label>
      </div>
    </div>

    <div className="col-sm-10 ml-0 mr-0 mt-3 flex flex-col items-center justify-center">
      <div>
        <Link to={`/ReceiptInput/${id}`}>
          <button
            className="mt-4 mb-5 rounded border-2 border-blue-500 bg-blue-500 py-2 px-4 font-bold shadow transition-all duration-300 hover:bg-white"
            onClick={(e) => {
              getFinalTotal();
              setSelectMethodManual(false);
              setSelectPersonReceipt(true);
              handleHistorySubmit(e);
              resetReceiptForm();
              setIsReceiptSubmitted(true);
            }}
          >
            Add Another Receipt
          </button>
        </Link>
      </div>

      <div>
        <Link to="/SplitBill">
          <button
            type="submit"
            className="mb-5 rounded border-2 border-blue-500 bg-blue-500 py-2 px-4 font-bold shadow transition-all duration-300 hover:bg-white"
            onClick={(e) => {
              getFinalTotal();
              handleHistorySubmit(e);
              resetReceiptForm();
              setIsReceiptSubmitted(true);
            }}
          >
            Submit
          </button>
        </Link>
      </div>
    </div>
  </>
  )
}
