import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Modal2, ModalChat } from "./modal.js";

const { kakao } = window;

function Main(props) {
  const [map, setMap] = useState(null);
  const [originMarker, setOriginMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [originSelected, setOriginSelcted] = useState();
  const [destinationSelected, setDestinationSelcted] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [state, setState] = useState({
    center: { lat: 35.14431292867247, lng: 129.03630623551933 },
  });
  const [saveOriginValue, setSaveOriginValue] = useState('');
  const [saveDestinationValue, setSaveDestinationValue] = useState('');

  const originData = [
    { label: "출발지를 선택하세요", value: "null", center: { lat: 35.14431292867247, lng: 129.03630623551933 } },
    { label: "동의대역 5번 출구 앞", value: "1", center: { lat: 35.153379, lng: 129.032096 } },
    { label: "가야1치안센터 버스정류장 앞", value: "2", center: { lat: 35.154067, lng: 129.037094 } }
  ]
  const destinationData = [
    { label: "목적지를 선택하세요", value: "null", center: { lat: 35.14431292867247, lng: 129.03630623551933 } },
    { label: "자대로타리", value: "1", center: { lat: 35.143690, lng: 129.034482 } },
    { label: "수덕전", value: "2", center: { lat: 35.141445, lng: 129.034092 } }
  ]

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setOriginSelcted();
    setDestinationSelcted();
  }

  const handleoOpenChatModal = () => {
    setShowChatModal(true);
  }
  const handleoCloseChatModal = () => {
    setShowChatModal(false);
  }

  const [originOptions, setOriginOptions] = useState(originData);
  const [destinationOptions, setDestinationOptions] = useState(destinationData);

  const handlePosition = (value, optionsSetter, markerSetter, dir) => {
    if (value.value !== "null") {
      if (dir === "destination") {setDestinationSelcted(true); setSaveDestinationValue(value.label); }
      else if (dir === "origin") {setOriginSelcted(true); setSaveOriginValue(value.label); }
    }

    // 이전에 추가된 마커가 있다면 모두 제거
    if (markerSetter) {
      markerSetter((prevMarker) => {
        if (prevMarker) {
          prevMarker.setMap(null);
        }
        return null;
      });
    }
    if (dir === "destination") {
      var imageSrc = process.env.PUBLIC_URL + '/img/destination.png',
        imageSize = new kakao.maps.Size(35, 35)
    }
    else if (dir === "origin") {
      var imageSrc = process.env.PUBLIC_URL + '/img/origin.png',
        imageSize = new kakao.maps.Size(35, 35)
    }
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

    // 새로운 마커 추가
    const newMarkerPosition = new kakao.maps.LatLng(value.center.lat, value.center.lng);
    const newMarker = new kakao.maps.Marker({
      position: newMarkerPosition,
      image: markerImage
    });
    newMarker.setMap(map);

    // 새로운 마커 상태 업데이트
    if (markerSetter) {
      markerSetter(newMarker);
    }

    // 현재 선택된 위치의 options 배열 업데이트
    optionsSetter((prevOptions) => {
      return prevOptions.map((option) => ({
        ...option,
        center: option.value === value.value ? value.center : option.center,
      }));
    });

    // 지도 이동 
    map.panTo(new kakao.maps.LatLng(value.center.lat, value.center.lng));
  };

  useEffect(() => {
    if (originSelected && destinationSelected) {
      handleShowModal();
    }
  }, [originSelected, destinationSelected]);

  useEffect(() => {
    const container = document.getElementById("map");
    if (!map) {
      // 지도 인스턴스가 없을 때에만 생성
      const mapOption = { center: new kakao.maps.LatLng(state.center.lat, state.center.lng), level: 2 };
      const newMap = new kakao.maps.Map(container, mapOption);
      setMap(newMap); // 지도 그리기
    }

    // 최초 로드 시 출발지 마커 추가
    const originMarkerPosition = new kakao.maps.LatLng(state.center.lat, state.center.lng);
    const newOriginMarker = new kakao.maps.Marker({ position: originMarkerPosition });
    newOriginMarker.setMap(map);
    setOriginMarker(newOriginMarker);

  }, [map, state.center]); // map이나 state.center 변경될때 실행

  return (
    <div style={{ height: '100%' }}>
      <div style={{ height: '20%' }}>
        <div style={{ width: '90%', margin: 'auto', paddingTop: '5px', height: '45%' }}>
          <p style={{ margin: '0px', fontWeight: 'bold' }}>출발지</p>
          <Form.Select
            aria-label="Default select example"
            className="select"
            onChange={(e) => handlePosition(originOptions.find((option) => option.value === e.target.value), setOriginOptions, setOriginMarker, "origin")}
            value={originSelected ? originSelected.value : "null"}
          >
            {originOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </div>
        <div style={{ width: '90%', margin: 'auto', paddingTop: '5px', height: '50%' }}>
          <p style={{ margin: '0px', fontWeight: 'bold' }}>목적지</p>
          <Form.Select
            aria-label="Default select example"
            className="select"
            onChange={(e) => handlePosition(destinationOptions.find((option) => option.value === e.target.value), setDestinationOptions, setDestinationMarker, "destination")}
            value={destinationSelected ? destinationSelected.value : "null"}
          >
            {destinationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>
      <div id="map" style={{ height: '80%' }}></div>
      <Modal2 show={showModal} handleClose={handleCloseModal} handleoOpenChat={handleoOpenChatModal} title="선택 완료" origin = {saveOriginValue} destination = {saveDestinationValue} />
      <ModalChat show={showChatModal} handleClose={handleoCloseChatModal} handleoOpenChat={handleoOpenChatModal} title="채팅방 개설" origin = {saveOriginValue} destination = {saveDestinationValue}/> 
    </div>
  );
}

export default Main;