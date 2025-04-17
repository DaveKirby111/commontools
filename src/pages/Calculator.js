import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import "../styles/Calculator.css"; // We'll adjust this

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performOperation(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performOperation = (operand1, operand2, operation) => {
    switch (operation) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "*":
        return operand1 * operand2;
      case "/":
        return operand1 / operand2;
      default:
        return operand2;
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const deleteLastDigit = () => {
    setDisplay((prevDisplay) => {
      if (prevDisplay.length === 1) {
        return "0";
      }
      return prevDisplay.slice(0, -1);
    });
  };

  const handleEquals = () => {
    if (operator && !waitingForSecondOperand) {
      const secondOperand = parseFloat(display);
      const result = performOperation(firstOperand, secondOperand, operator);
      setDisplay(String(result));
      setFirstOperand(result);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  const handlePercentage = () => {
    setDisplay(String(parseFloat(display) / 100));
    setWaitingForSecondOperand(true);
  };

  // const handleSignToggle = () => {
  //   setDisplay(String(parseFloat(display) * -1));
  // };

  return (
    <Layout page="Calculator">
      <div
        className="
      calculator-container  
      p-2"
      >
        <div
          className="
          mx-auto
          my-8
          p-4
          rounded-md
          shadow-lg
          bg-gray-600
          max-w-md
          md:max-w-sm
          lg:max-w-xs
        "
        >
          <div
            className="
            bg-gray-800
            text-white
            text-right
            p-4
            rounded-t-md
            text-2xl
            overflow-hidden
            whitespace-nowrap
            font-mono
            mb-5
          "
          >
            {display}
          </div>
          <div
            className="
        grid 
        grid-cols-4 
        gap-2 p-4 
        bg-gray-600 
        rounded-b-md 
        border-2 
        border-black 
        rounded-md"
          >
            <button
              className="
              bg-gray-300
              hover:bg-gray-400
              text-gray-800
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={clearDisplay}
            >
              AC
            </button>
            <button
              className="
              bg-gray-300
              hover:bg-gray-400
              text-gray-800
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={deleteLastDigit}
            >
              DEL
            </button>
            <button
              className="
              bg-gray-300
              hover:bg-gray-400
              text-gray-800
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={handlePercentage}
            >
              %
            </button>
            <button
              className="
              bg-orange-400
              hover:bg-orange-500
              text-white
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={() => handleOperator("/")}
            >
              /
            </button>

            <button
              className="
              bg-gray-100
              hover:bg-gray-300
              text-gray-800
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={() => inputDigit(7)}
            >
              7
            </button>
            <button
              className="
              bg-gray-100
              hover:bg-gray-300
              text-gray-800
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={() => inputDigit(8)}
            >
              8
            </button>
            <button
              className="
              bg-gray-100
              hover:bg-gray-300
              text-gray-800
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={() => inputDigit(9)}
            >
              9
            </button>
            <button
              className="
              bg-orange-400
              hover:bg-orange-500
              text-white
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={() => handleOperator("*")}
            >
              *
            </button>

            <button
              className="
              bg-gray-100
              hover:bg-gray-300
              text-gray-800
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={() => inputDigit(4)}
            >
              4
            </button>
            <button
              className="
              bg-gray-100
              hover:bg-gray-300
              text-gray-800
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={() => inputDigit(5)}
            >
              5
            </button>
            <button
              className="
              bg-gray-100
              hover:bg-gray-300
              text-gray-800
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={() => inputDigit(6)}
            >
              6
            </button>
            <button
              className="
              bg-orange-400
              hover:bg-orange-500
              text-white
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={() => handleOperator("-")}
            >
              -
            </button>

            <button
              className="
              bg-gray-100
              hover:bg-gray-300
              text-gray-800
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={() => inputDigit(1)}
            >
              1
            </button>
            <button
              className="
              bg-gray-100
              hover:bg-gray-300
              text-gray-800
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={() => inputDigit(2)}
            >
              2
            </button>
            <button
              className="
              bg-gray-100
              hover:bg-gray-300
              text-gray-800
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={() => inputDigit(3)}
            >
              3
            </button>
            <button
              className="
              bg-orange-400
              hover:bg-orange-500
              text-white
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={() => handleOperator("+")}
            >
              +
            </button>

            <button
              className="
              bg-gray-100
              hover:bg-gray-300
              text-gray-800
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
              col-span-2
            "
              onClick={() => inputDigit(0)}
            >
              0
            </button>
            <button
              className="
              bg-gray-100
              hover:bg-gray-300
              text-gray-800
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={inputDecimal}
            >
              .
            </button>
            <button
              className="
              bg-green-500
              hover:bg-green-600
              text-white
              font-bold
              py-3
              rounded-md
              shadow-sm
              transition
              duration-150
              ease-in-out
              focus:outline-none
            "
              onClick={handleEquals}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
