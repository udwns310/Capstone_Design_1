import React, { useState, useEffect } from "react";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

function Chatlist(props) {
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
    <div className={"Chatlist start " + fade}>
      <ListGroup as="ol" className="list">
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
            <div className="fw-bold">Subheading</div>
            </div>
            <Badge bg="primary" pill>
              3 / 4
            </Badge>
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
            <div className="fw-bold">Subheading</div>
            </div>
            <Badge bg="primary" pill>
              1 / 4
            </Badge>
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
            <div className="fw-bold">Subheading</div>
            </div>
            <Badge bg="primary" pill>
              2 / 4
            </Badge>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
export default Chatlist;
