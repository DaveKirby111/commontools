import React from "react";
import "../../App.css";
import Nav from "../Nav";

const Layout = ({ children, page }) => {
  const heading = {
    textShadow: "2px 2px 2px black",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300">
        <div className="banner flex items-center w-full">
          <Nav />
        </div>
        <h1 className="text-center p-6" style={heading}>
          {page}
        </h1>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-gradient-to-l from-blue-700 via-blue-500 to-blue-300">
        <p>david kirby</p>
      </footer>
    </div>
  );
};

export default Layout;
