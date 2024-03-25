import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AppsIcon from "@mui/icons-material/Apps";
import SchoolIcon from "@mui/icons-material/School";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Tooltip from "@mui/material/Tooltip";
import { Resend } from "resend";
import Footer from "./Footer";
import { Hidden } from "@mui/material";
import "../LandingPage.css";
import emailjs from "emailjs-com";
import Avatar from "@mui/material/Avatar";
import Headshot from "../img/Headshot.png";
import PersonIcon from "@mui/icons-material/Person";

import "../LandingPage.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
const renderButton = (icon, text, to, tooltip) => (
  <Link
    to={to}
    className="inline-flex flex-col items-center justify-center text-center"
  >
    <Tooltip title={tooltip}>
      <IconButton color="inherit">{icon}</IconButton>
    </Tooltip>
    <span className="text-xs text-white">{text}</span>
  </Link>
);

const AboutMe = () => {
  return (
    <main
      className={`backgroundImage backgroundImageDefault ${window.innerWidth > 700 ? "backgroundImageLarge" : ""}`}
      style={{
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: Hidden,        
        paddingTop: '120px',
        overflowY: "auto",
      }}
    >
      <div
        style={{
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "10px 0",
          overflow: Hidden,
        }}
      >
        <div className="mx-auto px-2 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Divvy
          </Link>
          <div className="flex items-center space-x-2">
            {renderButton(<AppsIcon />, "App", "/App/Home", "Go to App")}
            {renderButton(
              <SchoolIcon />,
              "Tutorial",
              "/App/Tutorial",
              "Tutorial"
            )}
            {renderButton(<PersonIcon />, "About", "/App/AboutMe", "About")}
            {renderButton(
              <ContactMailIcon />,
              "Contact",
              "/App/Contact",
              "Contact Me"
            )}
          </div>
        </div>
      </div>
      
      <Card
          sx={{
            maxWidth: 345,
            mb: 4,
            opacity: 0.9,
            borderRadius: "16px",
            boxShadow: 3,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            margin: "auto",
          }}
        >
      <CardContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Headshot"
            sx={{
              width: 150,
              height: 150,
              marginBottom: "16px",
            }}
            src={Headshot}
          />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "rgba(0, 0, 0, 0.87)",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
            }}
          >
            Divvy
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              color: "rgba(0, 0, 0, 0.7)",
              fontSize: "0.95rem",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            Welcome to Divvy, the financial management tool tailored to simplify
            your life. As an aspiring developer, I've recently completed
            GetCoding, a comprehensive coding bootcamp covering JavaScript,
            React, Node.js, CDK, and AWS services. Divvy is the culmination of
            my journey into the world of coding, merging my passion for
            technology with the aim of providing you with an effortless solution
            for managing your finances.
          </Typography>
        </div>
      </CardContent>
      </Card>
      <div className="flex justify-center mt-100 py-5">
        <footer className="relative bottom-0 w-50%">
          <div
            className="outro"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              textAlign: "center",
              padding: "10px",
              borderRadius: "20px",
            }}
          >
            <p>
              {
                "© Devin Ledwell | Developed with React, JSX, Node.js, and AWS  | Check out my "
              }
              <a
                className="font-bold"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/DevinLed"
                style={{ color: "#FFD700" }}
              >
                GitHub
              </a>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default AboutMe;
