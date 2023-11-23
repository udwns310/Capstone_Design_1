import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { bottom } from "@popperjs/core";

const { kakao } = window;


function Main(props) {
    const [map, setMap] = useState(null);

    useEffect(() => {
        const container = document.getElementById('map');
        const options = { center: new kakao.maps.LatLng(35.14431292867247, 129.03630623551933) };
        const kakaoMap = new kakao.maps.Map(container, options);
        setMap(kakaoMap); // 지도 그리기

        var markerPosition = new kakao.maps.LatLng(35.14431292867247, 129.03630623551933);
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(kakaoMap); // 지도에 마커 표시
    }, [])

    const navItemStyle = {
        height: '100px', // 원하는 높이로 조정
    };
    // , paddingLeft: '5px', paddingRight: '5px', paddingTop: '10px'
    return (
        <div style={{ height: '100vh' }}>
            <div style={{ height: '25%'}}>
                <div style={{ width: '90%', margin: 'auto', paddingTop:'10px', height:'50%'}}>
                    <h4>출발지</h4>
                    <Form.Select aria-label="Default select example" className="select">
                        <option>출발지를 선택하세요</option>
                        <option value="1">동의대역 5번 출구 앞</option>
                        <option value="2">가야1치안센터 버스정류장 앞</option>
                        <option value="3">직접 추가하기 +</option>
                    </Form.Select>
                </div>
                <div style={{ width: '90%', margin: 'auto', paddingTop:'10px', height:'50%'}}>
                    <h4>목적지</h4>
                    <Form.Select aria-label="Default select example" className="select">
                        <option>목적지를 선택하세요</option>
                        <option value="1">자대교차로(로타리)</option>
                        <option value="2">대학본관</option>
                        <option value="3">직접 추가하기 +</option>
                    </Form.Select>
                </div>
            </div>
            <div id="map" style={{ height: '69%' }}></div>
            <ButtonGroup aria-label="Basic example" style={{ width: '100%', height: '6%' }}>
                <Button variant="secondary" style={{ width: '25%', borderRadius: '0' }}>홈</Button>
                <Button variant="secondary" style={{ width: '25%', borderRadius: '0' }}>목록</Button>
                <Button variant="secondary" style={{ width: '25%', borderRadius: '0' }}>MY채팅</Button>
                <Button variant="secondary" style={{ width: '25%', borderRadius: '0' }}>계정관리</Button>
            </ButtonGroup>
        </div>
    );
}
export default Main;
