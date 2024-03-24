import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AppsIcon from "@mui/icons-material/Apps";
import SchoolIcon from "@mui/icons-material/School";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Tooltip from "@mui/material/Tooltip";
import Footer from "./Footer";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import naturebackground from "../img/naturebackground.jpeg";
import bignaturebackground from "../img/naturebackground.jpeg";
import divvylogo from "../img/divvylogo.png";
import SwipeableViews from "react-swipeable-views";
import Headshot from "../img/Headshot.png";
import "../LandingPage.css";
import { Hidden } from "@mui/material";
import downimg from "../img/downimg.png";

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

  const [visibleCards, setVisibleCards] = React.useState({
    splitExpenses: true,
    expenseTracking: true,
    settleUp: true,
  });

  const FeatureCards = () => (
    <SwipeableViews
      enableMouseEvents
      axis="y"
      resistance={true}
      index={index}
      onChangeIndex={(index) => setIndex(index)}
    >
      <div>
        <FeatureCard
          icon={<GroupIcon sx={{ fontSize: 40 }} />}
          title="Split Expenses"
          description="Simplify outings with friends by easily splitting any bill. Snap a photo or enter details manually and let Divvy do the math."
          onSwipe={() =>
            setVisibleCards({ ...visibleCards, splitExpenses: false })
          }
          isVisible={visibleCards.splitExpenses}
        />
      </div>

      <div>
        <FeatureCard
          icon={<AccountBalanceWalletIcon sx={{ fontSize: 40 }} />}
          title="Expense Tracking"
          description="Keep an eye on your finances by storing all shared and personal expenses in one intuitive place."
          onSwipe={() =>
            setVisibleCards({ ...visibleCards, expenseTracking: false })
          }
          isVisible={visibleCards.expenseTracking}
        />
      </div>

      <div>
        <FeatureCard
          icon={<SyncAltIcon sx={{ fontSize: 40 }} />}
          title="Settle Up With Ease"
          description="Effortlessly balance debts among friends, ensuring everyone pays their fair share with a simple tap."
          onSwipe={() => setVisibleCards({ ...visibleCards, settleUp: false })}
          isVisible={visibleCards.settleUp}
        />
      </div>
      <div>
        <Card
          sx={{
            maxWidth: 345,
            mb: 4,
            opacity: 0.9,
            borderRadius: "16px",
            boxShadow: 3,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <CardContent>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <Avatar
                  alt="Headshot"
                  sx={{
                    width: 150,
                    height: 150,
                    float: "left",
                    marginRight: "16px",
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
                  }}
                >
                  Divvy
                </Typography>
              </div>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  color: "rgba(0, 0, 0, 0.7)",
                  fontSize: "0.95rem",
                  clear: "both",
                }}
              >
                Welcome to Divvy, the financial management tool
                tailored to simplify your life. As an aspiring developer, I've
                recently completed GetCoding, a comprehensive coding bootcamp
                covering JavaScript, React, Node.js, CDK, and AWS services.
                Divvy is the culmination of my journey into the world of coding,
                merging my passion for technology with the aim of providing you
                with an effortless solution for managing your finances.
              </Typography>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-between items-center">
          <Card>
            <div
              className="pulseDown flex w-max"
              onClick={handleDownArrowClick}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "80%",
                width: "150px",
                height: "150px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
            >
              <img src={downimg} alt="Swipe down" className="downicon" />
            </div>
          </Card>
        </div>
      </div>
    </SwipeableViews>
  );

  const FeatureCard = ({ icon, title, description }) => (
    <Card
      sx={{
        maxWidth: 345,
        mb: 4,
        opacity: 0.9,
        borderRadius: "16px",
        boxShadow: 3,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
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
            color: "rgba(0, 0, 0, 0.87)",
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
            color: "rgba(0, 0, 0, 0.7)",
            fontSize: "0.95rem",
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
  return (
    <main
      className={`backgroundImage backgroundImageDefault ${window.innerWidth > 700 ? "backgroundImageLarge" : ""}`}
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
        <div className="mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Divvy
          </Link>
          <div className="flex items-center space-x-4">
            {renderButton(<AppsIcon />, "App", "/App/Home", "Go to App")}
            {renderButton(
              <SchoolIcon />,
              "Tutorial",
              "/App/Tutorial",
              "Tutorial"
            )}
            {renderButton(
              <ContactMailIcon />,
              "Contact",
              "/App/Contact",
              "Contact Me"
            )}
          </div>
        </div>
      </div>
      <div className="pt-20 p-4 max-w-3xl mx-auto ">
        <div
          style={{
            textAlign: "center",
            marginTop: "90px",
            marginBottom: "60px",
          }}
        >
          <Link to="/App/Home">
            <div
              className="pulseButton"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "80%",
                width: "150px",
                height: "150px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
            >
              <img
                src={divvylogo}
                alt="Go to App"
                style={{ width: "60px", height: "60px" }}
              />
            </div>
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FeatureCards></FeatureCards>
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
