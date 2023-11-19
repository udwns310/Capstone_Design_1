import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function LoginForm(props) {
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
    <div className={"login start " + fade}>
      <FloatingLabel controlId="floatingInput" label="이메일" className="mb-3">
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={props.email}
          onChange={props.handleEmail}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="비밀번호">
        <Form.Control
          type="password"
          placeholder="Password"
          value={props.password}
          onChange={props.handlePwd}
        />
      </FloatingLabel>
      <Button
        className="lgbtn"
        variant="primary"
        type="submit"
        onClick={props.handleSubmit}
      >
        로그인
      </Button>
    </div>
  );
}

export default LoginForm;
