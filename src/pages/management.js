import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

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
                <div>test@test.com</div>
                
                <div className="mfont">학번</div>
                <div>20231234</div>
            
                <div className="mfont">이름</div>
                <div>tester</div>
                
                <div className="mfont">닉네임</div>
                <div>testnick</div>
                
                <div className="mfont">전화번호</div>
                <div>010-1234-1234</div>
                
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
                <div style={{textAlign: "center"}}><Link to='/main/privinfor' id="terms">개인정보이용 약관 전체보기</Link></div>
                <Button className="lgbtn" variant="outline-warning" type="submit">
                    저장
                </Button>
            </Form>
        </div>
    );
}

export default Management;