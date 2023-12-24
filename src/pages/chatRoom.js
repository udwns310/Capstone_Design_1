import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import axios from "axios";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const location = useLocation();
  const roomId = location.state?.roomId;
  const [socket, setSocket] = useState(() => io('http://localhost:3002/chat'));

  // 룸 연결, 메세지 수신
  useEffect(() => {
    // 컴포넌트가 마운트될 때 소켓에 이벤트 리스너 등록
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
    // 이미 생성한 소켓을 사용
    if (socket.connected) {
      socket.emit('clientSendMessage', { roomId, message: newMessage, senderNickname: nickname });
    }

    setMessages((prevMessages) => [...prevMessages, { message: newMessage, textAlign: 'right' }]);
    console.log("내가 보낸 채팅임" + socket.id);
    setNewMessage('');
  };


  return (
    <div>
      <div>
        <h2>Users in the room:</h2>
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
                height : '35px',
                margin: 'auto',
                marginTop: '3px',
                marginBottom: '3px',
                // border : '1px solid black',
                position: 'relative', // 부모로부터 상대적으로 위치 지정
              }}
            >
              <div
                style={{
                  position: 'absolute', // 상대적으로 위치 지정된 부모로부터 상대적으로 위치 지정
                  top: '-15px', // 상단에서 15px 위로 이동
                  fontSize: '12px', // 작은 글씨 크기
                  color: '#666', // 회색 글자색
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
      </div>
    </div>
  );
};

export default ChatRoom;
