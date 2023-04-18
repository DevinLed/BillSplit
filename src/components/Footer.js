import React from "react";
import "../darkMode.css";
import "../index.css";

export default function Footer() {
  return (
    <>
      <div className="flex justify-center">
  <footer className="fixed bottom-0 w-full">
    <div className="outro">
      <div className="thank">
        <p>
          App created by Devin for Get Coding | Created using React and JSX | Check out my{" "}
          <a className="font-italic mt-5" target="_blank" href="https://github.com/DevinLed">
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
