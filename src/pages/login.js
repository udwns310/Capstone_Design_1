import React, { useState } from "react";
import LoginForm from "../components/loginform";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePwd = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // file + form field -> 짐을 싼다
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    console.log(formData);
    // 보내자
    axios
      .post("http://localhost:3000/fileUpload", formData)
      .then((res) => {
        console.log(res.data);
        alert("file upload success");
      })
      .catch(function (error) {
        alert("file upload fail");
      });
  };

  return (
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
  );
};
export default Login;
