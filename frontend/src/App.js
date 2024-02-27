
import React, { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
//import ChatMessage from './ChatMessage';
//import InputField from './InputField';
import Message from './Message';

import './App.css'; // Import the CSS file

const App = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className=""
        // style={{ minWidth: '300px', maxWidth: '800px' }}
        >
          <div className="card"
          // style={{ height: Math.min(800, windowHeight - 60) }}
          >
            <ChatHeader />
            <Message/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
