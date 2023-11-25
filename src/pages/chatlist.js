import React, { useState, useEffect } from "react";

function Chatlist(props) {
  let [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 1000);
    return () => {
      setFade("");
    };
  }, []);

  return (
    <div className={"Chatlist start " + fade}>
      
      <div className="list">
        <h2 className="title">합승 목록</h2>
        <div className="component"><div className="text">동의대역 - 자대로터리<br></br>2023/11/26 13:00</div><div className="count">3 / 4</div></div>
        <div className="component"><div className="text">가야 1치안 - 수덕전<br></br>2023/11/26 13:00</div><div className="count">3 / 4</div></div>
        <div className="component"><div className="text">가야 1치안 - 행복기숙사<br></br>2023/11/26 13:00</div><div className="count">3 / 4</div></div>
        <div className="component"><div className="text">동의대역 - 본관<br></br>2023/11/26 13:00</div><div className="count">3 / 4</div></div>
        <div className="component"><div className="text">동의대역 - 자대로터리<br></br>2023/11/26 13:00</div><div className="count">3 / 4</div></div>
        <div className="component"><div className="text">가야 1치안 - 수덕전<br></br>2023/11/26 13:00</div><div className="count">3 / 4</div></div>
        <div className="component"><div className="text">가야 1치안 - 행복기숙사<br></br>2023/11/26 13:00</div><div className="count">3 / 4</div></div>
        <div className="component"><div className="text">동의대역 - 본관<br></br>2023/11/26 13:00</div><div className="count">3 / 4</div></div>
      </div>
    </div>
  );
}
export default Chatlist;
