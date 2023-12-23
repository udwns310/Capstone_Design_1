import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Mychat() {
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
      const response = await axios.post("http://localhost:3002/mychat", {}); // 목록 데이터 받아오기
      setList(response.data);
    };
    fetchData();
  }, []);

  const handleComponentClick = (event, el) => {
    navigate('/chatRoom', {state: { roomId: el._id }});
  };

  return (
    <div className={"Chatlist start " + fade}>
      <div className="title">합승 목록</div>
      <div className="list">
        {list.map((el, index) => {
          return (
            <div className="component" onClick={(event) => 
            handleComponentClick(event, el)}>
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

export default Mychat;
