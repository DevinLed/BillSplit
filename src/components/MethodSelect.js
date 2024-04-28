import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCreateOutline, IoCameraOutline } from "react-icons/io5";
import { Button } from "@material-tailwind/react";

const MethodSelect = ({
  lang,
  setSelectMethodManual,
  setSelectMethodPicture,
  setSelectPersonReceipt,
  setPersonReceiptAmount,
  selectedModalPerson,
  selectMethodPicture,
  selectMethodManual,
}) => {
    const navigate = useNavigate();

    const handleManualButtonClick = () => {
        setSelectPersonReceipt(false);
        setPersonReceiptAmount(0);
        navigate(`/App/ReceiptInput/${selectedModalPerson}?selectMethodManual=true`);
      };
    
      const handlePictureButtonClick = () => {
        setSelectPersonReceipt(false);
        setPersonReceiptAmount(0);
        navigate(`/App/ReceiptInput/${selectedModalPerson}?selectMethodPicture=true`);
      };
  return (
    <main
      className="xs:max-w-xl bg-white-500 mt-1 rounded p-0 pt-3 shadow sm:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl"
      style={{ maxWidth: "600px" }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1>
            {lang === "english" ? "Select Method" : "Sélectionner la méthode"}
          </h1>
          <ul className="list-group items-center justify-center">
          <li>
              <Button 
                variant="gradient" 
                className="gradient-btn mb-2 flex items-center justify-center mt-3" 
                style={{ margin: "auto" }} 
                onClick={() => {
                    setSelectMethodManual(true);
                    handleManualButtonClick();
                }}
              >
                <div className="flex items-center">
                  <IoCreateOutline size={24} />
                  <span className="text-white ml-2">
                    {lang === "english" ? "Manual" : "À la main"}
                  </span>
                </div>
              </Button>
            </li>
            <li className="flex flex-col items-center justify-center">
              <Button
                variant="gradient"
                className="gradient-btn mb-2 flex items-center justify-center"
                style={{ margin: "auto" }}
                onClick={handlePictureButtonClick}
              >
                <div className="flex items-center">
                  <IoCameraOutline size={24} />
                  <span className="text-white ml-2">
                    {lang === "english" ? "Picture" : "Image"}
                  </span>
                </div>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default MethodSelect;
