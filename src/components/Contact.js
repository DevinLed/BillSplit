import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AppsIcon from "@mui/icons-material/Apps";
import SchoolIcon from "@mui/icons-material/School";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Tooltip from "@mui/material/Tooltip";
import Footer from "./Footer";
import { Resend } from "resend";
import { Hidden } from "@mui/material";
import "../LandingPage.css";
const resend = new Resend(process.env.REACT_APP_RESEND_API);

export function Contact() {
  console.log(process.env.REACT_APP_RESEND_API);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleSubmit = async (e) => {
    console.log("testing?", resend);
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await resend.emails.send({
        from: `${name} <${email}>`,
        to: ["devinledwell@gmail.com"],
        subject: "Support Inquiry",
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
      });

      if (error) {
        throw new Error(`Failed to send email: ${error}`);
      }

      // Reset form fields
      setName("");
      setEmail("");
      setMessage("");
      setSubmitting(false);
      setSubmissionError(null);
      alert("Your message has been sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmissionError("Failed to send email. Please try again later.");
      setSubmitting(false);
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
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-5">
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
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-center mt-100" >
        <footer className="fixed bottom-0 w-50%">
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
