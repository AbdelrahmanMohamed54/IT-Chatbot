import React, { useState, useEffect, useRef } from "react";
import "./InputField.css";

function InputField({ onMessageSend }) {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    sendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (inputText.trim() === "") return; // If the text is empty or contains only whitespace, return without sending a message

    onMessageSend(inputText);
    setInputText("");
  };

  return (
      <div className="input-container">
        <div className="input-group">
        <textarea
            name=""
            className="form-control type_msg"
            placeholder="Type your message..."
            value={inputText}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            ref={inputRef}
        ></textarea>
          <div className="input-group-append">
          <span className="input-group-text send_btn" onClick={handleSubmit}>
            <i className="fas fa-location-arrow"></i>
          </span>
          </div>
        </div>
      </div>
  );
}

export default InputField;