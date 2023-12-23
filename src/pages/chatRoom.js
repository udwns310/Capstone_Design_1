import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import '../components/ChatContainer/ChatContainer.css';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const location = useLocation();
  const roomId = location.state?.roomId;

  useEffect(() => {
    const socket = io('http://localhost:3002/chat');

    socket.on('connect', () => {
      socket.emit('join', roomId);
    });

    socket.on('serverSendMessage', (message) => {
      if (message !== newMessage) {
        setMessages((prevMessages) => [...prevMessages, message]);
        console.log("다른 놈이 보낸 채팅임");
      }
      setNewMessage(''); // 입력 필드 초기화
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, newMessage]);

  const sendMessage = () => {
    const socket = io('http://localhost:3002/chat');
    // 클라이언트가 현재 속한 방에 메시지를 보냄
    socket.on('connect', () => {
      // console.log(socketId);
      socket.emit('clientSendMessage', { roomId, message: newMessage });
    })
    // 입력한 메시지를 현재 메시지 목록에 추가
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    console.log("내가 보낸 채팅임");
  };


  return (
    <div className="Container">
      <div className="system-message-container">
        <h2 className="system-message">Users in the room:</h2>
      </div>
      <div >
        <h2 className="system-message">Chat Room</h2>
        <ul >
          {messages.map((message, index) => (
            <li className="your-message" key={index}>{message}</li>
          ))}
        </ul>
        <div className="input-area">
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
        <button onClick={(e)=>{sendMessage(); setNewMessage('')}} type="submit" className="send-button">
          전송
        </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;