import React from "react";
import "../darkMode.css";
import "../index.css";
import App from "../App";

export default function Footer({theme, lang,setLang}) {
  return (
    <>
      <div className="flex justify-center mt-5">
        <footer className={
              theme === "dark"
                ? "fixed bottom-0 w-full thank bg-gray-700": "fixed bottom-0 w-full thank bg-gray-100"}>
          <div className="outro">
            <div>
              <p>
              {lang === "english" ? "App created by Devin Ledwell for Get Coding | Created using React and JSX | Check out my " : "Cette application a été écrite par Devin Ledwell, pour Get Coding | Créé avec React et JSX | Consultez mon "}
                <a
                  className="font-italic mt-5"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/DevinLed"
                >
                  GitHub
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
