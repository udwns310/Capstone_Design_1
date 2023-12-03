import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { Link } from "react-router-dom";


function Management(props) {
    let [fade, setFade] = useState("");
    const [info, setInfo] = useState([]);

    useEffect(() => {
    setTimeout(() => {
        setFade("end");
    }, 500);
        return () => {
            setFade("");
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          const response = await axios.post("http://localhost:3002/main/management", {}); // 사용자 데이터 받아오기
          setInfo(response.data[0]);
        };
        fetchData();
    }, []);

    return (
        <div className={"management start " + fade}>
            <div id="mng-header">계정 관리</div>
            <Form style={{padding: '20px'}}>
                <div className="mfont">이메일</div>
                <div>{info.email}</div>
                
                <div className="mfont">학번</div>
                <div>{info.stdId}</div>
            
                <div className="mfont">이름</div>
                <div>{info.name}</div>
                
                <div className="mfont">닉네임</div>
                <div>{info.nickname}</div>
                
                <div className="mfont">전화번호</div>
                <div>{info.phoneNum}</div>
                
                <div className="mfont"> 비밀번호 변경 </div>
                <div style={{paddingTop:'10px'}}>
                    <Form.Control type="password" placeholder="기존 비밀번호 입력" />
                </div>
                <div style={{paddingTop:'10px'}}>
                    <Form.Control type="password" placeholder="새 비밀번호" />
                </div>
                <div style={{paddingTop:'10px'}}>
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