import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

function Security(props) {
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
      <div id="mng-header">보안</div>
      <Nav variant="tabs" defaultActiveKey="link-1">
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

      <div className="mfont"> 비밀번호 변경 </div>
      <div style={{ paddingTop: "10px" }}>
        <Form.Control type="password" placeholder="기존 비밀번호 입력" />
      </div>
      <div style={{ paddingTop: "10px" }}>
        <Form.Control type="password" placeholder="새 비밀번호" />
      </div>
      <div style={{ paddingTop: "10px" }}>
        <Form.Control type="password" placeholder="새 비밀번호 확인" />
      </div>

      <Button className="lgbtn" variant="outline-warning" type="submit">
        저장
      </Button>
    </div>
  );
}

export default Security;
