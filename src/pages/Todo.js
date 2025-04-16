import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import "../styles/Todo.css";
import "../App.css";

function Todo() {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("todoItems");
    return storedItems
      ? JSON.parse(storedItems)
      : [{ text: "item 1", done: false }];
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, { text: inputValue, done: false }]);
      setInputValue("");
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleToggleDone = (index) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setItems(newItems);
  };

  return (
    <>
      <Layout page="To Do List">
        <div className="addcontainer flex flex-col">
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
          <div className="warning">
            <p>* items will be saved in your browser *</p>
          </div>
        </div>

        <div>
          <ul id="todoList">
            {items.map((item, index) => (
              <li
                key={index}
                className={`p-2 text-xl cursor-pointer flex items-center justify-between`}
                onClick={() => handleToggleDone(index)}
              >
                <span
                  className={`${item.done ? "line-through text-gray-500" : ""}`}
                >
                  {item.text}
                </span>
                <span
                  className="close"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveItem(index);
                  }}
                >
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
