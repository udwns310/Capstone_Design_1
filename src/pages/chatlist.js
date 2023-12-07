import React, { useState, useEffect } from "react";
import axios from "axios";
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

function Chatlist() {
  let [fade, setFade] = useState("");
  const [list, setList] = useState([]);
  let navigate = useNavigate();

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

  const handleComponentClick = (event, el) => {
    // 클릭 이벤트 핸들러 함수
    const socket = io.connect('http://localhost:3002/chat');
    
    socket.emit('sendId', el._id);
    socket.emit('join'); // 서버로 test 라는 이벤트와  roomId 데이터 전송
    navigate('/chatRoom');
  };

  return (
    <div className={"Chatlist start " + fade}>
      <div className="list">
        <h2 className="title">합승 목록</h2>
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
    </div>
  );
}

export default Chatlist;
