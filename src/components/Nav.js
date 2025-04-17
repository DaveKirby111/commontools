import React from "react";
import { NavLink, Link } from "react-router-dom";
import { links } from "./NavArray";
import "../styles/Nav.css";
import logo from "../images/MyTools.png";
import logo2 from "../images/MyTools2.png";
import { useState } from "react";

const active = ({ isActive }) => {
  return {
    // color: isActive ? "red" : "",
    textDecoration: isActive ? "underline" : "",
  };
};

export default function Nav() {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <nav className="capitalize flex flex-col md:flex-row items-center w-full">
      <Link
        to="/"
        className="ml-4"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <img
          src={isHovering ? logo2 : logo}
          alt="logo"
          height={"100px"}
          width={"200px"}
        />
      </Link>
      <ul className="flex flex-col md:flex-row mx-auto">
        {links.map((link) => {
          return (
            <li className="p-1 text-2xl" id={link.id} key={link.id}>
              <NavLink to={link.url} style={active}>
                {link.page}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
