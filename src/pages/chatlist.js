import React, { useState, useEffect } from "react";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

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
        <div className="list_component">동의대역 - 자대로터리<div className="list_num">3 / 4</div></div>
        <div className="list_component">가야 1치안 - 수덕전<div className="list_num">1 / 4</div></div>
        <div className="list_component">가야 1치안 - 행복기숙사<div className="list_num">2 / 4</div></div>
        <div className="list_component">동의대역 - 본관<div className="list_num">1 / 4</div></div>
        <div className="list_component">동의대역 - 자대로터리<div className="list_num">3 / 4</div></div>
        <div className="list_component">가야 1치안 - 수덕전<div className="list_num">1 / 4</div></div>
        <div className="list_component">가야 1치안 - 행복기숙사<div className="list_num">2 / 4</div></div>
        <div className="list_component">동의대역 - 본관<div className="list_num">1 / 4</div></div>
        <div className="list_component">동의대역 - 자대로터리<div className="list_num">3 / 4</div></div>
        <div className="list_component">가야 1치안 - 수덕전<div className="list_num">1 / 4</div></div>
        <div className="list_component">가야 1치안 - 행복기숙사<div className="list_num">2 / 4</div></div>
        <div className="list_component">동의대역 - 본관<div className="list_num">1 / 4</div></div>
        <div className="list_component">동의대역 - 자대로터리<div className="list_num">3 / 4</div></div>
        <div className="list_component">가야 1치안 - 수덕전<div className="list_num">1 / 4</div></div>
        <div className="list_component">가야 1치안 - 행복기숙사<div className="list_num">2 / 4</div></div>
        <div className="list_component">동의대역 - 본관<div className="list_num">1 / 4</div></div>
        <div className="list_component">동의대역 - 자대로터리<div className="list_num">3 / 4</div></div>
        <div className="list_component">가야 1치안 - 수덕전<div className="list_num">1 / 4</div></div>
        <div className="list_component">가야 1치안 - 행복기숙사<div className="list_num">2 / 4</div></div>
        <div className="list_component">동의대역 - 본관<div className="list_num">1 / 4</div></div>
        <div className="list_component">동의대역 - 자대로터리<div className="list_num">3 / 4</div></div>
        <div className="list_component">가야 1치안 - 수덕전<div className="list_num">1 / 4</div></div>
        <div className="list_component">가야 1치안 - 행복기숙사<div className="list_num">2 / 4</div></div>
        <div className="list_component">동의대역 - 본관<div className="list_num">1 / 4</div></div>
      </div>
    </div>
  );
}
export default Chatlist;
