import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { IoAlertCircle, IoLanguage } from "react-icons/io5";
import { TbReceiptTax } from "react-icons/tb";
import { CSSTransition } from "react-transition-group";

export default function Settings({
  theme,
  setTheme,
  taxRate,
  setTaxRate,
  handleClearData,
  showConfirmation,
  setShowConfirmation,
  lang,
  setLang,
}) {
  const { id } = useParams();
  const [showLang, setShowLang] = useState(false);

  const [selectedTaxRate, setSelectedTaxRate] = useState(taxRate);

  const regions = [
    { name: "NL", taxRate: 0.15 },
    { name: "PE", taxRate: 0.15 },
    { name: "NS", taxRate: 0.15 },
    { name: "NB", taxRate: 0.15 },
    { name: "QC", taxRate: 0.14975 },
    { name: "ON", taxRate: 0.13 },
    { name: "MB", taxRate: 0.13 },
    { name: "SK", taxRate: 0.11 },
    { name: "AB", taxRate: 0.05 },
    { name: "BC", taxRate: 0.12 },
    { name: "NT", taxRate: 0.05 },
    { name: "NU", taxRate: 0.05 },
    { name: "YT", taxRate: 0.05 },
  ];

  const handleRegionSelect = (selectedTaxRate) => {
    setSelectedTaxRate(selectedTaxRate); // Update the selected tax rate
    setTaxRate(selectedTaxRate); // Update the tax rate
    setTheme(!theme);
  };

  const [customTaxRate, setCustomTaxRate] = useState("");

  const handleConfirmClearData = () => {
    setShowConfirmation(true); // Show the confirmation popup
  };

  const handleCancelClearData = () => {
    setShowConfirmation(false); // Hide the confirmation popup
  };

  const handleLanguageChange = () => {
    if (lang === "english") {
      setLang("french");
      setShowLang(false);
    } else {
      setLang("english");
      setShowLang(false);
    }
    setTheme(!theme);
  };
  const handleCancelLang = () => {
    setShowLang(false);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <main
        className="xs:max-w-xl bg-white-500 mt-5 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
        style={{ maxWidth: "600px" }}
      >
        <Header showSettings={true} theme={theme} lang={lang} />

        <div className="flex flex-col items-center justify-center rounded-lg px-3 py-2 shadow-md mb-4 mx-auto">
          {/* Section for selecting tax rate */}
          <div className="mb-4 text-center">
            <label
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={
                theme === "dark"
                  ? "flex h-24 w-fit cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white p-0 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
                  : "flex h-24 w-fit cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-0 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
              }
            >
              <div style={{ width: "24px", height: "24px" }}>
                <TbReceiptTax size={24} />
              </div>
              <span
                className={
                  theme === "dark"
                    ? "text-white text-center"
                    : "text-gray-800 text-center"
                }
              >
                {lang === "english"
                  ? "Tax %"
                  : "Impôt %"}
              </span>
            </label>
            <CSSTransition
              in={isDropdownOpen}
              timeout={500}
              classNames="fade1"
              unmountOnExit
            >
              <div className="dropdown w-full mt-2 mx-auto text-center">
                <div className="dropdown-content w-full absolute bg-gray-600 rounded-lg shadow-lg">
                  {regions.map((region) => (
                    <button
                      key={region.name}
                      className={
                        "dropdown-option cursor-pointer w-full flex items-center justify-center p-2 border-b-2 border-gray-300" +
                        (theme === "dark"
                          ? "bg-gray-900 text-black"
                          : "bg-white text-gray-800")
                      }
                      onClick={() => {
                        handleRegionSelect(region.taxRate);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <span className="ml-2 ">{region.name}</span>
                    </button>
                  ))}
                  <div className="dropdown-option flex items-center p-2">
                    <input
                      type="number"
                      placeholder={lang === "english" ? "Custom" : "Coutume"}
                      value={customTaxRate}
                      onChange={(e) => setCustomTaxRate(e.target.value)}
                      className="ml-2 my-auto border rounded px-1 pt-2 w-16 h-6"
                    />
                    <button
                      className={
                        "ml-2 cursor-pointer w-full " +
                        (theme === "dark"
                          ? "bg-gray-900 text-white"
                          : "bg-white text-gray-800")
                      }
                      onClick={() => {
                        handleRegionSelect(customTaxRate);
                        setCustomTaxRate("");
                        setIsDropdownOpen(false);
                      }}
                    >
                      {lang === "english" ? "Set" : "Appliquer"}
                    </button>
                  </div>
                </div>
              </div>
            </CSSTransition>

            {/* Display current tax rate */}
            <p className="text-center mt-4">
              {lang === "english"
                ? "Current Tax Rate"
                : "Taux d'imposition actuel"}
              : {taxRate === "" ? "Custom" : `${(taxRate * 100).toFixed(2)}%`}
            </p>
          </div>

          {/* Clear Data Label */}
          <label
            onClick={handleConfirmClearData}
            className={
              theme === "dark"
                ? "flex h-24 w-fit cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
                : "flex h-24 w-fit cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
            }
          >
            <div style={{ width: "24px", height: "24px" }}>
              <IoAlertCircle size={24} />
            </div>
            <span
              className={
                theme === "dark"
                  ? "text-white text-center"
                  : "text-gray-800 text-center"
              }
            >
              {lang === "english" ? "Clear Data" : "Tout effacer"}
            </span>
          </label>

          {/* Language Label */}
          <label
            onClick={(e) => setShowLang(true)}
            className={
              theme === "dark"
                ? "flex h-24 w-fit cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-900 bg-gray-900 text-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-700 hover:no-underline"
                : "flex h-24 w-fit cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-4 px-6 text-sm font-semibold shadow-md hover:bg-gray-200 hover:no-underline"
            }
          >
            <div style={{ width: "24px", height: "24px" }}>
              <IoLanguage size={24} />
            </div>
            <span
              className={
                theme === "dark"
                  ? "text-white text-center"
                  : "text-gray-800 text-center"
              }
            >
              {lang === "english" ? "Language" : "Langue"}
            </span>
          </label>
          <CSSTransition
            in={showLang}
            timeout={500} // Adjust the duration of the transition as needed
            classNames="fade"
            unmountOnExit
          >
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
              <div
                className={
                  "p-6 rounded shadow-md " +
                  (theme === "dark" ? "bg-gray-800" : "bg-gray-100")
                }
              >
                <div>
                  <p
                    className={
                      theme === "dark"
                        ? "text-white text-center"
                        : "text-gray-800 text-center"
                    }
                  >
                    {lang === "english"
                      ? "Change language to french?"
                      : "Changer de langue en anglais ?"}
                  </p>
                  <div className="flex justify-end mt-4">
                    <button
                      className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                      onClick={handleLanguageChange}
                    >
                      {lang === "english" ? "Yes" : "Oui"}
                    </button>
                    <button
                      className={
                        "px-4 py-2 rounded hover:bg-gray-900 " +
                        (theme === "dark"
                          ? "bg-gray-300 text-gray-800"
                          : "bg-gray-800")
                      }
                      onClick={handleCancelLang}
                    >
                      {lang === "english" ? "No" : "Non"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CSSTransition>

          {/* Confirmation Popup */}
          <CSSTransition
            in={showConfirmation}
            timeout={500} // Adjust the duration of the transition as needed
            classNames="fade"
            unmountOnExit
          >
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
              <div
                className={
                  "p-6 rounded shadow-md " +
                  (theme === "dark" ? "bg-gray-800" : "bg-gray-100")
                }
              >
                <p
                  className={
                    theme === "dark"
                      ? "text-white whitespace-nowrap"
                      : "text-black whitespace-nowrap"
                  }
                >
                  {lang === "english"
                    ? "Are you sure you want to clear all data?"
                    : "Voulez-vous vraiment effacer toutes les données ?"}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    onClick={handleClearData}
                  >
                    {lang === "english" ? "Yes" : "Oui"}
                  </button>
                  <button
                    className={
                      "px-4 py-2 rounded hover:bg-gray-900 " +
                      (theme === "dark"
                        ? "bg-gray-300 text-gray-800"
                        : "bg-gray-800")
                    }
                    onClick={handleCancelClearData}
                  >
                    {lang === "english" ? "No" : "Non"}
                  </button>
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>
      </main>
    </>
  );
}
