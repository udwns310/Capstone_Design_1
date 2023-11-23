import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const { kakao } = window;

function Main(props) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(35.14431292867247, 129.03630623551933),
    };
    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap); // 지도 그리기

    var markerPosition = new kakao.maps.LatLng(
      35.14431292867247,
      129.03630623551933
    );
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(kakaoMap); // 지도에 마커 표시
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "inline-block",
        height: "100vh",
      }}
    >
      <Card body style={{}}>
        <div style={{}}>
          <h4>출발지</h4>
          <Form.Select aria-label="Default select example" className="select">
            <option>출발지를 선택하세요</option>
            <option value="1">동의대역 5번 출구 앞</option>
            <option value="2">가야1치안센터 버스정류장 앞</option>
            <option value="3">직접 추가하기 +</option>
          </Form.Select>
          <h4>목적지</h4>
          <Form.Select aria-label="Default select example" className="select">
            <option>목적지를 선택하세요</option>
            <option value="1">자대교차로(로타리)</option>
            <option value="2">대학본관</option>
            <option value="3">직접 추가하기 +</option>
          </Form.Select>
        </div>
      </Card>

      <div
        id="map"
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      ></div>

      <ButtonGroup
        aria-label="Basic example"
        style={{
          width: "100%",

          position: "absolute",
          bottom: 0,
          zIndex: 2,
        }}
      >
        <Button variant="warning">홈</Button>
        <Button variant="warning">목록</Button>
        <Button variant="warning">MY채팅</Button>
        <Button variant="warning">계정관리</Button>
      </ButtonGroup>
    </div>
  );
}
export default Main;
