import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { Routes, Route } from "react-router-dom";

function Help(props) {
  let [fade, setFade] = useState("");
  const [info, setInfo] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 500);
    return () => {
      setFade("");
    };
  }, []);

  return (
    <div className={"management start " + fade}>
      <div id="mng-header">고객센터</div>
      <Nav variant="tabs" defaultActiveKey="link-2">
        <Nav.Item>
          <Nav.Link href="/main/management" eventKey="link-0">
            계정 정보
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/main/management/security" eventKey="link-1">
            보안
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/main/management/help" eventKey="link-2">
            고객센터
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="mfont" style={{margin:"10px"}}>
        <h4>무엇을 도와드릴까요?</h4>
      </div>
    </div>
  );
}

export default Help;
