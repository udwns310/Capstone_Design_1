import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import '../components/ChatContainer/ChatContainer.css';
import dayjs from "dayjs";
// 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
// import { ModalRoomOut } from '../components/modal';
import dayjs from "dayjs";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const location = useLocation();
  const roomId = location.state?.roomId;
  const [socket, setSocket] = useState(() => io('http://localhost:3002/chat'));
  const messageEndRef = useRef(null);
  const [list, setList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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

    const response = axios.post('http://localhost:3002/storechat', {
      roomId,
      nickname,
      newMessage: newMessage,
      date: dayjs(Date().toLocaleString()).format("YYYY-MM-DD HH:mm:ss")
    });
  };

  const ModalRoomOut = ({ show, handleClose, title, roomId }) => {
    let navigate = useNavigate();
  
    const roomOut = () => {
      const response = axios.post('http://localhost:3002/roomout', {
        roomId
      });
      socket.emit('exit', roomId);
      navigate('/main');
    }
  
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>채팅방을 나가시면 MY채팅 목록에서 사라집니다.</p>
          <p>정말 나가시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={roomOut}>
            나가기
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("http://localhost:3002/loadchat", {
        roomId
      });
      setList(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="Container">
      <div className="system-message-container">
        <img src="../../img/icon-room-out.png" alt="My Image" 
          style={{width : '25px', height: '25px', position:'absolute', left:'10px'}}
          onClick={setShowModal}
        ></img>
        <h2 className="system-message">Users in the room:</h2>
      </div>
      <div>
        <h2 className="system-message">Chat Room</h2>
        <div style={{ padding: '10px', height:'85vh', overflow:'scroll'}}>
          {list.map((el, index) => {
            return (
              <div>
                {
                  nickname === el.nickname ? ''
                  : <div
                    style={{
                      top: '-15px',
                      fontSize: '12px',
                      color: '#666',
                    }}
                  >
                    {el.nickname}
                  </div>
                }
                <div
                  className="your-message"
                  key={index}
                  style={{
                    marginLeft: nickname === el.nickname ? 'auto' : '0',
                    marginRight: nickname === el.nickname ? '0' : 'auto',
                    marginBottom: nickname === el.nickname ? '5px' : '0',
                    backgroundColor: nickname === el.nickname ? '#f7e600' : 'white',
                  }}
                >
                  {el.message}
                </div>
              </div>
            );
          })}
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
      <ModalRoomOut
        show={showModal}
        handleClose={handleCloseModal}
        title="채팅방 나가기"
        roomId={roomId}
      />
    </div>
  );
};

export default ChatRoom;