import React from "react";
import "../darkMode.css";
import "../index.css";

export default function Footer({theme, lang,setLang}) {
  return (
    <>
      <div className="flex justify-center mt-100">
        <footer className={
              theme === "dark"
                ? "fixed bottom-0 w-full thank bg-gray-700": "fixed bottom-0 w-full thank bg-gray-100"}>
          <div className="outro">
            <div>
              <p>
              {lang === "french" ? "© Devin Ledwell | Créé avec React, JSX, Node.js, et AWS | Consultez mon ": "© Devin Ledwell | Developed with React, JSX, Node.js, and AWS  | Check out my " }
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
