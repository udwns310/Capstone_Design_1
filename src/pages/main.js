import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Map from "../components/map.js";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Chatlist from "./chatlist.js";
import Management from "./manage/management.js";
import Mychat from "./mychat.js";

function Main(props) {
  return (
    <div style={{ height: "100vh" }}>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ height: "94vh" }}>
              <Map />
            </div>
          }
        ></Route>
        <Route
          path="/chatlist"
          element={
            <div style={{ height: "94vh", overflow: "scroll" }}>
              <Chatlist />
            </div>
          }
        ></Route>
        <Route
          path="/management/*"
          element={
            <div style={{ height: "94vh" }}>
              <Management />
            </div>
          }
        ></Route>
        <Route
          path="/chat"
          element={
            <div style={{ height: "94vh", overflow: "scroll" }}>
              <Mychat />
            </div>
          }
        ></Route>
      </Routes>
      <div style={{ height: "6vh"}}>
        <ButtonGroupContainer />
      </div>
    </div>
  );
}

function ButtonGroupContainer() {
  const navigate = useNavigate();

  const handleListButtonClick = (path) => {
    navigate(path);
  };

  return (
    <ButtonGroup
      aria-label="Basic example"
      style={{ width: "100%", height: "100%" }}
    >
      <Button
        variant="warning"
        style={{ width: "25%", borderRadius: "0" }}
        onClick={() => handleListButtonClick("/main")}
      >
        홈
      </Button>
      <Button
        variant="warning"
        style={{ width: "25%", borderRadius: "0" }}
        onClick={() => handleListButtonClick("/main/chatlist")}
      >
        목록
      </Button>
      <Button
        variant="warning"
        style={{ width: "25%", borderRadius: "0" }}
        onClick={() => handleListButtonClick("/main/chat")}
      >
        MY채팅
      </Button>
      <Button
        variant="warning"
        style={{ width: "25%", borderRadius: "0" }}
        onClick={() => handleListButtonClick("/main/management")}
      >
        계정관리
      </Button>
    </ButtonGroup>
  );
}

export default Main;
