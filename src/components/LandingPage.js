import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AppsIcon from "@mui/icons-material/Apps";
import SchoolIcon from "@mui/icons-material/School";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Tooltip from "@mui/material/Tooltip";
import Footer from "./Footer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import naturebackground from "../img/naturebackground.jpeg";
import bignaturebackground from "../img/naturebackground.jpeg";
import divvylogo from "../img/divvylogo.png";
import Headshot from "../img/Headshot.png";
import "../LandingPage.css";
import { Hidden } from "@mui/material";
import downimg from "../img/downimg.png";
import Aboutme from "./Aboutme";
import splitPhone from "../img/splitPhone.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import Topbar from "./Topbar";
import { Button } from "@material-tailwind/react";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function LandingPage({ theme }) {
  const [index, setIndex] = useState(0);
  const [isIndexZero, setIsIndexZero] = useState(false);
  const handleDownArrowClick = () => {
    if (index !== 0) {
      setIndex(0);
      setIsIndexZero(true);
    } else {
      setIsIndexZero(false);
    }
  };
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

  const FeatureCards = () => (
    <>
      <div>
        <FeatureCard
          icon={<ReceiptIcon sx={{ fontSize: 40 }} />}
          title="Split Expenses"
          description="Simplify outings with friends and family by easily splitting any bill"
        />
      </div>

      <div>
        <FeatureCard
          icon={<BarChartIcon sx={{ fontSize: 40 }} />}
          title="Expense Tracking"
          description="Keep an eye on your finances by storing all expenses in one place."
        />
      </div>
    </>
  );

  const FeatureCard = ({ icon, title, description }) => (
    <Card
      sx={{
        width: "100%",
        boxShadow: 0,
        backgroundColor: "rgb(7, 30, 49)",
        color: "#FFFFFF",
        borderRadius: 0,
        display: "flex",
        padding: "10px",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: "bold",
            color: "#FFFFFF",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          {icon}
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            color: "#FFFFFF",
            fontSize: "0.95rem",
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
  return (
    <main style={{ minHeight: "120vh", backgroundColor: "rgb(7, 30, 49)" }}>
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
          zIndex: "2",
        }}
      >
        <Topbar />
      </div>

      <div
        style={{
          paddingTop: "60px",
          width: "100%",
          textAlign: "center",
          maxWidth: "550px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <img
          src={splitPhone}
          alt="Splitting a bill"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FeatureCards></FeatureCards>
          <div
            style={{
              marginTop: "25px",
            }}
          >
            <Link to="/App/Home" >
            <Button
              color="green"
              className="flex items-center gap-3 mb-3"
              style={{
                width: "fit-content",
                color: "#FFFFFF",
                padding: "10px 20px",
                borderRadius: "8px",
                fontSize: "1.2rem", 
              }}
            >
              <span className="text-center">Get Started!</span>
            </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-100">
        <footer
          className={
            theme === "dark" ? "bottom-0 w-50% fixed" : "fixed bottom-0 w-50%"
          }
        >
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
}
