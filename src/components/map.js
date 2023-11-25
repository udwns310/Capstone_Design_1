import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

const { kakao } = window;

function Main(props) {

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [state, setState] = useState({
    center: { lat: 35.14431292867247, lng: 129.03630623551933 },
  });

  const [options, setOptions] = useState([
    { label: "출발지를 선택하세요", value: "0", center: { lat: 35.14431292867247, lng: 129.03630623551933 } },
    { label: "동의대역 5번 출구 앞", value: "1", center: { lat: 35.153379, lng: 129.032096 } },
    { label: "가야1치안센터 버스정류장 앞", value: "2", center: { lat: 35.154067, lng: 129.037094 } },
    { label: "직접 추가하기 +", value: "3" },
  ]);

  const handlePosition = (value) => {
    setState({ center: value.center });
  }

  useEffect(() => {
    const container = document.getElementById("map");
    if (!map) {
      // 지도 인스턴스가 없을 때에만 생성
      const mapOption = { center: new kakao.maps.LatLng(state.center.lat, state.center.lng), level: 5 };
      const newMap = new kakao.maps.Map(container, mapOption);
      setMap(newMap); // 지도 그리기
    } else {
      // 이미 지도 인스턴스가 있는 경우
      map.panTo(new kakao.maps.LatLng(state.center.lat, state.center.lng));
  
      // 이전에 추가된 마커가 있다면 모두 제거
      markers.forEach((prevMarker) => {
        prevMarker.setMap(null);
      });
    }
    const markerPosition = new kakao.maps.LatLng(state.center.lat, state.center.lng);
    const newMarker = new kakao.maps.Marker({ position: markerPosition });
    newMarker.setMap(map);
    setMarkers([newMarker]);
    
  }, [state.center]); // map이나 state.center 변경될때 실행 

  return (
    <div style={{ height: '100%' }}>
      <div style={{ height: '20%' }}>
        <div style={{ width: '90%', margin: 'auto', paddingTop: '5px', height: '45%' }}>
          <p style={{ margin: '0px', fontWeight: 'bold' }}>출발지</p>
          <Form.Select aria-label="Default select example" className="select" onChange={(e) => handlePosition(options.find(option => option.value === e.target.value))}>
            {/* 선택된 옵션의 optione의Vaule가 e.target의 value와 같다면 center를 찾고, 이 center가 존재한다면 center을 반환하여 출력*/}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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
      <div id="map" style={{ height: '80%' }}></div>
    </div>
  );
}

export default Main;
