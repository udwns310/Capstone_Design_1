import "./App.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/login.js";
import Sign_up from "./pages/register.js";
import Nickname from "./pages/nickname.js";
import Main from "./pages/main.js";
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
      <Route path="/signin" element={<Login />}></Route>
      <Route path="/signup" element={ <Sign_up />}></Route>
      <Route path="/nickname" element={<Nickname />}></Route>
      <Route path="/main/*" element={<Main />}></Route>
    </Routes>
  );
}

export default App;
