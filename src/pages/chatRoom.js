import React, { useState, useEffect } from 'react';
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

  // 룸 연결, 메세지 수신
  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('join', roomId);
    });

    socket.on('serverSendMessage', (message, socketId, senderNickname) => {
      const textAlign = socketId === socket.id ? 'right' : 'left';
      setMessages((prevMessages) => [...prevMessages, { message, textAlign, senderNickname }]);
      console.log("다른 놈이 보낸 채팅임" + socketId);
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


  const sendMessage = () => {
    if (socket.connected) {
      socket.emit('clientSendMessage', { roomId, message: newMessage, senderNickname: nickname });
    }

    setMessages((prevMessages) => [...prevMessages, { message: newMessage, textAlign: 'right' }]);
    console.log("내가 보낸 채팅임" + socket.id);
    setNewMessage('');
  };


  return (
    <div className="Container">
      <div className="system-message-container">
        <h2 className="system-message">Users in the room:</h2>
      </div>
      <div>
        <h2>Chat Room</h2>
        <div>
          {messages.map(({ message, textAlign, senderNickname }, index) => (
            <div
              key={index}
              style={{
                textAlign,
                margin: '5px',
                width: '80%',
                height: '35px',
                margin: 'auto',
                marginTop: '3px',
                marginBottom: '3px',
                // border : '1px solid black',
                position: 'relative', 
              }}
            >
              <div
                style={{
                  position: 'absolute', 
                  top: '-15px', 
                  fontSize: '12px', 
                  color: '#666',
                }}
              >
                {senderNickname}
              </div>
              {message}
            </div>
          ))}
        </div>
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
  );
};

export default ChatRoom;
