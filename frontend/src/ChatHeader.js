import React from 'react';
import './ChatHeader.css';

const ChatHeader = () => {
  return (
    <div className="card-header msg_head">
      <div className="d-flex bd-highlight">
        <div className="img_cont">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/2048px-BMW_logo_%28gray%29.svg.png"
            className="rounded-circle user_img"
            alt="User"
          />
          <span className="online_icon"></span>
        </div>
        <div className="user_info">
          <span style={{ color: 'white', fontSize: 35 }}>BMW Chatbot</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
