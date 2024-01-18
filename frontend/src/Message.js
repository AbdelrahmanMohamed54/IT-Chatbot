import React, { useState, useEffect, useCallback } from "react";
import "./Message.css";
import InputField from "./InputField";
import ChatMessage from "./ChatMessage";
import SocketIO from "socket.io-client";

const socket = SocketIO.io("http://localhost:8000");

const Message = () => {
  const [messages, setMessages] = useState([{text: "Hi, I am the BMW chatbot. " +
        "I am designed to help you choose the most suitable BMW car based on your requirements and check your requested model's availability. " +
        "In addition to supplying you with extensive information about all the BMW car models available at our showroom." + " Greet me by saying Hi ;)"
    , isSent:false,userImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/2048px-BMW_logo_%28gray%29.svg.png"},
  ]);

  console.log(messages);

  useEffect(() => {
    // Load conversation history from local storage
    const storedMessages = localStorage.getItem("chatHistory");

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    // Save conversation history to local storage whenever it changes
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const onReceiveMessage = useCallback((message) => {
    const newMessage = {
      text: typeof message === 'string' ? message : message.answer,
      isSent: false,
      userImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/2048px-BMW_logo_%28gray%29.svg.png",
      time: getCurrentTime(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    scrollToBottom();
  }, []);

  const onConnect = useCallback(() => {
    console.log("CONNECTED");
  }, [])

  useEffect(() => {
    socket.on("connect", onConnect);

    socket.on("message", onReceiveMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('message', onReceiveMessage)
    }
  }, [onConnect, onReceiveMessage]);

  const handleMessageSend = (text) => {
    if (text.trim() === "") return;

    const newMessage = {
      text,
      isSenderSide: true,
      userImage:
        "https://th.bing.com/th/id/R.6748c227082eb17f9344ea3919acc1b0?rik=Qdx6DA5415kilQ&pid=ImgRaw&r=0",
      time: getCurrentTime(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    scrollToBottom();

    // Emit a chatMessage event to the server
    socket.emit("message", text);
  };

  const scrollToBottom = () => {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  };

  const getCurrentTime = () => {
    const currentTime = new Date();
    return currentTime.toLocaleTimeString();
  };

  return (
    <>
      <div className="card-body msg_card_body" id="chat-window">
        <ul className="messages">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              isSenderSide={message.isSenderSide}
              message={message.text}
              time={message.time}
              userImage={message.userImage}
            />
          ))}
        </ul>
      </div>
      <InputField onMessageSend={handleMessageSend} />
    </>
  );
};

export default Message;
