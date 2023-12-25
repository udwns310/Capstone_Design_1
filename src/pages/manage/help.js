import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { Routes, Route } from "react-router-dom";

function Help(props) {
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
      <div className="mfont" style={{margin:"20px"}}>
        <h4>무엇을 도와드릴까요?</h4>
      </div>
    </div>
  );
}

export default Help;
