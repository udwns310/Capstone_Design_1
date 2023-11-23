import React, { useState, useEffect } from "react";
import LoginForm from "../components/loginform";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import MyModal from '../components/modal';
axios.defaults.withCredentials = true;

const Login = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  let [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 1000);
    return () => {
      setFade("");
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePwd = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/login", {
        email: email,
        password: password,
      });
      if (response.data.status === "success") {
        console.log("로그인 성공");
      }
      else {
        handleShowModal();
      }
    } catch (error) {
      console.error("에러 발생", error);
    }
  };

  const handleLogout = async (e) => {
    try {
      const response = await axios.get("http://localhost:3002/logout");
      console.log(response.data);
    } catch (error) {
      console.error("에러 발생", error);
    }
  };

  const handleSessionConfirm = async (e) => {
    try {
      const response = await axios.get("http://localhost:3002/confirm")
      console.log(response.data);
    } catch (error) {
      console.error("에러 발생", error);
    }
  };
  

  return (
    <div className={"login start " + fade}>
      <Row>
        <Col xs={1} md={3}></Col>
        <Col xs={10} md={6}>
          <Card body style={{ marginTop: "1rem", borderRadius: "10px" }}>
            <h3>로그인</h3>
            {/* <h5>Taxi Sharing Service</h5> */}
            <LoginForm
              email={email}
              password={password}
              handleEmail={handleEmail}
              handlePwd={handlePwd}
              handleSubmit={handleSubmit}
            />
          </Card>
        </Col>
        <Col xs={1} md={3}></Col>
      </Row>
      <MyModal show={showModal} handleClose={handleCloseModal} title="로그인 실패" message = "이메일 또는 비밀번호를 확인해주세요"/>
      <button onClick={handleLogout}>로그아웃 버튼(세션 삭제)</button>
      <button onClick={handleSessionConfirm}>세션 유무 버튼 </button>
    </div>
  );
};
export default Login;
