import { useState, useEffect } from "react";

function Help(props) {
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
      <div className="mfont" style={{margin:"20px"}}>
        <h4>무엇을 도와드릴까요?</h4>
      </div>
    </div>
  );
}

export default Help;