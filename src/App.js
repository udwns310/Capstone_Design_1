import "./App.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path = "/" element = {main()}></Route>
      <Route path = "/signin" element = {sign_in()}></Route>
      <Route path = "/signup" element = {sign_up()}></Route>
    </Routes>
  );
}

function main(){
  return (
    <div className="App">
      <div className="mainImg">
        <img className="logo" src="https://udwns310.github.io/dongcar/DongCar.png" />
      </div>
      <div className="main">
        <h4 className="ment">저렴하게 이동하세요</h4>
      </div>
      <div className="under-button-content">
        <Link to = "/signin" className="btn1"><Button className="sign-in-btn btn1" variant="primary" size="lg"> 로그인 </Button></Link>
        <Link to = "/signup" className="btn1"><Button className="sign-up-btn btn1" variant="primary" size="lg"> 회원가입 </Button></Link>
      </div>
    </div>
  );
}


function sign_in(){
  return (
    <div className="col-md-4">
      <h4>상품명</h4>
      <p>상품정보</p>
    </div>
  );
}

function sign_up(){
  return (
    <div className="col-md-4">
      <h4>상품명</h4>
      <p>상품정보</p>
    </div>
  );
}

export default App;