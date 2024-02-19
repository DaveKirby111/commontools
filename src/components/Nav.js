import React from "react";
import { NavLink } from "react-router-dom";
import { links } from "./NavArray";

const active = ({ isActive }) => {
  return {
    color: isActive ? "red" : "blue",
  };
};

export default function Nav() {
  return (
    <nav className="capitalize">
      <ul className="flex">
        {links.map((link) => {
          return (
            <li className="p-1" id={link.id}>
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
