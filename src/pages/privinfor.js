import React from "react";

function PrivateInfor() {
    return (
        <div className="mainP">
            <div id="titleP">개인정보의 수집, 이용 안내</div>
            <br></br>
            <div>* 회원은 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며 동의를 거부할 경우, 서비스 이용이 제한됩니다. </div>
            <br></br>
            <div className="subt">수집하는 개인정보의 항목</div>
            <div className="subP">
                <div>동카(DongCar)는 회원가입, 합승 서비스 등 기본적인 서비스 제공을 위해 필요한 개인정보를 수집하고 있습니다.</div>
                <div>ο 수집 항목</div>
                <ul>
                    <li>필수항목: 학번, 성명, 성별, 닉네임, 전화번호, 이메일 주소, 비밀번호</li>
                    <li>선택 항목: 없음</li>
                </ul>
            </div>
            <div className="subt">개인정보의 수집 및 이용 목적</div>
            <div className="subP">
                <div>동카는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</div>
                <div>ο 서비스 제공에 관한 계약 이행</div>
                <div>택시 합승 서비스 제공, 그룹 채팅 서비스 제공, 악의적 행위에 대한 제재</div>
                <div>ο 회원 관리</div>
                <div>회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인</div>
            </div>
            <br></br>
            <div className="subt">개인정보의 보유 및 이용 기간</div>
            <div className="subP">
                <div>원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체없이 파기합니다.
                    단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간동안 보존합니다.
                </div>
                <div>ο 내부 방침에 의한 정보 보유 사유</div>
                <ul>
                    <li style={{fontWeight: "bold"}}>탈퇴 회원 정보</li>
                    <div>항목 : 학번, 성명, 성별, 전화번호, 이메일 주소</div>
                    <div>보존 이유: 부정 이용 방지 및 수사 협조</div>
                    <div>보존 기간: 1년</div>
                    <li style={{fontWeight: 'bold'}}>회원 정보</li>
                    <div>항목 : 학번, 성명, 성별, 전화번호, 이메일 주소</div>
                    <div>보존 이유: 서비스 이용의 혼선 방지</div>
                    <div>보존 기간: 서비스 종료 시까지</div>
                </ul>
            </div>
        </div>
    )
}

export default PrivateInfor