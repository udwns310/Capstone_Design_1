import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:3002/chat');

    socket.on('join', () => {
      console.log("pass");
    })
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    // 클라이언트가 현재 속한 방에 메시지를 보냄
    const socket = io('http://localhost:3002/chat');
    socket.emit('sendMessage', newMessage);

    // 입력한 메시지를 현재 메시지 목록에 추가
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setNewMessage(''); // 입력 필드 초기화
  };

  return (
    <div>
      <div>
        <h2>Users in the room:</h2>
      </div>
      <div>
        <h2>Chat Room</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
