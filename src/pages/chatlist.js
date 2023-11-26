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
      const response = await axios.post("http://localhost:3002/chatlist", {});
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
              <div className="text">
                {el.origin} - {el.destination}
                <br></br>{el.formatDate}
              </div>
              <div className="count">{el.count} / 4</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Chatlist;
