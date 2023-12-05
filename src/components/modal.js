// ModalComponent.jsx
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

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
  const [isUrgent, setIsUrgent] = useState(false);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSwitchChange = () => {
    setIsUrgent((isUrgent) => !isUrgent);
  };

  const handleOpenedChatRoom = async (e) => {
    console.log("출발지 : " + origin);
    console.log("목적지 : " + destination);
    console.log("선택된 시간 : " + selectedTime.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: 'numeric' }));
    console.log("긴급 설정 유무 : " + isUrgent);
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
        <Form.Check // prettier-ignore
          style={{ marginTop: '15px' }}
          type="switch"
          id="custom-switch"
          label="긴급으로 설정"
          checked = {isUrgent}
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