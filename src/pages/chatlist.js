import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { MyModal } from '../components/modal';

function Chatlist() {
  let [fade, setFade] = useState("");
  const [list, setList] = useState([]);
  let navigate = useNavigate();
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [error_message, setErrMsg] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 1000);
    return () => {
      setFade("");
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("http://localhost:3002/chatlist", {}); // 목록 데이터 받아오기
      setList(response.data);
    };
    fetchData();
  }, []);

  const handleComponentClick = async (event, el) => {
    // 클릭 이벤트 핸들러 함수
    // const socket = io.connect('http://localhost:3002/chat');
    
    // socket.emit('sendId', el._id);
    // socket.emit('join'); // 서버로 test 라는 이벤트와  roomId 데이터 전송
    const response = await axios.post('http://localhost:3002/joinchat', {
      id: el._id
    });
    if (response.data.status === "full") {
      setErrMsg("채팅방 인원이 다 찼습니다.");
      handleShowModal();
    } else if(response.data.status === "alrJoin") {
      setErrMsg("이미 참여한 채팅방입니다.");
      handleShowModal();
    } else {
      navigate('/chatRoom', {state: { roomId: el._id }});
    }
  };

  return (
    <div className={"Chatlist start " + fade}>
      <div className="title">합승 목록</div>
      <div className="list">
        {list.map((el, index) => {
          return (
            <div className="component" onClick={(event) => handleComponentClick(event, el)}>
              {
                el.emergency === 1
                ? <img src="../../img/siren_icon.png" alt="My Image" className="siren"></img>
                : null
              }
              <div className="text">
                {el.origin} - {el.destination}
                <br></br>{el.formatDate}
              </div>
              {
                el.emergency === 1
                ? <div className="count2">{el.count} / 4</div>
                : <div className="count">{el.count} / 4</div>
              }
            </div>
          );
        })}
      </div>
      <MyModal
        show={showModal}
        handleClose={handleCloseModal}
        title={"입장 실패"}
        message={error_message}
      />
    </div>
  );
}

export default Chatlist;
