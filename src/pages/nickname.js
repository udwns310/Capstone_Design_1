import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Nickname(props) {
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
    <div className={"nickname start " + fade}>
      <Row>
        <Col xs={1} md={3}></Col>
        <Col xs={10} md={6}>
          <Card body style={{ marginTop: "10rem", borderRadius: "10px" }}>
            <h4>닉네임을 설정하세요</h4>
            <FloatingLabel
              controlId="floatingTextarea"
              label="닉네임"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="Set your nickname" />
            </FloatingLabel>
            <Button variant="outline-warning">다음</Button>{" "}
          </Card>
        </Col>
        <Col xs={1} md={3}></Col>
      </Row>
    </div>
  );
}
export default Nickname;
