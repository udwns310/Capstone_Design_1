import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Security from "./security";
import Help from "./help";
import Account from "./account";

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

  return (
    <div className={"management start " + fade}>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ height: "94vh" }}>
              <Account />
            </div>
          }
        ></Route>
        <Route
          path="/security"
          element={
            <div style={{ height: "94vh" }}>
              <Security />
            </div>
          }
        ></Route>
        <Route
          path="/help"
          element={
            <div style={{ height: "94vh" }}>
              <Help />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default Management;
