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
import PersonIcon from "@mui/icons-material/Person";
import Topbar from "./Topbar";

const resend = new Resend("re_L7XmvSAE_6VwFerFvPDYzxHZEcGoaYwaS");

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await emailjs.send(
        "service_2m7brig",
        "template_ja1ys8r",
        {
          name,
          email,
          message,
        },
        "ltHxgEMI-xVVtLImw"
      );

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setSubmitting(false);
      setShowPopup(true);
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

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "rgb(7, 30, 49)",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: Hidden,
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
          zIndex: "2",
        }}
      >
        <Topbar />
      </div>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-20">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-black">
            Support Inquiry
          </div>
          <p className="text-gray-700 text-base">
            Looking to reach me? Fill out the below information and I'll get
            back to you.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-6 pb-2">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-900 text-sm font-bold mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-900 text-sm font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-900 text-sm font-bold mb-2"
              >
                Message:
              </label>
              <textarea
                id="message"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 resize-none"
                placeholder="Your message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
            {showPopup && (
              <div className="popup">
                <p className="flex justify-center text-gray-700 text-base mt-3">
                  Email Sent!
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="flex justify-center mt-100 py-5">
        <footer className="bottom-0 w-50%">
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

export default Contact;
