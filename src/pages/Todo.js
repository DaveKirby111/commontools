import React from "react";
import "../App.css";
import Layout from "../components/layout/Layout";

export default function Todo() {
  return (
    <>
      <Layout>
        <div id="addToList">
          <input type="text" id="addItem" placeholder="Item..."></input>
          <button className="addBtn">Add</button>
        </div>

        <ul id="todoList">
          <li>item</li>
          <li>item</li>
          <li className="completed"></li>
        </ul>
      </Layout>
    </>
  );
}
