import React, { useState, useEffect } from "react";
import LoginForm from "../components/loginform";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Login = () => {
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
  const handleSubmit = (e) => {
    const requestOptions = {
      // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
      method: "POST", // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다.
      headers: {
        "Content-Type": "application/json",
      }, // json형태의 데이터를 서버로 보냅니다.
      body: JSON.stringify({
        // 이 body에 해당하는 데이터를 서버가 받아서 처리합니다.
        email: email,
        password: password,
      }),
    };
    console.log(requestOptions);
    fetch("/api/info_check", requestOptions)
      .then((res) => res.json()) // Result를 JSON으로 받습니다.
      .then((res) => {
        console.log(res); // 결과를 console창에 표시합니다.
      });
  };

  return (
    <div className={"login start " + fade}>
      <Row>
        <Col xs={1} md={3}></Col>
        <Col xs={10} md={6}>
          <Card body style={{ marginTop: "1rem", borderRadius: "10px" }}>
            <h3>DongCar</h3>
            <h5>Taxi Sharing Service</h5>
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
    </div>
  );
};
export default Login;
