import { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";

function Management(props) {
    let [fade, setFade] = useState("");

    useEffect(() => {
    setTimeout(() => {
        setFade("end");
    }, 500);
        return () => {
            setFade("");
        };
    }, []);

    return (
        <div className={"management start " + fade}>
            <div id="mng-header">계정 관리</div>
            <Form style={{padding: '10px'}}>
                <div className="mfont">이메일</div>
                <Form.Control plaintext readOnly defaultValue="test@test.com" />
                
                <div className="mfont">학번</div>
                <Form.Control plaintext readOnly defaultValue="20231234" />
            
                <div className="mfont">이름</div>
                <Form.Control plaintext readOnly defaultValue="tester" />
                
                <div className="mfont">닉네임</div>
                <Form.Control plaintext readOnly defaultValue="testnick" />
                
                <div className="mfont">전화번호</div>
                <Form.Control plaintext readOnly defaultValue="010-1234-1234" />
                
                <div className="mfont"> 비밀번호 변경 </div>
                <div style={{paddingTop:'5px'}}>
                    <Form.Control type="password" placeholder="기존 비밀번호 입력" />
                </div>
                <div style={{paddingTop:'5px'}}>
                    <Form.Control type="password" placeholder="새 비밀번호" />
                </div>
                <div style={{paddingTop:'5px'}}>
                    <Form.Control type="password" placeholder="새 비밀번호 확인" />
                </div>
                <Button className="lgbtn" variant="outline-warning" type="submit">
                    저장
                </Button>
            </Form>
        </div>
    );
}

export default Management;