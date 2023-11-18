import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

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

  return (
    <div className={"register start " + fade2}>
      <FloatingLabel controlId="floatingInput" label="이메일" className="mb-3">
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingPassword" label="비밀번호">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="이름" className="mb-4">
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>

      <Form>
        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="1"
              name="group1"
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label="2"
              name="group1"
              type={type}
              id={`inline-${type}-2`}
            />
          </div>
        ))}
      </Form>
      <FloatingLabel
        controlId="floatingInput"
        label="전화번호"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="학번" className="mb-3">
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>

      <Button variant="primary" type="submit">
        회원가입
      </Button>
    </div>
  );
}

export default Sign_up;
