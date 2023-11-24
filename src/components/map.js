import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

const { kakao } = window;

function Main(props) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const container = document.getElementById('map');

    if (!map) {
      // 지도 인스턴스가 없을 때에만 생성
      const options = { center: new kakao.maps.LatLng(35.14431292867247, 129.03630623551933) };
      const newMap = new kakao.maps.Map(container, options);
      setMap(newMap); // 지도 그리기

      var markerPosition = new kakao.maps.LatLng(35.14431292867247, 129.03630623551933);
      var marker = new kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(newMap); // 지도에 마커 표시
    }
  }, [map]); // map이 변경될 때에만 실행

  return (
    <div style={{height:'100%'}}>
      <div style={{height:'20%'}}>
        <div style={{ width: '90%', margin: 'auto', paddingTop: '5px', height: '45%' }}>
          <p style={{ margin: '0px', fontWeight: 'bold' }}>출발지</p>
          <Form.Select aria-label="Default select example" className="select">
            <option>출발지를 선택하세요</option>
            <option value="1">동의대역 5번 출구 앞</option>
            <option value="2">가야1치안센터 버스정류장 앞</option>
            <option value="3">직접 추가하기 +</option>
          </Form.Select>
        </div>
        <div style={{ width: '90%', margin: 'auto', paddingTop: '5px', height: '50%' }}>
          <p style={{ margin: '0px', fontWeight: 'bold' }}>목적지</p>
          <Form.Select aria-label="Default select example" className="select">
            <option>목적지를 선택하세요</option>
            <option value="1">자대교차로(로타리)</option>
            <option value="2">대학본관</option>
            <option value="3">직접 추가하기 +</option>
          </Form.Select>
        </div>
      </div>
      <div id="map" style={{height:'80%'}}></div>
    </div>
  );
}

export default Main;
