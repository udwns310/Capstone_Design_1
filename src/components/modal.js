// ModalComponent.jsx
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import dayjs from "dayjs";
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const MyModal = ({ show, handleClose, title, message }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Modal2 = ({ show, handleClose, handleoOpenChat, title, origin, destination }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>출발지 - {origin}</p>
        <p>목적지 - {destination}</p>
        <p>채팅방을 개설하시겠습니까?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleoOpenChat}>
          채팅방 개설
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ModalChat = ({ show, handleClose, title, origin, destination }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [isUrgent, setIsUrgent] = useState(0);
  const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
  let navigate = useNavigate();


  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSwitchChange = () => {
    setIsUrgent((isUrgent) => (isUrgent + 1) % 2);
  };

  const handleOpenedChatRoom = async (e) => {
    try {
      const response = await axios.post('http://localhost:3002/createchat', {
        origin: origin,
        destination: destination,
        time: dayjs(selectedTime).format("YYYY-MM-DD HH:mm:ss"),
        isUrgent: isUrgent
      })
      const roomId = response.data.id;

      const socket = io.connect('http://localhost:3002/chat');
      socket.emit('sendId',roomId )
      socket.emit('join'); // 서버로 test 라는 이벤트와  roomId 데이터 전송
      navigate('/chatRoom');

      // socket.on('event_name', () => { // 서버에서 event_name 이벤트를 받음
      //   console.log('message from client'); // 안에 내용 실행됨
      // })
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>출발지 - {origin}</p>
        <p>목적지 - {destination}</p>
        {selectedTime && (
          <p>선택된 시간: {selectedTime.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: 'numeric' })}</p>
        )}
        <DatePicker
          selected={selectedTime}
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={5}
          timeCaption="시간"
          dateFormat="h:mm aa"
          placeholderText="시간을 선택하세요"
        />
        <Form.Check
          style={{ marginTop: '15px' }}
          type="switch"
          id="custom-switch"
          label="긴급으로 설정"
          checked={isUrgent}
          onChange={handleSwitchChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleOpenedChatRoom}>
          채팅방 개설
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { MyModal, Modal2, ModalChat };
