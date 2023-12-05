import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from "axios";

const socket = io('http://localhost:3002');

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit('chat message', message);
    setMessage('');
  };

  useEffect(() => {
    const response = axios.post("http://localhost:3002/chat"); 
  });

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;