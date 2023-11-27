import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyModal from "../components/modal";
import { useNavigate } from "react-router-dom";

function Sign_up() {
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [title_message, setTitleMsg] = useState("회원가입 실패");
  const [error_message, setErrMsg] = useState("정확한 정보를 입력해 주세요");
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    if (isRegister === true) {
      navigate("/nickname");
    } else setShowModal(false);
  };

  let navigate = useNavigate();

  let [fade2, setFade2] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade2("end");
    }, 1000);
    return () => {
      setFade2("");
    };
  }, []);

  // 각 입력값을 저장할 상태 정의
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentId, setStudentId] = useState("");

  // 각 입력값이 변경될 때 호출될 이벤트 핸들러 함수 정의
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handlePhoneNumberChange = (e) => {
    // 최대 길이를 11로 설정
    const maxLength = 13;
    const formattedPhoneNumber = autoHyphen(e.target.value.slice(0, maxLength));
    setPhoneNumber(formattedPhoneNumber);
  };
  const handleStudentIdChange = (e) => setStudentId(e.target.value);

  // 폼 제출 시 실행될 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 전화번호 유효성 검사
    if (!validatePhoneNumber(phoneNumber)) {
      setErrMsg("정확한 전화번호를 입력해 주세요.");
      handleShowModal();
      return;
    } else {
      const response = await axios.post("http://localhost:3002/register", {
        email: email,
        password: password,
        name: name,
        gender: gender,
        phoneNum: phoneNumber,
        stdId: studentId,
      });

      if (response.data.status === "success") {
        setTitleMsg("회원가입 성공");
        setErrMsg("가입이 완료되었습니다.");
        handleShowModal();
        setIsRegister(true);
      } else if (response.data.status === "emailDuplicate") {
        setErrMsg("중복된 이메일입니다.");
        handleShowModal();
      } else if (response.data.status === "stdIdDuplicate") {
        setErrMsg("이미 가입된 학번입니다.");
        handleShowModal();
      }
    }
  };

  // 전화번호 자동 하이픈 추가 함수
  const autoHyphen = (value) => {
    return value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
  };

  // 전화번호 유효성 검사 함수
  const validatePhoneNumber = (value) => {
    const phoneNumberRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
    return phoneNumberRegex.test(value);
  };

  return (
    <div className={"register start " + fade2}>
      <Row>
        <Col xs={1} md={3}></Col>
        <Col xs={10} md={6}>
          <Card body style={{ marginTop: "1rem", borderRadius: "10px" }}>
            <form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingInput"
                label="이메일"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={handleEmailChange}
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="비밀번호">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="이름"
                className="mb-4"
              >
                <Form.Control
                  type="name"
                  placeholder="홍길동"
                  onChange={handleNameChange}
                />
              </FloatingLabel>

              <Form>
                {["radio"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="남자"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      value="0"
                      onChange={handleGenderChange}
                    />
                    <Form.Check
                      inline
                      label="여자"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                      value="1"
                      onChange={handleGenderChange}
                    />
                  </div>
                ))}
              </Form>
              <FloatingLabel
                controlId="floatingInput"
                label="전화번호"
                className="mb-3"
              >
                <Form.Control
                  placeholder="010-0000-0000"
                  onChange={handlePhoneNumberChange}
                  value={phoneNumber}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="학번"
                className="mb-3"
              >
                <Form.Control
                  placeholder="20230000"
                  minLength="8"
                  maxLength="8"
                  onChange={handleStudentIdChange}
                />
              </FloatingLabel>
              <Button className="rgbtn" variant="outline-warning" type="submit">
                {" "}
                회원가입{" "}
              </Button>
            </form>
          </Card>
        </Col>
        <Col xs={1} md={3}></Col>
      </Row>
      <MyModal
        show={showModal}
        handleClose={handleCloseModal}
        title={title_message}
        message={error_message}
      />
    </div>
  );
}

export default Sign_up;
