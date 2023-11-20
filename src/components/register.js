import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";

function Sign_up() {
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
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleStudentIdChange = (e) => setStudentId(e.target.value);

  // 폼 제출 시 실행될 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/text", {
      data: [email, password, name, gender, phoneNumber, studentId],
    });

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Name:", name);
    console.log("Gender:", gender);
    console.log("Phone Number:", phoneNumber);
    console.log("Student ID:", studentId);
  };

  return (
    <div className={"register start " + fade2}>
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

        <FloatingLabel controlId="floatingInput" label="이름" className="mb-4">
          <Form.Control
            type="name"
            placeholder="name@example.com"
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
            placeholder="name@example.com"
            onChange={handlePhoneNumberChange}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="학번" className="mb-3">
          <Form.Control
            placeholder="name@example.com"
            onChange={handleStudentIdChange}
          />
        </FloatingLabel>

        <Button variant="primary" type="submit">
          {" "}
          회원가입{" "}
        </Button>
      </form>
    </div>
  );
}

export default Sign_up;
