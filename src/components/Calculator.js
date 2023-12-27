import React, { useState } from "react";
import Button from "./Button";
import "./Calculator.css";
import math from "mathjs";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (value === "=") {
      try {
        setResult(math.evaluate(input).toString());
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "sqrt") {
      setResult(math.sqrt(parseFloat(input)).toString());
    } else if (value === "^") {
      setInput(input + "**");
    } else {
      setInput(input + value);
    }
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    const validKeys = /[0-9+\-*/.=]|Enter|Escape|s|x/;
    if (validKeys.test(key)) {
      event.preventDefault();
      handleClick(
        key === "Enter" ? "=" : key === "s" ? "sqrt" : key === "x" ? "^" : key
      );
    }
  };

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
    "C",
    "sqrt",
    "^",
  ];

  return (
    <div className="calculator" tabIndex={0} onKeyDown={handleKeyPress}>
      <input
        type="text"
        className="calculator-screen"
        value={input}
        placeholder="Enter an expression"
        readOnly
      />
      <div className="calculator-buttons">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            value={btn}
            onClick={handleClick}
            className={`calculator-button ${
              isNaN(btn) && btn !== "=" ? "operator" : ""
            }`}
          />
        ))}
      </div>
      <div className="calculator-result">{result}</div>
    </div>
  );
};

export default Calculator;
