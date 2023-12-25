import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { MyModal } from '../../components/modal';

function Security(props) {
  let [fade, setFade] = useState("");
  const [currentPw, setcurrentPw] = useState('');
  const [newPw, setnewPw] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [title_message, setTitleMsg] = useState("");
  const [error_message, setErrMsg] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 500);
    return () => {
      setFade("");
    };
  }, []);

  const handleCpw = (e) => {
    setcurrentPw(e.target.value);
  };

  const handleNpw = (e) => {
    setnewPw(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3002/changepw', {
      currentPw: currentPw,
      newPw: newPw
    });
    if(response.data.status === "mismatch") {
      setTitleMsg("변경 실패");
      setErrMsg("기존 비밀번호를 확인해주세요.");
      handleShowModal();
    } else if(response.data.status === "cnmatch") {
      setTitleMsg("변경 실패");
      setErrMsg("기존 비밀번호와 새 비밀번호가 동일합니다.");
      handleShowModal();
    } else {
      setTitleMsg("변경 성공");
      setErrMsg("비밀번호를 변경하였습니다.");
      handleShowModal();
    }
  }

  return (
    <div className={"management start " + fade}>
      <div style={{margin:"20px 20px"}}>
        <div className="mfont"> 비밀번호 변경 </div>
        <form onSubmit={handleSubmit}>
          <div style={{ paddingTop: "10px" }}>
            <Form.Control type="password" placeholder="기존 비밀번호" onChange={handleCpw}/>
          </div>
          <div style={{ paddingTop: "10px" }}>
            <Form.Control type="password" placeholder="새 비밀번호" onChange={handleNpw}/>
          </div>
          <Button className="lgbtn" variant="outline-warning" type="submit">
            저장
          </Button>
        </form>
      </div>
      <MyModal
        show={showModal}
        handleClose={handleCloseModal}
        title={title_message}
        message={error_message}
      />
    </div>
  );
}

export default Security;