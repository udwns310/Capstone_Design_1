import React, { useState, useEffect } from "react";
import axios from "axios";

function Chatlist() {
  let [fade, setFade] = useState("");
  const [list, setList] = useState([]);

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

  return (
    <div className={"Chatlist start " + fade}>
      <div className="list">
        <h2 className="title">합승 목록</h2>
        {list.map((el, index) => {
          return (
            <div className="component">
              {
                el.emergency === 1
                ? <img src="img/siren_icon.png" alt="My Image" className="siren"></img>
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
