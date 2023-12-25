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

const Modal2 = ({
  show,
  handleClose,
  handleoOpenChat,
  title,
  origin,
  destination,
}) => {
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
      if (selectedTime === null) {
        alert("시간을 선택해 주세요.");
        return;
      }
      else {
        const response = await axios.post('http://localhost:3002/createchat', {
          origin: origin,
          destination: destination,
          time: dayjs(selectedTime).format("YYYY-MM-DD HH:mm:ss"),
          isUrgent: isUrgent
        })
        const roomId = response.data.id;
        const isFirst = "First";
        const socket = io.connect('http://localhost:3002/chat');

        socket.emit('sendId', roomId)
        socket.emit('join'); // 서버로 test 라는 이벤트와  roomId 데이터 전송

        navigate('/chatRoom', { state: { roomId, isFirst } });
      }
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
          <p>
            선택된 시간:{" "}
            {selectedTime.toLocaleTimeString("ko-KR", {
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
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

const ModalLogout = ({ show, handleClose }) => {
  let navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      navigate('/');
      const response = await axios.get('http://localhost:3002/logout');
    } catch (error) {
      console.error('에러 발생', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>로그아웃</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>정말 로그아웃 하시겠습니까?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleLogout}>
          확인
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ModalPriv = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>개인정보 이용 동의</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mainP">
          <div id="titleP">개인정보의 수집, 이용 안내</div>
          <br></br>
          <div>* 회원은 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며 동의를 거부할 경우, 서비스 이용이 제한됩니다. </div>
          <br></br>
          <div className="subt">수집하는 개인정보의 항목</div>
          <div className="subP">
            <div>동카(DongCar)는 회원가입, 합승 서비스 등 기본적인 서비스 제공을 위해 필요한 개인정보를 수집하고 있습니다.</div>
            <div>ο 수집 항목</div>
            <ul>
              <li>필수항목: 학번, 성명, 성별, 닉네임, 전화번호, 이메일 주소, 비밀번호</li>
              <li>선택 항목: 없음</li>
            </ul>
          </div>
          <div className="subt">개인정보의 수집 및 이용 목적</div>
          <div className="subP">
            <div>동카는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</div>
            <div>ο 서비스 제공에 관한 계약 이행</div>
            <div>택시 합승 서비스 제공, 그룹 채팅 서비스 제공, 악의적 행위에 대한 제재</div>
            <div>ο 회원 관리</div>
            <div>회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인</div>
          </div>
          <br></br>
          <div className="subt">개인정보의 보유 및 이용 기간</div>
          <div className="subP">
            <div>원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체없이 파기합니다.
              단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간동안 보존합니다.
            </div>
            <div>ο 내부 방침에 의한 정보 보유 사유</div>
            <ul>
              <li style={{ fontWeight: "bold" }}>탈퇴 회원 정보</li>
              <div>항목 : 학번, 성명, 성별, 전화번호, 이메일 주소</div>
              <div>보존 이유: 부정 이용 방지 및 수사 협조</div>
              <div>보존 기간: 1년</div>
              <li style={{ fontWeight: 'bold' }}>회원 정보</li>
              <div>항목 : 학번, 성명, 성별, 전화번호, 이메일 주소</div>
              <div>보존 이유: 서비스 이용의 혼선 방지</div>
              <div>보존 기간: 서비스 종료 시까지</div>
            </ul>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { MyModal, Modal2, ModalChat, ModalLogout, ModalPriv };
