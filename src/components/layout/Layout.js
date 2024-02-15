import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>office tools</h1>
      </header>

      <main>{children}</main>

      <footer>
        <p>david kirby</p>
      </footer>
    </div>
  );
};

export default Layout;
