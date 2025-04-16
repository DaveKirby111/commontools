import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import "../styles/Calculator.css";

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

  const handleSignToggle = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const calc = {
    boxShadow: "7px 7px 7px gray",
  };

  return (
    <Layout page="Calculator">
      <div className="calculator" style={calc}>
        <div className="display">{display}</div>
        <div className="buttons grid grid-cols-4 gap-2">
          <button className="button1" onClick={clearDisplay}>
            AC
          </button>
          <button className="button1" onClick={deleteLastDigit}>
            DEL
          </button>
          <button className="button1" onClick={handlePercentage}>
            %
          </button>
          <button className="button2" onClick={() => handleOperator("/")}>
            /
          </button>

          <button className="button3" onClick={() => inputDigit(7)}>
            7
          </button>
          <button className="button3" onClick={() => inputDigit(8)}>
            8
          </button>
          <button className="button3" onClick={() => inputDigit(9)}>
            9
          </button>
          <button className="button2" onClick={() => handleOperator("*")}>
            *
          </button>

          <button className="button3" onClick={() => inputDigit(4)}>
            4
          </button>
          <button className="button3" onClick={() => inputDigit(5)}>
            5
          </button>
          <button className="button3" onClick={() => inputDigit(6)}>
            6
          </button>
          <button className="button2" onClick={() => handleOperator("-")}>
            -
          </button>

          <button className="button3" onClick={() => inputDigit(1)}>
            1
          </button>
          <button className="button3" onClick={() => inputDigit(2)}>
            2
          </button>
          <button className="button3" onClick={() => inputDigit(3)}>
            3
          </button>
          <button className="button2" onClick={() => handleOperator("+")}>
            +
          </button>

          <button className="button4" onClick={() => inputDigit(0)}>
            0
          </button>
          <button className="button3" onClick={inputDecimal}>
            .
          </button>
          <button className="button5" onClick={handleEquals}>
            =
          </button>
        </div>
      </div>
    </Layout>
  );
}
