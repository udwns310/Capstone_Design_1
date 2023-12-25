import { useState, useEffect } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import Security from "./security";
import Help from "./help";
import Account from "./account";
import Nav from "react-bootstrap/Nav";

function Management(props) {
  const navigate = useNavigate();
  const [mngHeader, setMngHeader] = useState('계정관리');
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

  const handleListButtonClick = (path, header) => {
    navigate(path);
    setMngHeader(header);
  };

  return (
    <div className={"management start " + fade}>
      <div id="mng-header">{mngHeader}</div>
      <Nav variant="tabs" defaultActiveKey="link-0">
        <Nav.Item onClick={() => handleListButtonClick("/main/management", "계정관리")}>
          <Nav.Link eventKey="link-0">
            계정 정보
          </Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => handleListButtonClick("/main/management/security", "보안")}>
          <Nav.Link eventKey="link-1">
            보안
          </Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => handleListButtonClick("/main/management/help", "고객센터")}>
          <Nav.Link eventKey="link-2">
            고객센터
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ height: "94vh" }}>
              <Account />
            </div>
          }
        ></Route>
        <Route
          path="/security"
          element={
            <div style={{ height: "94vh" }}>
              <Security />
            </div>
          }
        ></Route>
        <Route
          path="/help"
          element={
            <div style={{ height: "94vh" }}>
              <Help />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default Management;
