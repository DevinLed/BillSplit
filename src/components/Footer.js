import React from "react";
import "../darkMode.css";
import "../index.css";

export default function Footer() {
  return (
    <>
      <div className="flex justify-center mt-5">
        <footer className="fixed bottom-0 w-full thank">
          <div className="outro">
            <div>
              <p>
                App created by Devin for Get Coding | Created using React and
                JSX | Check out my{" "}
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
