import React from "react";

import Nav from "../Nav";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>office tools</h1>
      </header>

      <Nav />

      <main>{children}</main>

      <footer>
        <p>david kirby</p>
      </footer>
    </div>
  );
};

export default Layout;
