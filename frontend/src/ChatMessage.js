
import React from "react";
import './ChatMessage.css'
const ChatMessage = ({ isSenderSide, message, time, userImage }) => {
  return (
    <li className={`message appeared ${isSenderSide ? "left" : "right"}`}>
            <img src={userImage} className="avatar" alt="User Avatar" />
            <div className="text_wrapper">
                <div className="text">{message}</div>
                <span className={`time ${isSenderSide ? "left" : "right"}`}>{time}</span>
            </div>
        </li>
  );
};

export default ChatMessage;