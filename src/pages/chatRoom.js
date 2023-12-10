import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const location = useLocation();
  const roomId = location.state?.roomId;
  const [clientSocketId, setSocketId] = useState('');
  const [isConnect, setIsConnect] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:3002/chat');

    if(!isConnect){
      socket.on('connect', () => {
        console.log("connect room " + roomId);
        socket.emit('join', roomId);
        setSocketId(socket.id);
        setIsConnect(true);
      });
    }
    socket.on('serverSendMessage', (message) => {
      // 서버에서 받은 메시지와 현재 입력한 메시지를 비교하여 같지 않으면 추가
      if (message !== newMessage) {
        setMessages((prevMessages) => [...prevMessages, message]);
        console.log("다른 놈이 보낸 채팅임");
      }
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, [roomId, newMessage]);

  const sendMessage = () => {
    const socket = io('http://localhost:3002/chat');
    // 클라이언트가 현재 속한 방에 메시지를 보냄
    socket.on('connect', () => {
      // console.log(socketId);
      socket.emit('clientSendMessage', { clientSocketId, roomId, message: newMessage });
    })
    // 입력한 메시지를 현재 메시지 목록에 추가
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    console.log("내가 보낸 채팅임");
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