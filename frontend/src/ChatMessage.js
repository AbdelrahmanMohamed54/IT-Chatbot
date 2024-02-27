// ChatMessage.js

import React, { useEffect, useRef } from "react";
import "./ChatMessage.css";

const ChatMessage = ({ isSenderSide, message, time, userImage }) => {
  const messageRef = useRef();

  useEffect(() => {
    const scrollContainer = messageRef.current.parentElement;
    const isScrolledToBottom =
      scrollContainer.scrollHeight - scrollContainer.clientHeight <=
      scrollContainer.scrollTop + 1;

    // If already scrolled to the bottom, scroll to the new message
    if (isScrolledToBottom) {
      scrollToBottom();
    }

    // Add a scroll event listener to maintain scrolling at the bottom
    const handleScroll = () => {
      const isAtBottom =
        scrollContainer.scrollHeight - scrollContainer.clientHeight <=
        scrollContainer.scrollTop + 1;
      if (isAtBottom) {
        scrollToBottom();
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      // Remove the scroll event listener when component unmounts
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [message]);

  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formattedTime = time ? time.split(":").slice(0, 2).join(":") : "";

  return (
    <li className={`message appeared ${isSenderSide ? "right" : "left"}`}>
      <img src={userImage} className="avatar" alt="User Avatar" />
      <div className="text_wrapper">
        <div className="text" ref={messageRef}>
          {message}
        </div>
        <span className={`time ${isSenderSide ? "right" : "left"}`}>
          {formattedTime}
        </span>
      </div>
    </li>
  );
};

export default ChatMessage;
