import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import "../styles/Todo.css";
import "../App.css";

function Todo() {
  const [items, setItems] = useState(["item 1", "item 2"]);
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1); // Remove the item at the given index
    setItems(newItems);
  };

  return (
    <>
      <Layout>
        <div id="addToList">
          <input
            type="text"
            id="addItem"
            placeholder="Item..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="addBtn" onClick={handleAddItem}>
            Add
          </button>
        </div>

        <div>
          <ul id="todoList">
            {items.map((item, index) => (
              <li key={index}>
                {item}
                <span className="close" onClick={() => handleRemoveItem(index)}>
                  {"\u00D7"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    </>
  );
}

export default Todo;
