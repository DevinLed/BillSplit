import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppsIcon from "@mui/icons-material/Apps";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import "../LandingPage.css";

const Topbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const renderButton = (icon, text, link, tooltip) => (
    <Link to={link} className="menu-link" onClick={() => setShowMenu(false)}>
      <div>
        {icon}
        <span className="menu-text">{text}</span>
      </div>
    </Link>
  );

  return (
    <div className="mx-auto px-2 flex justify-between items-center">
          <Link to="/" className="text-4xl font-bold">
            Divvy
          </Link>
 <div className="topbar">
      <div className="menu-icon">
        <IconButton onClick={toggleMenu}  style={{ color: '#fff' }}>
          <MenuIcon />
        </IconButton>
      </div>
      {showMenu && (
        <div className="dropdown-menuTop">
          {renderButton(<AppsIcon />, "App", "/App/Home", "Go to App")}
          {renderButton(<SchoolIcon />, "Tutorial", "/Tutorial", "Tutorial")}
          {renderButton(<PersonIcon />, "About", "/AboutMe", "About")}
          {renderButton(<ContactMailIcon />, "Contact", "/Contact", "Contact Me")}
        </div>
      )}
    </div>
        </div>
  );
};

export default Topbar;
