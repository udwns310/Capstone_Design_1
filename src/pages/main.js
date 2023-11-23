import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const { kakao } = window;


function Main(props) {
    const [map,setMap] = useState(null);


    useEffect(()=>{
        const container = document.getElementById('map');
        const options = { center: new kakao.maps.LatLng(35.14431292867247, 129.03630623551933) };
        const kakaoMap = new kakao.maps.Map(container, options);
        setMap(kakaoMap); // 지도 그리기

        var markerPosition  = new kakao.maps.LatLng(35.14431292867247, 129.03630623551933); 
        var marker = new kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(kakaoMap); // 지도에 마커 표시
    },[])

    

    return (
        <div
            style={{
                width: '100%',
                display: 'inline-block',
                marginLeft: '5px',
                marginRight: '5px',
            }}
        >
            <div id="map" style={{ width: '100%', height: '710px' }}></div>
        </div>
    );
}
export default Main;
