import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import '../components/ChatContainer/ChatContainer.css';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const location = useLocation();
  const roomId = location.state?.roomId;
  const [socket, setSocket] = useState(() => io('http://localhost:3002/chat'));
  const messageEndRef = useRef(null);

  // 룸 연결, 메세지 수신
  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('join', roomId);
    });

    socket.on('serverSendMessage', (message, socketId, senderNickname) => {
      setMessages((prevMessages) => [...prevMessages, { message, senderNickname, isMyMessage: false }]);
    });

    return () => {
      socket.off('connect');
      socket.off('serverSendMessage');
    };
  }, [socket, roomId, newMessage]);
  // 룸 연결, 메세지 수신

  // 닉네임 가져오기
  useEffect(() => {
    const getNickname = async (e) => {
      try {
        const response = await axios.get('http://localhost:3002/getNickname');
        setNickname(response.data.nickname);
      } catch (error) {
        console.log(error);
      }
    }

    getNickname();
  }, []);
  // 닉네임 가져오기

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const sendMessage = () => {
    if (socket.connected) {
      socket.emit('clientSendMessage', { roomId, message: newMessage, senderNickname: nickname });
    }

    setMessages((prevMessages) => [...prevMessages, { message: newMessage, isMyMessage: true }]);
    setNewMessage('');
  };


  return (
    <div className="Container">
      <div className="system-message-container">
        <h2 className="system-message">Users in the room:</h2>
      </div>
      <div>
        <h2 className="system-message">Chat Room</h2>
        <div style={{ padding: '10px', height:'85vh', overflow:'scroll'}}>
          {messages.map(({ message, senderNickname, isMyMessage }, index) => (
            <div>
              <div
                style={{
                  top: '-15px',
                  fontSize: '12px',
                  color: '#666',
                }}
              >
                {senderNickname}
              </div>
              <div
                className="your-message"
                key={index}
                style={{
                  marginLeft: isMyMessage ? 'auto' : '0',
                  marginRight: isMyMessage ? '0' : 'auto',
                  marginBottom: isMyMessage ? '5px' : '0',
                  backgroundColor: isMyMessage ? '#f7e600' : 'white',
                }}
              >
                {message}
              </div>
            </div>
          ))}
          <div ref={messageEndRef}></div>
        </div>

        <div className="input-area" style={{height:'6vh'}}>
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
          <button onClick={(e) => { sendMessage(); setNewMessage('') }} type="submit" className="send-button">
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
