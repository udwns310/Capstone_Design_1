import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { MyModal } from "../components/modal";
import { useNavigate } from 'react-router-dom';


function Nickname() {
  let [fade, setFade] = useState("");
  const [nickname, setNickName] = useState("");
  const handleNickNameChange = (e) => setNickName(e.target.value);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 1000);
    return () => {
      setFade("");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3002/setNick", {
      nickname: nickname,
    });

    if (response.data.status === "success") {
      navigate("/main");
    } else {
      handleShowModal();
    }
  };

  return (
    <div className={"nickname start " + fade}>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col xs={1} md={3}></Col>
          <Col xs={10} md={6}>
            <Card body style={{ marginTop: "10rem", borderRadius: "10px" }}>
              <h4>닉네임을 설정하세요</h4>
              <FloatingLabel
                controlId="floatingTextarea"
                label="닉네임"
                className="mb-3"
                onChange={handleNickNameChange}
              >
                <Form.Control placeholder="Set your nickname" />
              </FloatingLabel>
              <Button className="lgbtn" variant="outline-warning" type="submit">
                다음
              </Button>{" "}
            </Card>
          </Col>
          <Col xs={1} md={3}></Col>
        </Row>
      </form>
      <MyModal
        show={showModal}
        handleClose={handleCloseModal}
        title="닉네임 중복"
        message="사용할 수 없는 닉네임입니다"
      />
    </div>
  );
}

export default Nickname;