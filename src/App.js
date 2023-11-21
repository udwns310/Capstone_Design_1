import "./App.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/login.js";
import Sign_up from "./pages/register.js";
import Nickname from "./pages/nickname.js";

function App() {
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
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <div className="mainImg">
              <img
                className="logo"
                src="https://udwns310.github.io/dongcar/DongCar.png"
              />
            </div>
            <div className={"main start " + fade}>
              <h4 className="ment">저렴하게 이동하세요</h4>
            </div>
            <div className="under-button-content">
              <Link to="/signin" className="btn1">
                <Button
                  className={"sign-in-btn btn1 start " + fade}
                  variant="warning"
                  size="lg"
                >
                  {" "}
                  로그인{" "}
                </Button>
              </Link>
              <Link to="/signup" className="btn1">
                <Button
                  className={"sign-up-btn btn1 start " + fade}
                  variant="warning"
                  size="lg"
                >
                  {" "}
                  회원가입{" "}
                </Button>
              </Link>
            </div>
          </div>
        }
      ></Route>
      <Route //로그인 페이지 Route
        path="/signin"
        element={
          <div>
            <Login />
          </div>
        }
      ></Route>
      <Route //회원가입 페이지 Route
        path="/signup"
        element={
          <div>
            <Sign_up />
          </div>
        }
      ></Route>
      <Route //닉네임 페이지 Route
        path="/nickname"
        element={
          <div>
            <Nickname />
          </div>
        }
      ></Route>
    </Routes>
  );
}

<<<<<<< Updated upstream
export default App;
=======
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
    <div className="main-login">
      <div className="login-content">
        <h4>로그인</h4>
      </div>
      <div className="login-form">
        <div>
          <label>ID</label>
          <input type='email'/>
        </div>
        <div>
          <label>Password</label>
          <input type='password'/>
        </div>
      </div>
    </div>
  );
}

function sign_up(){
  return (
    <div className=" ">
      <h4>상품명</h4>
      <p>상품정보</p>
    </div>
  );
}

export default App;
>>>>>>> Stashed changes
