import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ModalLogout, ModalPriv } from '../../components/modal'

function Security(props) {
  let [fade, setFade] = useState("");
  const [info, setInfo] = useState([]);
  let navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showPrivModal, setShowPrivModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowPrivModal = () => setShowPrivModal(true);
  const handleClosePrivModal = () => setShowPrivModal(false);

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
      const response = await axios.post("http://localhost:3002/management", {}); // 사용자 데이터 받아오기
      setInfo(response.data[0]);
    };
    fetchData();
  }, []);

  return (
    <div className={"management start " + fade}>

      <Form style={{ padding: "20px" }}>
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
        <div style={{textAlign: "center", marginTop:"25px" }}>
          <span onClick={handleShowPrivModal}>
            개인정보이용 약관 전체보기
          </span>
        </div>
        <div>
          <Button onClick={handleShowModal} className="lgbtn" variant="outline-warning">로그아웃</Button>
        </div>
      </Form>
      <ModalLogout
        show={showModal}
        handleClose={handleCloseModal}
      />
      <ModalPriv
        show={showPrivModal}
        handleClose={handleClosePrivModal}
      />
    </div>
  );
}

export default Security;