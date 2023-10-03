import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createAccountData } from "../graphql/mutations";
import { TbReceiptTax } from "react-icons/tb";
import { IoLanguage } from "react-icons/io5";
import { CSSTransition } from "react-transition-group";

function FirstTimeSetupForm({ onComplete, lang, setLang }) {
  const [taxRate, setTaxRate] = useState("");
  const [theme, setTheme] = useState("light");
  const [showLang, setShowLang] = useState(false);

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
    setTaxRate(selectedTaxRate); // Update the tax rate
  };

  const handleLanguageChange = () => {
    if (lang === "english") {
      setLang("french");
      setShowLang(false);
    } else {
      setLang("english");
      setShowLang(false);
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSave = async () => {
    try {
      // Create an entry in the AccountData table
      await API.graphql(
        graphqlOperation(createAccountData, {
          input: {
            theme,
            language: lang,
            taxRate,
          },
        })
      );
      onComplete(); // Callback to indicate setup completion
    } catch (error) {
      console.error("Error creating AccountData entry:", error);
    }
  };

  return (
    <div>
      {/* Tax Rate Dropdown */}
      <label
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={
          `mb-4 flex h-24 w-fit cursor-pointer flex-col items-center justify-center 
           rounded-lg border ${
             theme === "dark" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white"
           } 
           py-4 px-6 text-sm font-semibold shadow-md 
           hover:bg-${
             theme === "dark" ? "gray-700" : "gray-200"
           } hover:no-underline`
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
          {lang === "english" ? "Tax %" : "Impôt %"}
        </span>
      </label>

      {/* Tax Rate Dropdown Content */}
      <CSSTransition
        in={isDropdownOpen}
        timeout={500}
        classNames="fade1"
        unmountOnExit
      >
        <div className="dropdown w-full mt-2 mx-auto text-center">
          <div
            className={
              "dropdown-content w-full absolute rounded-lg shadow-lg " +
              (theme === "dark" ? "bg-gray-900" : "bg-white")
            }
          >
            {regions.map((region) => (
              <button
                key={region.name}
                className={
                  "dropdown-option cursor-pointer w-full flex items-center justify-center p-2 border-b-2 border-gray-300" +
                  (theme === "dark"
                    ? "bg-gray-900 text-white"
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
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
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
                  setIsDropdownOpen(false);
                }}
              >
                {lang === "english" ? "Set" : "Appliquer"}
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>

      {/* Language Label */}
      <label
        onClick={() => setShowLang(true)}
        className={
          `mb-3 flex h-24 w-fit cursor-pointer flex-col items-center justify-center 
           rounded-lg border ${theme === "dark" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white"} 
           py-4 px-6 text-sm font-semibold shadow-md 
           hover:bg-${theme === "dark" ? "gray-700" : "gray-200"} hover:no-underline`
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

      {/* Language Selection Popup */}
      <CSSTransition
        in={showLang}
        timeout={500} // Adjust the duration of the transition as needed
        classNames="fade"
        unmountOnExit
      >
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
                  ? "Change language to French?"
                  : "Changer de langue en Anglais ?"}
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
                    "px-4 py-2 rounded hover:bg-gray-900 text-gray-800 " +
                    (theme === "dark"
                      ? "bg-gray-300 text-gray-800"
                      : "bg-gray-300")
                  }
                  onClick={() => setShowLang(false)}
                >
                  {lang === "english" ? "No" : "Non"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>

      {/* Save Button */}
      <div className="text-center mt-4">
        <button
          onClick={handleSave}
          className={
            "px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          }
        >
          {lang === "english" ? "Save" : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}

export default FirstTimeSetupForm;
