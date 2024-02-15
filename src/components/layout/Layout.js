import React from "react";
import "../../App.css";

import Nav from "../Nav";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <h1>common tools</h1>
      </header>

      <Nav />

      <main className="flex-1">{children}</main>

      <footer>
        <p>david kirby</p>
      </footer>
    </div>
  );
};

export default Layout;
